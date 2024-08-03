<template>
	<view class="my-radio" :class={hasBorder:border}>
		<view class="label">{{label}}</view>
		<view class="right">
			<radio-group @change="radioChange" style="text-align: right;">
				<label class="radio-label" v-for="(item, index) in options" :key="item[dictProps.value]">
					<radio :class="{'is-checked':modelValue === item[dictProps.value]}" :value="item[dictProps.value]"
						:checked="modelValue === item[dictProps.value]" />
					{{item[dictProps.label]}}
				</label>
			</radio-group>
		</view>
	</view>

</template>

<script setup name="MyInput">
	import {

	} from 'vue'
	import {
		validateNull
	} from "@/utils/index.js"
	const props = defineProps({
		// label
		label: {},
		options: {
			type: Array,
			default: () => []
		},
		// 双向绑定值
		modelValue: {},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: true,
		},
		// 配置项
		dictProps: {
			type: Object,
			default: () => ({
				label: 'dictLabel',
				value: 'dictValue',
			})
		}
	})
	const $emit = defineEmits(['update:modelValue'])

	const radioChange = (e) => {
		$emit('update:modelValue', e.detail.value)

	}
</script>

<style lang="scss" scoped>
	.my-radio {
		width: 100%;
		padding: 36rpx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;

		.label {
			flex: none;
			margin-right: 22rpx;
			font-family: Microsoft YaHei, Microsoft YaHei;
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
			line-height: 35rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}

		.right {
			flex: 1;
			width: 0;
			font-family: Microsoft YaHei, Microsoft YaHei;
			font-weight: bold;
			font-size: 30rpx;
			color: #333333;
			line-height: 35rpx;
			font-style: normal;
			text-transform: none;

			.radio-label {
				margin-right: 98rpx;
			}

			.radio-label:last-of-type {
				margin-right: 0;
			}

			.is-checked {
				:deep(.uni-radio-input) {
					// 覆盖行内样式
					background-color: #0FAD70 !important;
					border-color: #0FAD70 !important;
				}
			}
		}
	}

	.my-radio.hasBorder {
		border-bottom: 2rpx solid #EFEFEF;
	}
</style>