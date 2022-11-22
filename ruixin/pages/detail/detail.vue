<template>
	<view class="box">
		<view class="bg" :style="{backgroundImage:`url(${detail.large_img})`}">
		</view>
		<view class="detail-box">

			<view class="detail">
				<view class="name">
					<view>
						<p>{{detail.name}}</p>
						<p>{{detail.enname}}</p>
					</view>
					<text>￥{{detail.price}}</text>
				</view>
				<view class="text">
					<!-- 温度 -->
					<text>{{detail.tem_desc}}</text>
					<view>
						<text v-for="(tem,i) in detail?.tem?.split('/')" @click="temName=tem"
							:class="{act:temName==tem}">{{tem}}</text>
					</view>
				</view>
				<view class="text">
					<!-- 糖 -->
					<text>{{detail.sugar_desc}}</text>
					<view>
						<text v-for="(sugar,i) in detail?.sugar?.split('/')" @click="sugarName=sugar"
							:class="{act:sugarName==sugar}">{{sugar?sugar : "全糖"}}</text>
					</view>
				</view>
				<view class="num">
					<text>选择数量</text>
					<view>
						<uni-icons custom-prefix="iconfont" type="icon-jianshao" size="25" color="gray" @click="reduce">
						</uni-icons>
						<input type="text" v-model="value" disabled="true">
						<span @click="add">+</span>
					</view>
				</view>
				<view class="xiangqing">
					<view>商品详情</view>
					<view>
						<p v-for="(desc,i) in detail?.desc?.split('\n')">{{i+1}}.{{desc}}</p>
					</view>
				</view>

			</view>
		</view>
		<view class="foot">
			<view>
				<view class="icon" @click="orders">
					<view class="radio">
						{{bags.length}}
					</view>
					<uni-icons custom-prefix="iconfont" type="icon-gouwudai" size="20" color="blue"></uni-icons>
					<view>购物袋</view>
				</view>
				<view class="icon" v-if="!this.favd.map(e=>e.name).includes(detail.name)"
					@click.stop=favs({img:detail.small_img,name:detail.name,enname:detail.enname,price:detail.price})>
					<uni-icons custom-prefix="iconfont" type="icon-aixin" size="20"></uni-icons>
					<view>收藏</view>
				</view>
				<view class="icon" v-else @click.stop=remove(detail.name)>
					<uni-icons custom-prefix="iconfont" type="icon-aixin" size="20" color='blue'></uni-icons>
					<view>收藏</view>
				</view>

			</view>
			<view class="xiadan">
				<view @click="bag">
					加入购物袋
				</view>
				<view @click="order">
					立即购买
				</view>
			</view>

		</view>

		<!-- <uni-goods-nav /> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				favd: JSON.parse(localStorage.getItem('fav')) || [],
				options: [{
					icon: '',
					text: '购物袋'
				}, {
					icon: 'shop',
					text: '',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}],
				sugarName: '',
				temName: '',
				value: 1,
				bags: JSON.parse(localStorage.getItem('bags')) || [],

			}
		},
		onLoad(e) {
			// console.log(e);
			uni.request({
				url: 'http://www.kangliuyong.com:10002/productDetail',
				data: {
					appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
					pid: e.pid
				},
				success: (res) => {

					this.detail = res.data.result[0]
					this.sugarName = this.detail.sugar?.split('/')[0];
					this.temName = this.detail.tem?.split('/')[0];
					// console.log(this.sugarName, "大大", this.temName);
					// console.log(this.detail);
				}
			})
		},
		methods: {
			orders() {
				uni.switchTab({
					url: "/pages/bag/bag"
				})
			},
			favs(favds) {
				this.fav = false;
				console.log("fav", favds);
				this.favd = [...this.favd, favds]
				localStorage.setItem("fav", JSON.stringify(this.favd))
			},
			remove(name) {
				this.fav = true;
				console.log("name", name);
				this.favd = this.favd.filter(e => e.name != name);
				localStorage.setItem("fav", JSON.stringify(this.favd))
			},
			reduce() {
				if (this.value > 1) {
					this.value--
				}
			},
			add() {
				if (this.value < 6) {
					this.value++
				}
			},
			bag() {
				let obj = {
					value: this.value,
					name: this.detail.name,
					enname: this.detail.enname,
					price: this.detail.price,
					sugarName: this.sugarName,
					temName: this.temName,
					pid: this.pid,
					small_img: this.detail.small_img,
					bool: false,
					time: new Date().getTime()



				}
				uni.showToast({
					title: '成功加入购物袋',
					duration: 2000
				})
				// console.log(n);
				console.log(this.bags);
				this.bags = [obj, ...this.bags]
				localStorage.setItem('bags', JSON.stringify(this.bags))
			},
			order() {
				let order = [{
					value: this.value,
					name: this.detail.name,
					enname: this.detail.enname,
					price: this.detail.price,
					sugarName: this.sugarName,
					temName: this.temName,
					pid: this.pid,
					small_img: this.detail.small_img,
					time: new Date().getTime()
				}]
				localStorage.setItem('order', JSON.stringify(order))
				uni.navigateTo({
					url: `../order/order?value=${this.value}&name=${this.detail.name}&enname=${this.detail.enname}&price=${this.detail.price}&temName=${this.temName}&sugarName=${this.sugarName}`,
				})

			}

		},

	}
