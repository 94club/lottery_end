/**
 *
 * @api {get} /award/getAwardsList  获取奖项列表
 * @apiName 获取奖项列表
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiDescription 获取奖项列表
 *
 * @apiSuccess {String} status 结果码
 * @apiSuccess {String} message 消息说明
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   status: 200,
 *   message: '查询成功',
 *   data: []
 * }
 *
 *  @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 200
 *  {
 *   status: 0,
 *   message: '查询失败',
 *  }
 */

  /**
   *
   * @api {post} /award/updateAwardInfo  根据索引更新某个奖项信息
   * @apiName 根据索引更新某个奖项信息
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 根据索引更新某个奖项信息
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   *   data: []
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */

     /**
   *
   * @api {post} /award/joinAward  参与抽奖
   * @apiName 参与抽奖
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 参与抽奖
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
  * {
   *   status: 200,
   *   message: '更新成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '参与失败',
   *  }
   */

     /**
   *
   * @api {post} /award/awardsAdd  添加奖项
   * @apiName 添加奖项
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 添加奖项
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '添加成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '添加失败',
   *  }
   */

     /**
   *
   * @api {get} /award/getAwardItem  根据索引获取某个奖项详情
   * @apiName 根据索引获取某个奖项详情
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 根据索引获取某个奖项详情
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功',
   *   data: {}
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */

     /**
   *
   * @api {get} /award/getLucyNum  获取幸运号码
   * @apiName 获取幸运号码
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 获取幸运号码
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功',
   *   data: 123
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */

     /**
   *
   * @api {post} /api/login  登录
   * @apiName 登录
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 用户登录
   *
   * @apiParam {String} username 用户名
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '登录/注册成功',
   *   data: {
   *     token: token
   *   }
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '失败原因',
   *  }
   */

     /**
   *
   * @api {post} /user/getUserInfo  用户信息
   * @apiName 用户信息
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 获取用户信息
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: 'success',
   *   data: {"avatar":"/public/img/avatar.jpg","hadPrize":false,"username":"alistar-wang","role":0,"createTime":"2018/11/10 14:24:25","id":1}}
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */

     /**
   *
   * @api {post} /user/logout  用户登出
   * @apiName 用户登出
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 用户登出
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: 'success'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '登出失败',
   *  }
   */

    /**
   *
   * @api {get} /user/remainTime  离晚会开始剩余时间
   * @apiName 离晚会开始剩余时间
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 离晚会开始剩余时间
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */

     /**
   *
   * @api {post} /user/updateUserInfo  更新用户信息
   * @apiName 更新用户信息
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 更新用户信息
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */

     /**
   *
   * @api {post} /user/uploadAvatar  更新用户图像
   * @apiName 更新用户图像
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 更新用户图像
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   *   data: {
   *     imgPath: '/public/img/avatar.jpg'
   *   }
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */

     /**
   *
   * @api {get} /user/getAllUser  获取所有用户
   * @apiName 获取所有用户
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 获取所有用户
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   *   data: [{"avatar":"/public/img/167c5b72dcb.jpg","hadPrize":false,"_id":"5c18a2a5bb5f3d1f0c994a21","username":"alistar-wang","lang":"cn","role":0,"createTime":"2018/12/18 15:32:53","id":1,"__v":0},{"avatar":"/public/img/avatar.jpg","hadPrize":false,"_id":"5c1a0c551527ab39f96293b0","username":"123eveb-admin456","lang":"cn","role":1,"createTime":"2018/12/19 17:16:05","id":2,"__v":0}]
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */

     /**
   *
   * @api {post} /user/uploadFashionImg  根据id更新服装图片
   * @apiName 根据id更新服装图片
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 根据id更新服装图片
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */

     /**
   *
   * @api {post} /user/fashionImgAdd  添加最佳服装
   * @apiName 添加最佳服装
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 添加最佳服装
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '添加成功',
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '添加失败原因',
   *  }
   */

     /**
   *
   * @api {get} /user/getFashionImgList  获取所有最佳服装
   * @apiName 获取所有最佳服装
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 获取所有最佳服装
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '获取成功',
   *   data: []
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '获取失败原因',
   *  }
   */