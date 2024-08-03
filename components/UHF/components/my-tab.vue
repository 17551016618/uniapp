<template>
	<scroll-view scroll-x="true" :show-scrollbar="false" scroll-left="0" :scroll-with-animation="true"
		:scroll-into-view='scrollIntoId'>
		<view class="tab-list">
			<view class="tab" v-for="(item,index) in tabList" @click="tabClickHandler(index)" :key="item"
				:id="`id-${index}`" :class="{'is-active':currentTabId === index}">
				{{item}}
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		ref,
		computed,
	} from 'vue'
	const $emits = defineEmits(['change'])
	const props = defineProps({
		tabList: {
			type: Array,
			default: () => ['盘点标签', '二维扫描', '读数据', '写数据', '设置', '修改蓝牙名称', '调试']
		},
		currentTabId: {
			type: Number,
			default: 0
		}
	})
	// 可视区展示的子tab的id
	const scrollIntoId = ref('id-0')
	const tabClickHandler = (tabIndex) => {
		scrollIntoId.value = `id-${tabIndex}`
		// 先触发change事件，在父组件中更新currentTabId
		$emits('change', tabIndex)
	}
</script>

<style lang="scss" scoped>
	// tab点击
	.tab-list {
		display: flex;
		align-items: center;

		.tab {
			box-sizing: border-box;
			width: 230rpx;
			height: 90rpx;
			text-align: center;
			background-color: #bcc9f4;
			line-height: 90rpx;
			flex: none;
			flex-wrap: nowrap;
		}

		.tab.is-active {
			border-bottom: 6rpx solid #ff0000;
		}
	}
</style>