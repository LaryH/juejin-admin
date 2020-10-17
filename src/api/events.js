import request from '@/utils/request'

//  查找数据
export function getEventList() {
	return request.get('/api/eventList')
}

// 删除数据
export function delEvent(eventId) {
	return request.delete(`/api/eventList/${eventId}`)
}

// 获取城市列表
export function getCitysList() {
	return request.get('/api/citys')
}

// 添加数据
export function addEvent(parameter) {
	return request.post('/api/eventList', parameter)
}

// 修改数据
// put 修改整条数据
// patch 修改部分数据
export function modifyEvent(eventId, parameter) {
	return request.patch(`/api/eventList/${eventId}`, parameter)
}
