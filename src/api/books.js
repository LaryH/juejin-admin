import request from '@/utils/request'

export function getBooksList () {
  return request({
    url: '/server/database/books',
    method: 'get'
  })
}

export function delBooks (id) {
  return request({
    url: `/books/${id}`,
    method: 'delete'
  })
}

export function modifyBook (bookInfo) {
  if (bookInfo.id) {
    return request({
      url: `/books/${bookInfo.id}`,
      method: 'PATCH'
    })
  } else {
    return request({
      url: `/books`,
      method: 'post',
      data: {
        ...bookInfo
      }
    })
  }
}
