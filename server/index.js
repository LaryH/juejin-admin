let casual = require('casual')
const events = require('./events/events.json')

const roleMap = [
	{
		label: '超级管理员',
		value: 1
	},
	{
		label: '管理员',
		value: 2
	},
	{
		label: '操作员A',
		value: 3
	},
	{
		label: '操作员B',
		value: 4
	}
]

const menus = [
	{
		id: '2',
		icon: 'dashboard',
		path: '/dashboard',
		name: 'dashboard',
		title: 'Dashboard',
		children: [
			{
				id: '21',
				icon: '',
				path: '/dashboard/home',
				name: 'home',
				title: '首页'
			},
			{
				id: '22',
				icon: '',
				path: '/dashboard/pins',
				name: 'pins',
				title: '沸点'
			},
			{
				id: '23',
				icon: '',
				path: '/dashboard/topics',
				name: 'topics',
				title: '话题'
			},
			{
				id: '24',
				icon: '',
				path: '/dashboard/books',
				name: 'books',
				title: '小册'
			},
			{
				id: '25',
				icon: '',
				path: '/dashboard/events',
				name: 'events',
				title: '活动',
				children: [
					{
						id: '251',
						icon: '',
						path: '/dashboard/events/bannerList',
						name: 'bannerList',
						title: '轮播图列表'
					},
					{
						id: '252',
						icon: '',
						path: '/dashboard/events/citys',
						name: 'citys',
						title: '城市列表'
					},
					{
						id: '253',
						icon: '',
						path: '/dashboard/events/eventList',
						name: 'eventList',
						title: '活动列表'
					}
				]
			}
		]
	}
]

casual.define('user', function(role) {
	return {
		id: casual.card_number(),
		username: casual.username,
		contacts: casual.full_name,
		contactsEmail: casual.email,
		address: casual.address,
		roleId: role.value,
		status: casual.integer(0, 1),
		createTime: casual.unix_time,
		updateTime: casual.unix_time
	}
})

module.exports = () => {
	const data = {
		users: [],
		roles: roleMap,
		login: {
			status: 200,
			data: {
				token:
					'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMTU2MjA5MyIsImNyZWF0ZWQiOjE1NjE1MTY3NjU5MzMsImNvbXBhbnlOYW1lIjoiQee9kSIsInRlbmFudElkIjoxLCJ1c2VyVHlwZSI6InN0YWZmIiwiaWQiOjEsImV4cCI6MTU2MTUyMDM2NX0.j8sWbwXzHnSgvz7em2DjAhNDU5xaxysEFES8SlyJZnj0lVgXKax4tEDNGawZivW6Ip1734Rnvb6z2te8jGmIWQ"',
				menus: menus,
				user: casual.user(casual.random_element(roleMap))
			},
			message: 'success'
		},
		logout: {
			status: 200,
			message: 'success'
		},
		events: events
	}

	for (let i = 0; i < 54; i++) {
		data.users.push(casual.user(casual.random_element(roleMap)))
	}

	return data
}
