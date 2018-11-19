'use strict'

import mongoose from 'mongoose'
import chalk from 'chalk'
console.log(process.env.NODE_ENV)

const conOptions = {
  useNewUrlParser: true
}
if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://test1:test@localhost:27017/lottery_test', conOptions)
} else {
  mongoose.connect('mongodb://test1:test@localhost:27017/lottery_test', conOptions)
}
mongoose.Promise = global.Promise

const db = mongoose.connection
db.once('open', () => {
  console.log(
    chalk.green('连接数据库成功')
  )
})

db.on('error', function (error) {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  )
  mongoose.disconnect()
})

db.on('close', function () {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  )
  if (process.env.NODE_ENV === 'dev') {
    mongoose.connect('mongodb://alistar:alistar2018@localhost:27017/lottery_test?authSource=admin', {
      server: {
        auto_reconnect: true
      }
    })
  } else {
    mongoose.connect('mongodb://alistar:alistar2018@localhost:27017/lottery_test?authSource=admin', {
      server: {
        auto_reconnect: true
      }
    })
  }
})

export default db
