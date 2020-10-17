import request from '@/utils/request'

export function getTopics () {
  return request.get('/topics')
}
export function delTopics (id) {
  return request.delete(`/topics/${id}`)
}
export function addTopics (brand) {
  return request.post('/topics', brand)
}

export function modTopics (brand) {
  return request.patch(`/topics/${brand.id}`, brand)
}
