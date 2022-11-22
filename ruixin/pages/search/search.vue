<template>
	<view class="box">

		<view class="uni-form-item uni-column">
			<!-- <view class="title">可自动聚焦的input</view> -->
			<input class="uni-input" placeholder="请输入" @confirm="change(value)" v-model="value" @focus="focus()" />
			<text @click="huitui">取消</text>
		</view>
		<view class="history" v-if="!search?.length &&!shows">
			<p>历史记录</p>
			<view>
				<view v-for="h in history" @click="change(h)">{{h}}</view>
			</view>
		</view>
		<view class="nones" v-if="shows">
			暂无相关商品
		</view>
		<view class="search" v-if="search?.length">

			<view class="search-box" v-for="item in search" @click="detail(item.pid)">
				<view class="">
					<img :src="item.smallImg" alt="">
					<view class="">
						<p>{{item.name}}</p>
						<p>{{item.enname}}</p>
					</view>
				</view>
				<view class="text">
					￥{{item.price}}
				</view>
			</view>
			<view class="bottom">到底啦！</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				value: '',
				search: null,
				history: JSON.parse(localStorage.getItem('history')) || [],
				shows: false
			};
		},
		onLoad() {},
		methods: {
			focus() {
				console.log('123');
				this.search = [];
				this.value = ''
			},
			change(value) {
				this.value = value
				uni.request({
					url: 'http://www.kangliuyong.com:10002/search',
					data: {
						appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
						name: this.value
					},
					success: (res) => {
						this.search = res.data.result;
						this.shows = (this.search == "")
						console.log(this.shows);
					}
				})

				if (this.history.length) {
					this.history = [...new Set([this.value, ...this.history])]
					localStorage.setItem('history', JSON.stringify(this.history))
				} else {
					this.history = [this.value]
					localStorage.setItem('history', JSON.stringify(this.history))
				}

				// localStorage.setItem('history', JSON.stringify(this.history))
			},
			detail(pid) {
				uni.navigateTo({
					url: `../detail/detail?pid=${pid}`,
				})

			},

			huitui() {
				// console.log(getCurrentPages());
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	>p {
		padding: 30rpx;
	}

	//没有内容时
	.nones {
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 66vh;
	}

	//到底时
	.bottom {
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni-column {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.uni-input {
			padding: 15rpx 40rpx;
			width: 75%;
			border-radius: 32rpx;
			background-color: whitesmoke;
			// border: 2rpx solid black;
		}
	}

	.history {
		padding: 0 30rpx;

		p {
			font-size: 36rpx;
			color: gray;
		}

		>view {
			display: flex;
			margin: 10rpx 0;

			>view {
				margin-right: 10rpx;
				padding: 20rpx 30rpx;
				border-radius: 16rpx;
				background-color: whitesmoke;
			}
		}
	}

	.search {
		background-color: whitesmoke;
		padding: 30rpx;

		.search-box {
			border-radius: 16rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			box-sizing: border-box;
			margin: 20rpx 0;
			background-color: #fff;

			>view {
				// width: 25%;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: gray;

				img {
					width: 200rpx;
					margin-right: 20rpx;

				}

			}

			.text {
				color: #0C34BA;
				font-weight: bold;
			}
		}
	}
</style>
