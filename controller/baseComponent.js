import path from 'path'
import fs from 'fs'
import gm from 'gm'

export default class BaseComponent {
	
	constructor () {
		this.getImgPath = this.getImgPath.bind(this)
	}
	
	async getImgPath (files, res) {
    return new Promise((resolve, reject) => {
      const hashName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16)
      // imgFile是前端formdata append file时的key
      const extname = path.extname(files.imgFile.name)
      if (!['.jpg', '.jpeg', '.png'].includes(extname)) {
        fs.unlinkSync(files.imgFile.path)
        res.json({
          status: 0,
          message: '文件格式错误'
        })
        return 
      }
      const fullName = hashName + extname
      const repath = './public/img/' + fullName
      try {
        // fs.renameSync(files.imgFile.path, repath)
        //  fs.renameSync create Error: EXDEV: cross-device link not permitted, rename
        let readStream = fs.createReadStream(files.imgFile.path)
        let writeSteam  = fs.createWriteStream(repath)
        readStream.pipe(writeSteam)
        readStream.on('end', function () {
          fs.unlinkSync(files.imgFile.path)
          gm(repath)
            .resize(200, 200, "!")
            .write(repath, async (err) => {
            // if(err){
            // 	console.log('裁切图片失败');
            // 	reject('裁切图片失败');
            // 	return
            // }
            resolve(fullName)
          })
        })
      } catch(err) {
        console.log('保存图片失败', err)
        if (fs.existsSync(repath)) {
          fs.unlinkSync(repath)
        } else {
          fs.unlinkSync(files.imgFile.path)
        }
        reject('保存图片失败')
      }
    })
  }
}