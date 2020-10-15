<template>
	<div>
		<a-card class="selectCard">
			<div class="selectBar">
				<span class="title">分类:</span>
				<a-select style="width: 240px" @change="selectCategory" size="large">
					<a-select-option
						v-for="category in categoryList"
						:key="category.category_id"
						:value="category.category_id"
					>
						{{ category.category_name }}
					</a-select-option>
				</a-select>
			</div>
			<div class="selectBar">
				<span class="title">标签:</span>
				<a-select size="large" style="width: 240px" @change="selectTagId">
					<a-select-option
						v-for="tag in tagList"
						:key="tag.tag_id"
						:value="tag.tag_id"
					>
						{{ tag.tag_name }}
					</a-select-option>
				</a-select>
			</div>
			<div class="add-btn" v-show="!modify">
				<a-button
					type="primary"
					size="large"
					:disabled="!tagId"
					block
					@click="addArticle"
					>添加文章</a-button
				>
			</div>
		</a-card>
		<a-card v-show="!modify">
			<a-table
				bordered
				:rowKey="record => record.article_id"
				:data-source="articleList"
				:columns="columns"
			>
				<template slot="operation" slot-scope="text, record, index">
					<div class="editable-row-operations">
						<span class="operation-button">
							<a-button
								type="primary"
								shape="circle"
								icon="edit"
								size="large"
								@click="() => edit(record, index)"
							></a-button>
						</span>
						<span>
							<a-button
								type="danger"
								shape="circle"
								icon="delete"
								size="large"
								@click="() => deleteArticle(record.article_id)"
							></a-button>
						</span>
					</div>
				</template>
			</a-table>
		</a-card>
		<a-card v-show="modify">
			<a-form-model
				:model="articleInfo"
				:label-col="{ span: 1 }"
				labelAlign="left"
			>
				<a-form-model-item label="文章名称" :wrapperCol="{ span: 4 }">
					<a-input v-model="articleInfo.articleName" size="large" />
				</a-form-model-item>
				<a-form-model-item label="作者名称" :wrapperCol="{ span: 4 }">
					<a-input v-model="articleInfo.articleName" size="large" />
				</a-form-model-item>
				<a-form-model-item label="内容简介" :wrapperCol="{ span: 8 }">
					<a-textarea v-model="articleInfo.articleName" :row="6" />
				</a-form-model-item>
				<a-form-model-item>
					分类
				</a-form-model-item>
				<a-form-model-item>
					标签
				</a-form-model-item>
			</a-form-model>
			<a-button type="default" @click="cancel">取消</a-button>
		</a-card>
	</div>
</template>

<script>
import {
	getCategoryInfo,
	getTagInfo,
	getArticleInfo,
	deleteArticle,
	getboom
} from '@/api/home'
export default {
	name: '',
	data() {
		return {
			columns: [
				{
					title: '文章名称',
					dataIndex: 'article_info.title',
					width: 160,
					align: 'center'
				},
				{
					title: '作者',
					dataIndex: 'author_user_info.user_name',
					width: 80,
					align: 'center'
				},
				{
					title: '内容简介',
					dataIndex: 'article_info.brief_content',
					width: 400,
					align: 'center'
				},
				{
					title: '操作',
					dataIndex: 'operation',
					scopedSlots: { customRender: 'operation' },
					width: 120,
					align: 'center'
				}
			],
			categoryList: [],
			categoryId: null,
			tagList: [],
			tagId: null,
			articleList: [],
			modify: false,
			articleInfo: {}
		}
	},
	mounted() {
		this.getCategoryList()
	},
	methods: {
		async getCategoryList() {
			const result = await getCategoryInfo()
			if (result.err_msg === 'success') {
				this.categoryList = result.data
			}
		},

		async selectCategory(categoryId) {
			this.categoryId = categoryId
			const result = await getTagInfo()
			if (result.err_msg === 'success') {
				this.tagList = result.data
			}
		},

		async selectTagId(tagId) {
			this.tagId = tagId
			const result = await getArticleInfo()
			if (result.err_msg === 'success') {
				this.articleList = result.data
			}
		},
		addArticle() {
			this.modify = true
		},
		edit(key) {
			console.log(key)
			this.modify = true
			// const newData = [...this.articleList]
			// const target = newData.filter(item => key === item.key)[0]
			// this.editingKey = key
			// if (target) {
			// 	target.editable = true
			// 	this.data = newData
			// }
		},
		cancel() {
			this.modify = false
		},
		deleteArticle() {}
	}
}
</script>

<style lang="less" scoped>
.selectCard {
	width: 100%;
	margin: 20px 0;
	display: flex;
	.selectBar {
		margin: 0 20px;
		display: inline-block;
		width: 300px;
		.title {
			font: 700 18px/40px 'mrcrosoft yahei';
			color: #666;
			margin-right: 10px;
		}
	}
	.add-btn {
		display: inline-block;
		margin-left: 100px;
		width: 240px;
	}
}
.operation-button {
	margin: 0 10px;
}
</style>