</script>
<style>
	@import url(@/static/iconfont.css);
</style>


<style lang="less" scoped>
	.box {
		background-color: whitesmoke;

	}

	.detail-box {
		width: 100%;
		position: relative;
		// padding-bottom: 100rpx;
	}

	.detail {
		border-radius: 16rpx 16rpx 0 0;
		background-color: white;
		// box-shadow: 0 0 10rpx 0 ;
		width: 86%;
		// left: 3% ;
		margin: 0 auto;
		margin-top: -50rpx;
		// top: -50rpx;
		// position: absolute;
		// margin-top: -50rpx;
		padding: 30rpx 30rpx 120rpx 30rpx;

		>view {
			margin: 10rpx 0;
		}
	}

	.bg {
		width: 100%;
		height: 600rpx;
		background-repeat: no-repeat;
		background-position: center;
	}

	.name {
		display: flex;
		width: 100%;
		// align-items: center;
		justify-content: space-between;

		color: black;
		font-weight: bold;

		>text {
			color: #0C34BA;
		}

		p:nth-of-type(2) {
			font-size: 24rpx;
			font-weight: 400;
			color: #646566;
		}
	}

	.num {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		border-top: 2rpx solid #cfd1d3;
		border-bottom: 2rpx solid #cfd1d3;

		view {
			display: flex;
			align-items: center;

			input {
				width: 60rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
			}

			span {
				background-color: #0C34BA;
				// color: wheat;
				display: inline-block;
				// display: flex;

				font-size: 40rpx;
				width: 42rpx;
				height: 42rpx;
				border-radius: 50%;
				line-height: 38rpx;
				text-align: center;
				color: white;
			}
		}
	}

	.text {
		width: 100%;
		display: flex;
		align-items: center;

		view {
			margin: 10rpx 0;

			text {
				border-radius: 28rpx;
				text-align: center;
				display: inline-block;
				color: #646566;
				width: 130rpx;
				margin: 10rpx;
				padding: 10rpx;
				background-color: whitesmoke;
			}

			.act {
				background-color: #0C34BA;
				color: white;
			}
		}

		>text {
			width: 100rpx;
			margin-right: 30rpx;

		}
	}

	.xiangqing {
		view {
			margin: 20rpx 0;
		}

		>view:nth-of-type(2) {
			color: #646566;

			p {
				font-size: 24rpx;
				margin: 10rpx 0;
			}
		}

	}

	.foot {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		background-color: white;

		.xiadan {
			width: 70%;
			border-radius: 48rpx;
			// background-color: aqua;
			display: flex;
			color: white;
			align-items: center;

			>view {
				width: 50%;
				padding: 20rpx 40rpx;
				text-align: center;
			}

			>view:nth-of-type(1) {
				border-radius: 32rpx 0 0 32rpx;
				background-color: #6d86d9;
			}

			>view:nth-of-type(2) {
				border-radius: 0 32rpx 32rpx 0rpx;
				background-color: #0C34BA;
			}
		}

		>view {
			font-size: 14rpx;
			display: flex;

			.icon {
				display: flex;
				flex-flow: column;
				align-items: center;
				position: relative;

				.radio {
					width: 30rpx;
					height: 30rpx;
					font-size: 24rpx;
					position: absolute;
					text-align: center;
					right: 20rpx;
					top: -10rpx;
					color: white;
					background-color: #0C34BA;
					border-radius: 50%;
				}
			}
		}

		>view:nth-of-type(1) {
			width: 30%;

			>view {
				width: 50%;

				// justify-content: center;
				.uni-icons {
					// width: 30rpx;
					font-size: 12rpx
				}
			}
		}
	}
</style>
