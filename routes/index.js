import jwtAuth from '../config/checkToken'
import express from 'express'
import unAuth from './unAuth'
import user from './user'
import award from './award'
import redisManager from '../config/redis'

export default (app) => {
  app.use('/public', express.static('public'))
  app.use('/api', unAuth)
  app.use(jwtAuth) // 验证token的有效性
  app.use(redisManager.refreshToken) // 每一次请求都刷新token的过期时间
  app.use('/user', user)
  app.use('/award', award)
}
