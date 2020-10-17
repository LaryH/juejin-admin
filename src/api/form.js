import request from '@/utils/request'

export function getUsers(params) {
	return request.get(
		`/api/users?_sort=updateTime&_order=desc&_page=${params.current}&_limit=${params.pageSize}`
	)
}

export function deleteAccount(id) {
	return request.delete(`/api/users/${id}`)
}

export function createAccount(params) {
	params.createTime = Date.now()
	params.updateTime = Date.now()
	return request.post('/api/users', params)
}

export function modifyAccount(params) {
	params.updateTime = Date.now()
	const { id, ...user } = params
	return request.patch(`/api/users/${id}`, user)
}

export function getRoles() {
	return request.get('/api/roles')
}
