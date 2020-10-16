<template>
	<a-table
		:columns="columns"
		:data-source="topicsList"
		:rowKey="(record) => record.topic_id"
		bordered
	>
		<template v-for="col in ['topic.topic_id', 'topic.title']" slot-scope="text ">
			<div :key="col">
				<!-- <a-input v-if="record.editable" style="margin: -5px 0" :value="text" />
				<template v-else>{{ text }}</template>-->
				{{ text }}
			</div>
		</template>
		<template slot="icon" slot-scope="text, record">
			<img :src="record.topic.icon" style="width: 100px; " alt />
		</template>
		<template slot="operation" slot-scope="text, record">
			<!-- <div class="editable-row-operations">
				<span v-if="record.editable">
					<a>Save</a>
					<a-popconfirm title="Sure to cancel?">
						<a>Cancel</a>
					</a-popconfirm>
				</span>
				<span v-else>
					<a>Edit</a>
				</span>
			</div>-->
			<a-button type="primary" :size="size" style="margin-right: 10px;">添加</a-button>
			<a-button type="danger" :size="size" @click="del(record)">删 除</a-button>
		</template>
	</a-table>
</template>
<script>
import { getTopics, delTopics } from '@/api/topics'
const columns = [
  {
    title: 'I D',
    dataIndex: 'topic.topic_id',
    width: '25%',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '话题标题',
    dataIndex: 'topic.title',
    width: '15%',
    scopedSlots: { customRender: 'title' }
  },
  {
    title: '图片',
    dataIndex: 'icon',
    width: '40%',
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

// const data = []

// for (let i = 0; i < 100; i++) {
// 	data.push({
// 		key: i.toString(),
// 		name: `Edrward ${i}`,
// 		age: 32,
// 		address: `London Park no. ${i}`,
// 	})
// }
export default {
  name: 'topics',
  data () {
    // this.cacheData = data.map((item) => ({ ...item }))
    return {
      // data,
      columns,
      // editingKey: '',
      size: 'large',
      topicsList: []
    }
  },
  mounted () {
    this.getTopics()
  },
  methods: {
    handleSizeChange (e) {
      this.size = e.target.value
    },
    async getTopics () {
      const result = await getTopics()
      this.topicsList = result
    },
    async del (record) {
      const result = await delTopics(record.id)
      console.log(result)
      this.getTopics()
    }
    // handleChange(value, key, column) {
    // 	const newData = [...this.data]
    // 	const target = newData.filter((item) => key === item.key)[0]
    // 	if (target) {
    // 		target[column] = value
    // 		this.data = newData
    // 	}
    // },
    // edit(key) {
    // 	const newData = [...this.data]
    // 	const target = newData.filter((item) => key === item.key)[0]
    // 	this.editingKey = key
    // 	if (target) {
    // 		target.editable = true
    // 		this.data = newData
    // 	}
    // },
    // save(key) {
    // 	const newData = [...this.data]
    // 	const newCacheData = [...this.cacheData]
    // 	const target = newData.filter((item) => key === item.key)[0]
    // 	const targetCache = newCacheData.filter((item) => key === item.key)[0]
    // 	if (target && targetCache) {
    // 		delete target.editable
    // 		this.data = newData
    // 		Object.assign(targetCache, target)
    // 		this.cacheData = newCacheData
    // 	}
    // 	this.editingKey = ''
    // },
    // cancel(key) {
    // 	const newData = [...this.data]
    // 	const target = newData.filter((item) => key === item.key)[0]
    // 	this.editingKey = ''
    // 	if (target) {
    // 		Object.assign(
    // 			target,
    // 			this.cacheData.filter((item) => key === item.key)[0]
    // 		)
    // 		delete target.editable
    // 		this.data = newData
    // 	}
    // },
  }
}
</script>
<style scoped>
.editable-row-operations a {
	margin-right: 8px;
}
</style>
