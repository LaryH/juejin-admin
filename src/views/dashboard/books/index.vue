<template>
	<div>
    <a-card class="selectCard">
      <div class="add-btn" v-show="!isOk">
				<a-button
					type="primary"
					size="large"
          @click="isOk=!isOk"
					>添加文章</a-button
				>
			</div>

    <a-card class="selectCard" v-show="!isOk">
      <a-table :columns="columns" :data-source="books" bordered :rowKey="(record)=>record.booklet_id">
      <template
        v-for="col in ['user_info.user_name', 'base_info.title', 'base_info.section_count']"
        :slot="col"
        slot-scope=""
      >
      </template>

      <template slot="operation"  slot-scope="text, record">
        <a-button  icon="plus" type="primary" @click="isOk=!isOk"/>
        <a-button  icon="delete"  type="danger"  @click="del(record)"/>
        <a-button icon="edit" @click="change(record)"/>
      </template>

    </a-table>
  </a-card>
</a-card>

		<a-card v-show="isOk">

    <a-form-model-item label="作者">
      <a-input v-model="bookInfo.user_info.user_name" />
    </a-form-model-item>
    <a-form-model-item label="文章名称">
        <a-input v-model="bookInfo.base_info.title"/>
    </a-form-model-item>
    <a-form-model-item label="小节">
        <a-input v-model="bookInfo.base_info.section_count"/>
    </a-form-model-item>

			<a-button type="danger"  @click="isOk=false">取消 </a-button>
      <a-button type="primary" @click="save"> 确定</a-button>
		</a-card>
	</div>
</template>

<script>

import { getBooksList, delBooks, modifyBook } from '@/api/books'
const columns = [
  {
    title: '作者',
    dataIndex: 'user_info.user_name',
    width: 100,
    align: 'center'
  },
  {
    title: '文章名称',
    dataIndex: 'base_info.title',
    width: 80,
    align: 'center'
  },
  {
    title: '小节',
    dataIndex: 'base_info.section_count',
    width: 50,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  }
]
export default {
  name: 'books',
  data () {
    return {
      books: [],
      columns,
      isOk: false,

      bookInfo: {
        user_info: { user_name: '' },
        base_info: { title: '' },
        base_info: { section_count: '' }
      }
    }
  },

  mounted () {
    this.getBoocksList()
  },

  methods: {
    async getBoocksList () {
      const result = await getBooksList(this.books)
      this.books = result
    },

    async del (record) {
      const result = await delBooks(record.id)
      this.getBoocksList()
    },

    async save () {
      const result = await modifyBook(this.bookInfo)
      console.log(result)
      this.getBoocksList()
      // this.bookInfo.user_info.user_name="",
      // this.bookInfo.base_info.title="",
      // this.bookInfo.base_info.section_count=""
      this.isOk = !this.isOk
    },

    async change (record) {
      this.isOk = !this.isOk
      this.bookInfo = record
      console.log(this.bookInfo)
    }

  }

}
</script>

<style lang="less" scoped></style>
