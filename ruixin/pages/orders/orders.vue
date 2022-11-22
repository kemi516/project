<template>
	<view class="fav">
		<div class="ftop">
		</div>
		<div class="container" v-if="historyOrder?.length">
			<view class="order-box" v-for="order in historyOrder">
				<view class="top">
					<p>NO{{order.time}}</p>
					<p>已完成<svg @click="del(order.time)" t="1667317428572" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="2505" width="16" height="16">
							<path
								d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z"
								p-id="2506"></path>
							<path
								d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z"
								p-id="2507"></path>
						</svg></p>
				</view>
				<view class="order">
					<image :src="order.small_img"/>
					<view>
						<view class="order-text">
							<p>{{order.name}} <text>{{order.temName}}/{{order.sugarName}}</text> </p>
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
						<text>共计{{order.length}}件</text>
						<text>合计 ￥{{order.value*order.price}}</text>
					</view>
				</view>
			</view>
		</div>
		<div class="containers" v-else>
			暂时还没有订单哦!
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyOrder: JSON.parse(localStorage.getItem('historyOrder')) || [],
				time:1667822980432
			};
		},
		methods:{
			del(id){
				this.historyOrder=this.historyOrder.filter(e=>e.time !==id)
				// console.log(/id);
				localStorage.setItem("historyOrder",JSON.stringify(this.historyOrder))
			}
		}
	}
</script>

<style lang="less">
	.fav {

		height: 100vh;
		// background-color: #f7f7f7;

		.ftop {
			width: 100%;
			height: 166rpx;
			background-color: blue;

		}

		.container {
			position: relative;
			top: -66rpx;
			border-radius: 10rpx;
			padding: 30rpx;
			padding-bottom: 15rpx;
			background-color: whitesmoke;
			// display: flex;
			// flex-wrap: wrap;

			.content {
				margin: 18rpx 0 0rpx 18rpx;
				width: 30%;
				color: gray;

				.img {
					outline: 1rpx solid lightgray;

					image {
						// display:block;
						vertical-align: bottom;
						width: 100rpx;
					}

					margin-bottom: 20rpx;
				}

				.name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.en {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 22rpx;
					margin-top: 20rpx;
					margin-bottom: 26rpx;
				}

				.price {
					font-size: 26rpx;
					color: blue;
					font-weight: bold;

					.reo {
						float: right;
					}
				}
			}
		}

		.containers {
			width: 100%;
			color: gray;
			height: 66vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.order-box {
		// padding: 30rpx;
		background-color: #fff;
		margin: 20rpx 0;
		border-radius: 10rpx;

		>p {
			padding: 20rpx;
		}
			
		.top{
			width: 100%;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: gray;
			p{
				display: flex;
				align-items: center;
			}
		}
		.order {
			border-radius: 10rpx;
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
</style>
