<template>
  <div>
    <a-button type="primary" >
       添加文章
    </a-button>
    <a-table :columns="columns" :data-source="pinslist" bordered :rowKey="(record)=>record.msg_id">
      <template v-for="col in ['author_user_info.user_name', 'msg_Info.content', 'topic.title']" :slot="col" slot-scope="text, record, index">
      </template>
    <template slot="operation" slot-scope="text, record, index">
  <div class="editable-row-operations">
    <a-button icon='plus' type='primary' size='large' />
    <a-button icon='delete' type='danger' size='large' @click="(index)=>pinslist.splice(index,1)" />
  </div>
</template>
  </a-table>
 </div>
 
</template>
<script>
const columns = [
	{
		title: '作者',
		dataIndex: 'author_user_info.user_name',
		width: '25%',
		scopedSlots: { customRender: '作者' }
	},
	{
		title: '内容',
		dataIndex: 'msg_Info.content',
		width: '40%',
		scopedSlots: { customRender: '内容' }
	},
	{
		title: '分类',
		dataIndex: 'topic.title',
		width: '15%',
		scopedSlots: { customRender: '分类' }
	},
	{
		title: '操作',
		dataIndex: 'operation',
		scopedSlots: { customRender: 'operation' }
	}
]

import pins from './list.json'
export default {
	data() {
		return {
			pinslist: [],
			columns
		}
	},
	mounted() {
		this.getpinslist()
	},
	methods: {
		getpinslist() {
			this.pinslist = pins.data
		}
	}
}
</script>
<style scoped>
.editable-row-operations a {
	margin-right: 8px;
  
}
</style>