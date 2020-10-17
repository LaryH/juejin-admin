import request from '@/utils/request'

export function login (params) {
  return request.get('/api/login')
}

export function logout () {
  return request.get('/api/logout')
}

export function modifyPassword (params) {
  return request.post('/api/modifyPassword', params)
}
