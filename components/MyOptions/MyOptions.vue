<template>
	<view class="my-options" v-if="visiable">

		<view class="main">
			<view class="top">
				选择{{formLabel}}
				<image @click="closeHandler" src="../../static/images/common/close.png" mode="" class="icon"></image>
			</view>
			<!-- 选择 -->
			<view class="list">
				<view class="item" @click="selectChangeHandler(item)"
					:class="{'active':item[dictProps.value] === dictValue}" v-for="item in options"
					:key="item[dictProps.value]">
					{{item[dictProps.label]}}
				</view>
			</view>
		</view>
	</view>

</template>

<script setup name="MyOptions">
	import MyOptions from '@/components/MyOptions/index'
	const props = defineProps({
		// 是否显示
		visiable: {
			type: Boolean,
			default: false
		},
		// 表单label
		formLabel: {
			type: String,
			required: true
		},
		// 下拉数据渲染
		options: {
			type: Array,
			default: () => []
		},
		// 字典值
		dictValue: {},
		// 配置项
		dictProps: {
			type: Object,
			default: () => ({
				label: 'dictLabel',
				value: 'dictValue',
			})
		}
	})
	const $emit = defineEmits(['update:visiable', 'update:dictValue', 'update:dictLabel'])
	// item选择
	const selectChangeHandler = (item) => {
		$emit('update:dictValue', item[props.dictProps.value])
		$emit('update:dictLabel', item[props.dictProps.label])
		$emit('update:visiable', false)
	}
	// 关闭
	const closeHandler = () => {
		$emit('update:visiable', false)
	}
</script>

<style lang="scss" scoped>
	.my-options {
		position: fixed;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 0px 0px 0px 0px;

		.main {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			background: #FFFFFF;
			border-radius: 40rpx 40rpx 0px 0px;
			padding: 0 38rpx;

			.top {
				padding: 30rpx 0;
				font-family: Microsoft YaHei, Microsoft YaHei;
				font-weight: bold;
				font-size: 36rpx;
				color: #333333;
				line-height: 42rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
				position: relative;

				.icon {
					position: absolute;
					right: 0;
					top: 28rpx;
					width: 48rpx;
					height: 48rpx;
				}
			}

			.list {
				overflow: auto;
				height: 944rpx;
				padding: 30rpx 0;

				.item {
					width: 100%;
					height: 104rpx;
					line-height: 104rpx;
					border-radius: 0;
					font-family: Microsoft YaHei, Microsoft YaHei;
					font-weight: 400;
					font-size: 30rpx;
					color: #333333;
					text-align: center;
					font-style: normal;
					text-transform: none;
				}

				.item.active {
					background: #F4F4F4;
				}

			}
		}

	}
</style>