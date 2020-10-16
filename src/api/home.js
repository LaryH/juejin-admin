import request from '@/utils/request'

export function getCategoryInfo() {
	return request({
		url: '/home/category',
		method: 'get'
	})
}

export function getTagInfo() {
	return request({
		url: '/home/tag',
		method: 'get'
	})
}

export function getArticleInfo() {
	return request({
		url: '/home/article',
		method: 'get'
	})
}

export function deleteArticle(articleId) {
	return request({
		url: '/boom/1',
		method: 'delete'
	})
}

export function getboom(articleId) {
	return request({
		url: '/boom/1',
		method: 'get'
	})
}
