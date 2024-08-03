<template>
	<view class="my-select" :class={hasBorder:border}>
		<view class="col">
			{{formLabel}}
		</view>
		<view class="col col2" @click="selectHandler">
			<view class="name">{{dictLabel}}</view>
			<image class="img" src="../../static/images/common/arrow-right.png"></image>
		</view>
	</view>
	<my-options v-model:visiable="visiable" v-model:dictLabel="myDictLabel" v-model:dictValue="myDictValue"
		:formLabel="formLabel" v-bind="$attrs"></my-options>
</template>

<script setup name="MySelect">
	import MyOptions from '@/components/MyOptions/index'
	import {
		computed,
		watch,
		ref
	} from 'vue'
	const props = defineProps({
		// 表单label
		formLabel: {
			type: String,
			required: true
		},
		// 字典值
		dictValue: {},
		// 字典label
		dictLabel: {},
		// 边框
		border: {
			type: Boolean,
			default: true,
		}
	})
	const $emit = defineEmits(['update:dictValue', 'update:dictLabel'])
	// 二次加工绑定给孙子组件
	const myDictValue = computed({
		get() {
			return props.dictValue
		},
		set(newVal) {
			// 更新爷爷的v-model值
			$emit('update:dictValue', newVal)
		}
	})
	// 二次加工绑定给孙子组件
	const myDictLabel = computed({
		get() {
			return props.dictLabel
		},
		set(newVal) {
			// 更新爷爷的v-model值
			$emit('update:dictLabel', newVal)
		}
	})
	// 是都展示选择面板
	const visiable = ref(false)
	// 点击名称选择
	const selectHandler = () => {
		// 打开选择面板
		visiable.value = true
	}
</script>

<style lang="scss" scoped>
	.my-select {
		width: 100%;
		height: 102rpx;
		padding: 32rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.col {
			height: 40rpx;
			font-family: Microsoft YaHei, Microsoft YaHei;
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
			line-height: 35rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}

		.col2 {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.img {
				width: 48rpx;
				height: 48rpx;
			}

			.name {
				margin-right: 20rpx;

			}
		}
	}

	.my-select.hasBorder {
		border-bottom: 2rpx solid #EFEFEF;
	}
</style>