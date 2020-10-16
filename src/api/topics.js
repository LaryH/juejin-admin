import request from '@/utils/request'

export function getTopics () {
  return request.get('/topics')
}
export function delTopics (id) {
  return request.delete(`/topics/${id}`)
}
