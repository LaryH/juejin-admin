<template>
	<a-form-model
		:model="eveInfo"
		:label-col="labelCol"
		:wrapper-col="wrapperCol"
		:rules="rules"
		ref="eventForm"
	>
		<a-form-model-item label="标题" prop="event_title">
			<a-input v-model="eveInfo.event_title" />
		</a-form-model-item>
		<a-form-model-item label="城市">
			<a-select
				default-value="北京"
				style="width: 120px"
				@change="handleCity($event)"
			>
				<a-select-option v-for="city in citys" :key="city.city_name">
					{{ city.city_name }}
				</a-select-option>
			</a-select>
		</a-form-model-item>
		<a-form-model-item label="图片" prop="screenshot">
			<a-upload
				name="avatar"
				list-type="picture-card"
				class="avatar-uploader"
				:show-upload-list="false"
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				:before-upload="beforeUpload"
				@change="handleChange"
			>
				<img v-if="eveInfo.screenshot" :src="eveInfo.screenshot" alt="avatar" />
				<div v-else>
					<a-icon :type="loading ? 'loading' : 'plus'" />
					<div class="ant-upload-text">
						Upload
					</div>
				</div>
			</a-upload>
		</a-form-model-item>
		<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
			<a-button type="primary" @click="onSave">
				保存
			</a-button>
			<a-button style="margin-left: 10px;" @click="cancel">
				取消
			</a-button>
		</a-form-model-item>
	</a-form-model>
</template>

<script>
import { getCitysList, addEvent } from '@/api/events'
export default {
	name: 'EventFrom',
	props: ['isShowEventFrom'],
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			citys: {},
			eveInfo: {
				event_title: '',
				city: '北京',
				screenshot: '',
				event_start_time: new Date()
			},
			loading: false,
			rules: {
				event_title: [
					{
						required: true,
						message: '请输入有效的活动名',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 20,
						message: '长度应该在 2 到 20 字符',
						trigger: 'blur'
					}
				],
				screenshot: [
					{ required: true, message: '请上传图片', trigger: 'change' }
				]
			}
		}
	},

	mounted() {
		this.getCitysList()
	},

	methods: {
		// 获取城市列表
		async getCitysList() {
			try {
				const result = await getCitysList()
				this.citys = result[0].other_citys
			} catch (error) {
				console.log(error)
			}
		},

		// 选择城市
		handleCity(event) {
			this.eveInfo.city = event
		},

		// 上传图片
		handleChange(info) {
			if (info.file.status === 'uploading') {
				this.loading = true
				return
			}
			if (info.file.status === 'done') {
				// Get this url from response in real world.
				this.eveInfo.screenshot = info.file.response.url
				this.loading = false
				this.$message.success('图片上传成功~~~')
			}
		},

		//提前判断图片类型和大小限制
		beforeUpload(file) {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
			if (!isJpgOrPng) {
				this.$message.error('你只能上传 JPG 文件!')
			}
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isLt2M) {
				this.$message.error('文件不能超过 2MB!')
			}
			return isJpgOrPng && isLt2M
		},

		// 保存
		onSave() {
			this.$refs.eventForm.validate(async valid => {
				if (valid) {
					try {
						const result = await addEvent(this.eveInfo)
						this.$message.success('活动添加成功~~')
						this.cancel()
						this.$parent.$parent.getEventList()
					} catch (error) {
						console.log(error)
					}
				} else {
					this.$message.error('请确认相关内容填写完毕')
					return false
				}
			})
		},

		// 清空数据
		resetEveInfo() {
			this.eveInfo = {
				event_title: '',
				city: '北京',
				screenshot: '',
				event_start_time: new Date().getTime()
			}
		},

		// 取消
		cancel() {
			this.resetEveInfo()
			this.$emit('update:isShowEventFrom', false)
		}
	}
}
</script>

<style lang="less" scoped>
.avatar-uploader > .ant-upload {
	width: 128px;
	height: 128px;
}

.avatar-uploader img {
	max-width: 600px;
	height: 600px;
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
