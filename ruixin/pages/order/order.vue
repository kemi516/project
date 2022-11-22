<template>
	<view class="box">
		<view class="header">
			<!-- <view>
				选择地址
			</view> -->
			<view class="user">
				<text class="name">爱丽丝</text>
				<text class="phone">13827163691</text>
				<text class="yes">默认</text>
			</view>
			<view>
				广东省广州市从化区鳌头镇粤嵌科技
			</view>

		</view>

		<view class="order-box">
			<p>订单信息</p>
			<view v-for="order in orders" class="order">
				<image :src="order.small_img"/>
				<view>
					<view class="order-text">
						<p>{{order.name}} <text>{{order.temName}}{{order.sugarName?"/"+order.sugarName:""}}</text> </p>
						<p>{{order.enname}}</p>
					</view>
					<view>
						<text class="price">￥{{order.price}}</text>
						<text>x{{order.value}}</text>
					</view>

				</view>
			</view>
			<view class="date">
				<p>
					<text> {{new Date().getFullYear()}}-{{new Date().getMonth()+1}}-{{new Date().getDate()}}</text>
					&nbsp;<text>{{new Date().getHours()}}:{{new Date().getMinutes()+1}}:{{new Date().getSeconds()}}</text>
				</p>
				<view>
					<text>共计{{orders.length}}件</text>
					<text>合计 ￥{{total}}</text>
				</view>
			</view>
		</view>
	</view>
	<view class="foot">
		<view @click="jiesuan(this.orders)">
			立即结算
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orders: JSON.parse(localStorage.getItem('order')) || [],
				bags: JSON.parse(localStorage.getItem('bags')) || [],
				historyOrder: JSON.parse(localStorage.getItem('historyOrder')) || []
			}
		},
		onLoad(option) {
			console.log(option);
			// this.order=option


		},
		computed: {
			total() {
				if (this.orders.length > 0) {
					// console.log('123');
					return this.orders.map(e => Number(e.price * e.value))
						.reduce((total, n) => {
							return total += n
						})
				} else {
					return 0
				}
			}
		},
		methods: {
			jiesuan(oder) {

				localStorage.setItem('historyOrder', JSON.stringify([...this.orders, ...this.historyOrder]))
				uni.showToast({
					title: '购买成功',
					duration: 500
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/orders/orders'
					})
				}, 500)

				Array.from(oder).forEach(e => {
					this.bags = this.bags.filter(ef => ef.time !== e.time);
				})

				localStorage.setItem('bags', JSON.stringify(this.bags))

			}
		}
	}
</script>

<style lang="less">
	.box {
		background-color: whitesmoke;
		padding: 20rpx;

		>view {
			border-radius: 10rpx;
		}
	}

	.header {
		margin-bottom: 20rpx;
		padding: 10rpx;
		background-color: #fff;
		color: gray;

		.user {
			display: flex;
			align-items: center;
			margin: 20rpx 0;
		}

		.name {

			color: #0C34BA;
			font-size: 32rpx;
			font-weight: bold;
			// border: 2rpx dashed gray;
		}

		.phone {
			margin: 0 30rpx;
		}

		.yes {
			font-size: 24rpx;
			padding: 5rpx 20rpx;
			background-color: #0C34BA;
			box-sizing: border-box;
			color: #fff;
			border-radius: 34rpx;
		}
	}

	.order-box {
		// padding: 30rpx;
		background-color: #fff;

		>p {
			padding: 20rpx;
		}

		.order {
			width: 100%;
			display: flex;
			padding: 20rpx;
			box-sizing: border-box;

			image {
				width: 200rpx;
				height:200rpx;
				// flex-shrink: 1;
			}

			>view {
				color: gray;
				// flex-shrink: 1;
				flex-grow: 1;
				// width: 100%;
				padding: 0 20rpx;
				height: 200rpx;
				display: flex;
				flex-flow: column;
				justify-content: space-between;

				>view:nth-of-type(2) {
					// background-color: aqua;
					display: flex;
					justify-content: space-between;
					// }
				}

				p:nth-of-type(2) {
					margin: 10rpx 0;
				}

				.price {
					color: #0C34BA;
					font-weight: bold;

				}
			}

		}

	}

	.date {
		border-top: 2rpx dashed gray;
		background-color: #fff;
		padding: 30rpx 20rpx;
		color: gray;

		// border-radius: 20rpx 0 0 0;
		>view {
			margin-top: 20rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;

			>text:nth-of-type(2) {
				color: #0C34BA;
				font-weight: bold;
			}
		}
	}

	.foot {
		position: fixed;
		width: 100%;
		// background-color: #0C34BA;
		bottom: 0rpx;
		left: 0;
		background-color: white;
		padding: 20rpx;
		box-sizing: border-box;

		view {
			width: 100%;
			border-radius: 48rpx;
			color: white;
			padding: 20rpx 0;
			text-align: center;
			background-color: #0C34BA;
		}
	}
</style>
