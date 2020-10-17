import request from '@/utils/request'

export function getTopics() {
	return request.get('/api/topics')
}
export function delTopics(id) {
	return request.delete(`/api/topics/${id}`)
}
export function addTopics(brand) {
	return request.post('/api/topics', brand)
}

export function modTopics(brand) {
	return request.patch(`/api/topics/${brand.id}`, brand)
}
