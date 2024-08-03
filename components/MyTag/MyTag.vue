<template>
	<view class="tag-warp" @click="clickHanler">
		<slot></slot>
		<image @click="closeHandler" v-if="closeable" src="../../static/images/common/cross.png" class="close"></image>
	</view>

</template>

<script setup name='MyTag'>
	const props = defineProps({
		closeable: {
			type: Boolean,
			default: false
		}
	})
	const $emit = defineEmits(['closeHandler', 'clickHanler'])
	const closeHandler = () => {
		$emit('closeHandler')
	}
	const clickHanler = () => {
		$emit('clickHanler')
	}
</script>

<style lang="scss" scoped>
	.tag-warp {
		height: 64rpx;
		line-height: 64rpx;
		background: #F4F4F4;
		border-radius: 30rpx;
		text-align: center;
		padding: 0 24rpx;
		font-family: Microsoft YaHei, Microsoft YaHei;
		font-weight: 400;
		font-size: 28rpx;
		color: #999999;
		font-style: normal;
		text-transform: none;
		position: relative;
		margin-right: 16rpx;

		.close {
			position: absolute;
			width: 28rpx;
			height: 28rpx;
			top: -6rpx;
			right: -6rpx;
		}

	}
</style>