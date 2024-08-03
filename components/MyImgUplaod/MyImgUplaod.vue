<template>
	<view class="img-uplaod">
		<!-- 选择照片的图片 -->
		<image v-if="validateNull(fileName)" @click="chooseImg" :style="{width:width,height:height}"
			src="../../static/images/uplaod/choose-ing.png"></image>
		<!-- 上传的图片回显 -->
		<image v-else :src="handleUrl(fileName)" @click="chooseImg" :style="{width:width,height:height}"></image>
	</view>

</template>

<script setup>
	import {
		chooseImage,
		uploadFile,
		handleUrl
	} from '@/utils/file.js'
	import config from '@/config/index.js'
	import {
		ref
	} from 'vue'
	import {
		validateNull
	} from '@/utils/index.js'
	const props = defineProps({
		modelValue: {

		},
		width: {
			type: String,
			default: '360rpx'
		},
		height: {
			type: String,
			default: '208rpx'
		},

	})
	const fileName = ref('')
	const $emit = defineEmits(['update:modelValue'])
	const chooseImg = () => {
		chooseImage().then((files) => {
			const filePath = files[0].path
			uploadFile(filePath).then(res => {
				fileName.value = res.fileName
				// 后端只需要name
				$emit('update:modelValue', res.fileName)
			})
		})

	}
</script>

<style lang="scss">
	.img-uplaod {
		.choose-img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>