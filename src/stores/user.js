import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '../api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref(localStorage.getItem('token') || '')

  // 设置用户信息
  const setUserInfo = (info) => {
    userInfo.value = info
  }

  // 设置 token
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 登录
  const login = async (credentials) => {
    try {
      const { token: newToken, user } = await userApi.login(credentials)
      setToken(newToken)
      setUserInfo(user)
      return true
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const info = await userApi.getUserInfo()
      setUserInfo(info)
      return true
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return false
    }
  }

  // 退出登录
  const logout = () => {
    userInfo.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  return {
    userInfo,
    token,
    login,
    logout,
    fetchUserInfo
  }
})