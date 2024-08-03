<template>
	<view class="my-modal" v-if="visiable">
		<view class="modal">
			<view class="title" :style="{textAlign:align}">{{title}}</view>
			<view class="content" :style="{textAlign:align}">
				{{content}}
				<slot name="content"></slot>
			</view>
			<view class="footer">
				<view class="back" @click="backHandler">返回</view>
				<view class="confirm" @click="confirmHandler">确认</view>
			</view>

		</view>

	</view>
</template>

<script setup name="MyModal">
	const props = defineProps({
		visiable: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		align: {
			type: String,
			default: 'left'
		},
	})
	const $emit = defineEmits(['backHandler', 'confirmHandler', 'update:visiable'])
	// 返回
	const backHandler = () => {
		$emit('update:visiable', false)
		$emit('backHandler')
	}
	// 确定
	const confirmHandler = () => {
		$emit('update:visiable', false)
		$emit('confirmHandler')
	}
</script>

<style lang="scss">
	.my-modal {
		position: fixed;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 0px 0px 0px 0px;
		display: flex;
		justify-content: center;
		align-items: center;

		.modal {
			width: 600rpx;
			background: #FFFFFF;
			border-radius: 16rpx;


			.title {
				font-family: Microsoft YaHei, Microsoft YaHei;
				font-weight: bold;
				font-size: 32rpx;
				color: #333333;
				line-height: 38rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
				padding: 40rpx;
				padding-bottom: 0;
			}

			.content {
				font-family: Microsoft YaHei, Microsoft YaHei;
				font-weight: 400;
				font-size: 28rpx;
				color: #000000;
				line-height: 56rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
				padding: 20rpx 40rpx 40rpx 40rpx;

			}

			.footer {
				display: flex;
				justify-content: space-between;
				border-top: 2rpx solid #C6C6C8;

				.back,
				.confirm {
					width: 299rpx;
					height: 104rpx;
					line-height: 104rpx;
					font-weight: 400;
					font-size: 34rpx;
					text-align: center;
					font-style: normal;
					text-transform: none;
					cursor: pointer;
				}

				.back {
					border-right: 2rpx solid #C6C6C8;
					color: #333333;
				}

				.confirm {
					color: #0FAD70;
				}


			}
		}

	}
</style>