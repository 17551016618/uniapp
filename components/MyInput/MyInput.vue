<template>
	<view class="my-input" :class={hasBorder:border}>
		<view class="label">{{label}}
		</view>
		<!-- 非禁用 -->
		<input v-if="!disabled" v-model="myModelValue" :type="type" :placeholder="myPlaceholder" class="ipt" />
		<!-- 禁用 -->
		<view v-else class="name">{{myModelValue}}
			<!-- 直接写到标签里面（默认展示到这里--只读状态） -->
			<slot></slot>
		</view>

		<view class="right">
			<!-- 自定义一些图标，比如选择经纬度 -->
			<slot name="right"></slot>
		</view>
	</view>

</template>

<script setup name="MyInput">
	import {
		computed
	} from 'vue'
	import {
		validateNull
	} from "@/utils/index.js"
	const props = defineProps({
		// 双向绑定值
		modelValue: {},
		// label
		label: {},
		// 提示文字
		placeholder: {
			type: String,
			default: ''
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// input类型
		type: {
			type: String,
			default: 'text'
		},
		border: {
			type: Boolean,
			default: true,
		}
	})
	const $emit = defineEmits(['update:modelValue'])
	const myModelValue = computed({
		get() {
			return props.modelValue
		},
		set(val) {
			$emit('update:modelValue', val)
		}
	})
	const myPlaceholder = computed(() => {
		if (validateNull(props.placeholder)) {
			return `请输入${props.label}`
		} else {
			return props.placeholder
		}
	})
</script>

<style lang="scss" scoped>
	.my-input {
		width: 100%;
		height: 102rpx;
		padding: 32rpx 0;
		display: flex;
		flex-direction: row;
		align-items: center;

		.label,
		.right {
			flex: none;
		}

		.label {
			margin-right: 22rpx;
		}


		.ipt,
		.name {
			width: 0;
			flex: 1;
		}

		.ipt,
		.label,
		.name {
			font-family: Microsoft YaHei, Microsoft YaHei;
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
			line-height: 35rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}


		.ipt,
		.name {
			text-align: right;
		}

		.ipt::placeholder {
			font-weight: 400 !important;
			font-size: 30rpx;
			color: #666666;
			line-height: 35rpx;
			text-align: right;
		}
	}

	.my-input.hasBorder {
		border-bottom: 2rpx solid #EFEFEF;
	}
</style>