<template>
	<view class="discoveryDevice" v-if="visiable">
		<view class="main">
			<view class="header">
				<view class="title">
					选择连接的设备
				</view>
				<image class="icon" src="../../../static/images/uhf/close.png" mode="" @click="onCloseDiscoveryDialog">
				</image>
			</view>
			<view class="body">
				<scroll-view scroll-y="true" style="height: 700rpx;">
					<view class="ul">
						<view class="li" v-if="isDiscoveryListEmpty">正在搜索设备...</view>
						<view class="li" v-for="device in discoveryList" :key="device.deviceId"
							@click="onConnectDevice(device)">
							<view class="row1">
								<text class="desc">{{ device.localName }}</text>
								<text class="desc localName">Rssi = {{ device.RSSI }}</text>
							</view>
							<view class="row2">
								{{ device.deviceId }}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="footer" @click="onScan">
				<text v-if="bluetooth.discoverying">CANCEL</text>
				<text v-else>SCAN</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		isDiscoveryListEmpty: {
			type: Boolean,
			default: false
		},
		visiable: {
			type: Boolean,
			default: false
		},
		discoveryList: {
			type: Array,
			default: () => [{}]
		},
		bluetooth: {
			type: Object,
			default: () => ({
				available: false,
				discoverying: false
			})
		}

	})
	const $emits = defineEmits(['onConnectDevice', 'onScan', 'onCloseDiscoveryDialog'])
	const onCloseDiscoveryDialog = () => {
		$emits('onCloseDiscoveryDialog')
	}
	const onConnectDevice = (device) => {
		$emits('onConnectDevice', device)
	}
	const onScan = () => {
		$emits('onScan')
	}
</script>

<style lang="scss">
	.discoveryDevice {
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
		padding: 0 40rpx;

		.main {
			width: 100%;
			border-radius: 8rpx;

			.header {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 10rpx;
				background-color: #f5f7fa;

				.title {
					font-size: 28rpx;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.body {
				padding: 0 10rpx;
				background-color: #fff;

				.ul {
					min-height: 400rpx;

					.li {
						font-size: 28rpx;
						border-bottom: 2rpx solid #ebeef5;
						line-height: 2;


						.row1 {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.desc {
								line-height: 2;
							}

							.localName {
								font-weight: bold;
								font-size: 32rpx;
							}
						}

						.row2 {
							font-size: 28rpx;
							line-height: 2;
						}
					}

					.li:last-child {
						border-bottom: none;
					}
				}


			}

			.footer {
				background-color: #f5f7fa;
				text-align: center;
				line-height: 3;

			}

		}

	}
</style>