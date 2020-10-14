import { AppLayout, ViewLayout } from '@/components/Layout'

const otherRoutes = [
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/auth/login')
	},
	{
		path: '/error',
		name: 'error',
		redirect: '404',
		component: ViewLayout,
		children: [
			{
				path: '404',
				name: '404',
				component: () =>
					import(/* webpackChunkName: "404" */ '@/views/error/404')
			}
		]
	}
]

export const appRoutes = [
	{
		path: '/',
		name: 'index',
		redirect: '/dashboard/home',
		component: AppLayout,
		children: [
			{
				path: 'table',
				name: 'table',
				meta: {
					title: '表格页',
					icon: 'table'
				},
				component: () =>
					import(/* webpackChunkName: "table" */ '@/views/table/table')
			},
			{
				path: 'dashboard',
				name: 'dashboard',
				meta: {
					title: 'Dashboard',
					icon: 'dashboard'
				},
				component: ViewLayout,
				children: [
					{
						path: 'home',
						name: 'dashboard_home',
						meta: {
							title: '首页'
						},
						component: () =>
							import(/* webpackChunkName: "home" */ '@/views/dashboard/home')
					},
					{
						path: 'pins',
						name: 'dashboard_pins',
						meta: {
							title: '沸点'
						},
						component: () =>
							import(/* webpackChunkName: "pins" */ '@/views/dashboard/pins')
					},
					{
						path: 'topics',
						name: 'topics',
						meta: {
							title: '话题'
						},
						component: () =>
							import(
								/* webpackChunkName: "topics" */ '@/views/dashboard/topics'
							)
					},
					{
						path: 'books',
						name: 'books',
						meta: {
							title: '小册'
						},
						component: () =>
							import(/* webpackChunkName: "books" */ '@/views/dashboard/books')
					},
					{
						path: 'events',
						name: 'events',
						meta: {
							title: '活动'
						},
						component: () =>
							import(
								/* webpackChunkName: "events" */ '@/views/dashboard/events'
							)
					}
				]
			}
		]
	}
]

const routes = [...otherRoutes, ...appRoutes]

export default routes
