  /**
   *
   * @api {get} /award/getAwardsList  获取奖项列表
   * @apiName 获取奖项列表
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 获取奖项列表
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
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
   * @apiSuccessExample {json}Success-Response:
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