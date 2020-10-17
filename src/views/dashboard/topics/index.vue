<template>
	<a-card>
		<!-- 添加 -->
		<div>
			<a-button type="primary" @click="showAdd " style="    margin-bottom: 15px">+ 添 加</a-button>
			<a-modal
				title="添加品牌"
				:visible="visible"
				:confirm-loading="confirmLoading"
				@ok="handleSubmit"
				@cancel="handleCancel"
			>
				<!-- <p>{{ ModalText }}</p> -->
				<a-form-model :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-form-item label="话题名称">
						<a-input
							v-decorator="['note', { rules: [{ required: true, message: '请添加你的话题名称!' }] }]"
							v-model="brand.topic.brandTitle"
						/>
					</a-form-item>
					<a-form-item label="上传图片">
						<!-- <a-input v-decorator="['gender', { rules: [{ required: true, message: '请上传你的图片!' }] }]" /> -->
						<a-upload
							name="avatar"
							list-type="picture-card"
							class="avatar-uploader"
							:show-upload-list="false"
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							:before-upload="beforeUpload"
							@change="handleChange"
							v-decorator="['gender', { rules: [{ required: true, message: '请上传你的图片!' }] }]"
						>
							<img v-if="brand.topic.icon" :src="brand.topic.icon" alt="avatar" />
							<div v-else>
								<a-icon :type="loading ? 'loading' : 'plus'" />
								<div class="ant-upload-text">Upload</div>
							</div>
						</a-upload>
					</a-form-item>
					<!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
						<a-button type="primary" html-type="submit">确定</a-button>
					</a-form-item>-->
				</a-form-model>
			</a-modal>
		</div>
		<a-table
			:columns="columns"
			:data-source="topicsList"
			:rowKey="(record) => record.topic_id"
			bordered
		>
			<template v-for="col in ['topic.topic_id', 'topic.brandTitle']" slot-scope="text ">
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
				<a-button type="primary" :size="size" style="margin-right: 10px;" @click="showModify(record)">修改</a-button>
				<a-button type="danger" :size="size" @click="del(record)">删 除</a-button>
			</template>
		</a-table>
	</a-card>
</template>
<script>
import { getTopics, delTopics, addTopics, modTopics } from '@/api/topics'
const columns = [
  {
    title: 'I D',
    dataIndex: 'topic_id',
    width: '25%',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '话题标题',
    dataIndex: 'topic.brandTitle',
    width: '15%',
    scopedSlots: { customRender: 'brandTitle' }
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
      topicsList: [],
      // ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false,
      imageUrl: '',
      brand: {
        topic: { brandTitle: '', icon: '' }
      }
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
    },
    // 进修改
    showModify (record) {
      this.resetDate()
      this.visible = true
      console.log(record)
      this.brand = record
    },
    //
    showAdd () {
      this.resetDate()
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    async handleSubmit (e) {
      e.preventDefault()
      if (this.brand.id) {
        // 修改的方法
        await modTopics(this.brand)
      } else {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            await addTopics({
              ...this.brand,
              topic_id: (Math.random() * 10000000000000000).toString()
            })
          }
        })
      }
      this.getTopics()

      this.visible = false
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // 拿到上传图片
        this.brand.topic.icon = info.file.response.url
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    resetDate () {
      this.brand = {
        topic: { brandTitle: '', icon: '' },
        id: ''
      }
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
	margin-right: 8px;
}
.avatar-uploader > .ant-upload {
	width: 128px;
	height: 128px;
}

.avatar-uploader img {
	max-width: 200px;
}
.ant-upload-select-picture-card i {
	font-size: 32px;
	color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
</style>
