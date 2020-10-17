import request from '@/utils/request'

export function getCategoryInfo() {
	return request({
		url: '/api/home/category',
		method: 'get'
	})
}

export function getTagInfo() {
	return request({
		url: '/api/home/tag',
		method: 'get'
	})
}

export function getArticleInfo() {
	return request({
		url: '/backend/home/article',
		method: 'get'
	})
}

export function deleteArticle(article_id) {
	return request({
		url: '/backend/home/article',
		method: 'delete',
		data: { article_id }
	})
}

export function modifyArticle(articleInfo) {
	if (articleInfo.article_id) {
		return request({
			url: '/backend/home/article',
			method: 'put',
			data: {
				...articleInfo
			}
		})
	} else {
		return request({
			url: '/backend/home/article',
			method: 'post',
			data: {
				...articleInfo
			}
		})
	}
}
