<template>
	<a-card class="eventList">
		<div class="eventList-box" v-if="!isShowEventFrom">
			<a-button type="primary" icon="plus-circle" @click="addEvent">
				添加
			</a-button>
			<a-table
				:columns="columns"
				:data-source="eventList"
				:rowKey="record => record.id"
				bordered
			>
				<span slot="screenshot" slot-scope="text, record">
					<img style="width:50px;heigth:50px" :src="record.screenshot" />
				</span>
				<template
					v-for="col in ['event_title', 'city']"
					:slot="col"
					slot-scope="text, record"
				>
					<div :key="col">
						<a-input
							v-if="record.editable"
							style="margin: -5px 0"
							:value="text"
							prop="event_title"
							@change="e => handleChange(e.target.value, record.id, col)"
						/>
						<template v-else>
							{{ text }}
						</template>
					</div>
				</template>
				<div slot="event_start_time" slot-scope="text">
					{{ text | changeTimer }}
				</div>
				<template slot="operation" slot-scope="text, record">
					<div class="editable-row-operations">
						<div v-if="record.editable">
							<a-button type="primary" @click="() => save(record.id)"
								>保存</a-button
							>
							<a-popconfirm
								title="确认取消?"
								@confirm="() => cancel(record.id)"
							>
								<a-button type="danger">取消</a-button>
							</a-popconfirm>
						</div>
						<div v-else>
							<a-button
								icon="edit"
								:disabled="editingKey !== ''"
								@click="() => edit(record.id)"
							>
								修改
							</a-button>
							<a-popconfirm
								title="确认删除此活动?"
								ok-text="是"
								cancel-text="否"
								@confirm="del(record.id)"
							>
								<a-button type="danger" icon="close-circle">
									删除
								</a-button>
							</a-popconfirm>
						</div>
					</div>
				</template>
			</a-table>
		</div>
		<EventFrom v-else :isShowEventFrom.sync="isShowEventFrom"></EventFrom>
	</a-card>
</template>

<script>
import { getEventList, getCitysList, delEvent, modifyEvent } from '@/api/events'
import EventFrom from '../components/EventFrom'
// 日期
import dayjs from 'dayjs'
// 按需加载 中文
import 'dayjs/locale/zh-cn'
import Vue from 'vue'
const columns = [
	{
		title: 'id',
		dataIndex: 'id',
		width: '10%',
		align: 'center',
		scopedSlots: { customRender: 'id' }
	},
	{
		title: '标题',
		dataIndex: 'event_title',
		width: '20%',
		align: 'center',
		scopedSlots: { customRender: 'event_title' }
	},
	{
		title: '图片',
		dataIndex: 'screenshot',
		width: '20%',
		align: 'center',
		scopedSlots: { customRender: 'screenshot' }
	},
	{
		title: '城市',
		dataIndex: 'city',
		width: '10%',
		align: 'center',
		scopedSlots: { customRender: 'city' }
	},
	{
		title: '开始时间',
		dataIndex: 'event_start_time',
		width: '20%',
		align: 'center',
		scopedSlots: { customRender: 'event_start_time' }
	},
	{
		title: '操作',
		dataIndex: 'operation',
		align: 'center',
		scopedSlots: { customRender: 'operation' }
	}
]
export default {
	name: 'eventList',
	data() {
		return {
			columns,
			eventList: [],
			cacheData: [],
			editingKey: '',
			isShowEventFrom: false,
			isReload: false
		}
	},
	async mounted() {
		await this.getEventList()
		this.cacheData = this.eventList.map(item => ({ ...item }))
	},
	components: { EventFrom },
	methods: {
		// 获取活动列表
		async getEventList() {
			try {
				const result = await getEventList()
				this.eventList = result
			} catch (error) {
				console.log(error)
			}
		},

		// 删除活动
		async del(eventId) {
			try {
				await delEvent(eventId)
				this.$message.success('删除活动成功~~~')
				// 重新获取列表
				this.getEventList()
			} catch (error) {
				console.log(error)
			}
		},

		// 添加活动
		addEvent() {
			this.isShowEventFrom = true
		},

		handleChange(value, key, column) {
			const newData = [...this.eventList]
			const target = newData.filter(item => key === item.id)[0]
			if (target) {
				target[column] = value
				this.eventList = newData
			}
		},

		// 编辑
		edit(key) {
			const newData = [...this.eventList]
			const target = newData.filter(item => key === item.id)[0]
			this.editingKey = key
			if (target) {
				target.editable = true
				this.eventList = newData
			}
		},

		// 保存
		async save(key) {
			const newData = [...this.eventList]
			const newCacheData = [...this.cacheData]
			const target = newData.filter(item => key === item.id)[0]
			const targetCache = newCacheData.filter(item => key === item.id)[0]

			if (target && targetCache) {
				delete target.editable
				this.eventList = newData
				Object.assign(targetCache, target)
				this.cacheData = newCacheData
				// 发送请求
				const { id, city, event_title } = targetCache
				try {
					await modifyEvent(id, { city, event_title })
					this.$message.success('修改活动成功~~~')
					// 重新获取列表
					this.getEventList()
				} catch (error) {
					console.log(error)
				}
			}
			this.editingKey = ''
			console.log(target)
			console.log(targetCache)
		},

		// 取消
		cancel(key) {
			const newData = [...this.eventList]
			const target = newData.filter(item => key === item.id)[0]
			this.editingKey = ''
			if (target) {
				Object.assign(target, this.cacheData.filter(item => key === item.id)[0])
				delete target.editable
				this.eventList = newData
			}
		}
	},
	filters: {
		changeTimer: function(value) {
			if (!value) return ''
			return dayjs(value * 1000)
				.locale('zh-cn')
				.format('MM-DD dddd')
		}
	}
}
</script>

<style lang="less" scoped>
.editable-row-operations a {
	margin-right: 8px;
}
</style>
