<template>
	<view class="copyright" :class="{'is-fixed':fixed}">
		<view class="desc company">Jiangsu Haikang Borui Electronic Co.,Ltd</view>
		<view class="desc">版本：V.1.1.0</view>
	</view>
</template>

 <script setup name="CopyRight">
 	const props = defineProps({
 		fixed: {
			type: Boolean,
			default: true
 		}

 	})
 </script>


<style lang="scss">
	.copyright {
		display: flex;
		justify-content: center;
		padding-bottom: 42rpx;

		.desc {
			font-family: SF Pro, SF Pro;
			font-weight: 400;
			font-size: 20rpx;
			color: #333333;
			line-height: 23rpx;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}

		.company {
			margin-right: 60rpx;
		}

	}

	.copyright.is-fixed {
		position: fixed;
		bottom: 42rpx;
		width: 100%;
		padding-bottom: 0;
	}
</style>