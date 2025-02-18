import request from './request'

/**
 * 用户相关接口封装
 */
export const userApi = {
  // 用户登录
  login: (data) => {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  },

  // 获取用户信息
  getUserInfo: () => {
    return request({
      url: '/user/info',
      method: 'get'
    })
  },

  // 更新用户信息
  updateUserInfo: (data) => {
    return request({
      url: '/user/info',
      method: 'put',
      data
    })
  },

  // 修改密码
  changePassword: (data) => {
    return request({
      url: '/user/password',
      method: 'put',
      data
    })
  },

  // 退出登录
  logout: () => {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  }
}