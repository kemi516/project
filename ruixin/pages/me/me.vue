<template>
	<view class="me">
		<view class="topbg"></view>
		<view class="container">
			<view class="topc">
				<view class="limg">
					<image src="/static/tx.jpg" alt=""/>
				</view>
				<view class="right">
					<h6>Allen</h6>
					<view>这家伙很懒，什么也没有留下</view>
				</view>
			</view>
			<view class="lists">
				<view @click="navigator()">
					<view>个人资料 </view>
					<view>&gt;</view>
				</view>
				<view @click="order">
					<view>我的订单 </view>
					<view>&gt;</view>
				</view>
				<view @click="fav">
					<view>我的收藏 </view>
					<view>&gt;</view>
				</view>
				<view>
					<view>地址管理 </view>
					<view>&gt;</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {

			};
		},
		computed: {
			username() {
				return store.state.username
			}
		},
		methods: {
			navigator() {
				console.log('')
			},
			fav() {
				// console.log("k")
				uni.navigateTo({
					url: "/pages/fav/fav"
				})
			},
			order() {
				uni.navigateTo({
					url: "/pages/orders/orders"
				})
			}
		},
		onLoad() {
			// console.log(this.$store)
		}
	}
</script>

<style lang="less">
	.me {
		background-color: #f7f7f7;
		height: 100vh;

		.topbg {
			background: url("/static/bg.webp") no-repeat center/cover;
			width: 100%;
			height: 400rpx;

		}

		.container {
			color: gray;
			position: relative;
			top: -66rpx;
			width: 90%;
			border-radius: 22rpx 22rpx 0 0;
			box-sizing: border-box;
			margin: auto;
			padding: 23rpx;
			background-color: #ffffff77;

			.topc {
				display: flex;
				margin-bottom: 66rpx;

				.limg {
					image {
						box-shadow: 0 0 1rpx gray;
						border-radius: 50%;
						width: 133rpx;
						height:133rpx;
					}

					margin-right:22rpx;
				}

				.right {
					h6 {
						font-size: 33rpx;
						color: blue;
						margin-bottom: 13rpx;
					}

					view {
						font-size: 26rpx;
					}
				}

			}

			.lists {
				>view {
					padding: 33rpx 0;

					display: flex;
					justify-content: space-between;
					border-bottom: 1rpx solid #e6e6e6;

					&:last-child {
						padding-bottom: 0;
						border: 0;
					}
				}
			}
		}
	}
</style>
