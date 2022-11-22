<template>
	<view class="box">
		<view class="hot" v-for="hot in hotList" @click="detail(hot.pid)">
			<img :src="hot.smallImg" alt="">
			<view>{{hot.name}}</view>
			<view>{{hot.enname}}</view>
			<view class="hotbiao">hot</view>
		</view>
	</view>
</template>

<script>
	export default {


		props: {
			hotList: Array
		},
		data() {
			return {

			};
		},

		onLoad() {

		},
		methods: {
			detail(pid) {
				uni.navigateTo({
					url: `../detail/detail?pid=${pid}`,
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.box {

		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: whitesmoke;

		>view {
			color: gray;
		}

		.hot {
			position: relative;
			border-radius: 16rpx;
			width: 48%;
			padding: 20rpx;
			box-sizing: border-box;
			margin: 10rpx 0;
			background-color: white;

			>view:nth-of-type(2) {
				overflow: hidden;
				font-size: 28rpx;
				// text-decoration: ;
				 text-overflow:ellipsis;
				// background-color: wheat;
				white-space: nowrap;
			}

			img {
				border-radius: 16rpx;
				width: 100%;
			}

			.hotbiao {
				position: absolute;
				font-size: 28rpx;
				left: 40rpx;
				height: 48rpx;
				padding: 5rpx;
				border-radius: 0 0 10rpx 10rpx;
				background-color: blue;
				color: white;
				top: 20rpx;
			}
		}
	}
</style>
