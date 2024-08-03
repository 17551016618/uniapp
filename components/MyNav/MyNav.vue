<template>
	<view class="my-nav" :style="{position:isFixed ? 'fixed' : 'relative'}">
		<image @click="backHandler" class="back-iocn" src="../../static/images/common/back-black.png" mode=""></image>
		<view class="title">
			{{title}}
		</view>
	</view>
</template>

<script setup name="MyNav">
	const props = defineProps({
		title: {
			type: String,
			required: true
		},
		isFixed: {
			type: Boolean,
			default: false,
		}
	})
	const $emit = defineEmits(['backHandler'])
	const backHandler = () => {
		$emit('backHandler')
	}
</script>

<style lang="scss" scoped>
	.my-nav {
		// 外围需要设置178rpx的padding-top（包含边框）保持安全距离
		height: 176rpx;
		padding: 88rpx 22rpx 22rpx 22rpx;
		font-weight: bold;
		top: 0;
		left: 0;
		font-size: 34rpx;
		color: #000000;
		text-align: center;
		width: 100%;
		border-bottom: 2rpx solid #EDEDED;
		display: flex;
		justify-content: center;
		font-family: Microsoft YaHei, Microsoft YaHei;
		align-items: center;
		text-align: left;
		font-style: normal;
		text-transform: none;

		.back-iocn {
			position: absolute;
			left: 22rpx;
			top: 100rpx;
			width: 44rpx;
			height: 44rpx;

		}


	}
</style>