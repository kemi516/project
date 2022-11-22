<template>
	<view class="bag">
		<view class="header">
			<text>  </text>
			<text>购物袋</text>
			<text @click="pianji=!pianji" v-if="pianji ||bags.length==0">编辑</text>
			<text @click="pianji=!pianji" v-else style="color:red">取消</text>
			
		</view>
		<view class="bg">
		</view>
		<view class="xuanzhe">
			<view class="" v-for="bag in bags">
				<checkbox-group>
					<label>
						<checkbox value="cb" :checked="bag.bool" @click="total(bag)" />
					</label>
				</checkbox-group>
				<!-- <input type="checkbox" @click="total(bag)" checked='true'> -->
				<image :src="bag.small_img"  alt=""></image>
				<view class="">
					<p>{{bag.name}}<text>{{bag.temName}}{{bag.sugarName ? "/"+bag.sugarName:""}}</text></p>
					<text>{{bag.enname}}</text>
					<view class="icon">
						<text style="color:#0C34BA; font-weight: bold;">￥{{bag.price}}</text>
						<view>
							<uni-icons custom-prefix="iconfont" type="icon-jianshao" size="25" color="gray"
								@click="reduc(bag)"></uni-icons>
							<input type="text" :value="bag.value" disabled="true">
							<span @click="add(bag)">+</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot" v-if="bags.length">
			<view>
			<checkbox-group>
				<label>
					<checkbox value="cb" :checked="bool" @click="quanxuan" />
				全选
				</label>
			</checkbox-group>
			</view>
			<view v-if="pianji">
				<text>合计:</text>
				<view>
				￥<text>{{totals}}</text>.00
					
				</view>
				<view class="tijiao" @click="order">
					提交订单
				</view>
			</view>
			<view v-else class="tijiao" style="background-color: red;" @click="del">
				删除选择
			</view>

		</view>
		<view class="none" v-else>
			当前购物车啥也没有哦！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// value:1,
				bags: null,
				bool:false,
				pianji:true,
			};
		},
		onShow() {
			this.bags = JSON.parse(localStorage.getItem('bags')) || [];
			// console.log('k')
		},
		methods: {
			reduc(e) {
				if (e.value > 1) {
					console.log(e.value);
					e.value -= 1
				}
			},
			add(e) {
				if (e.value < 6) {
					e.value += 1
				}
			},
			total(e) {
				e.bool = !e.bool;
				console.log(e.bool);
				this.bags=[...this.bags]
				// console.log(this.bags);
				// e.value=1
				// console.log(e);
			},
			quanxuan(event){
				this.bool=!this.bool;
				this.bags.map(e=>e.bool=this.bool)
				console.log(event);
			},
			del(){
				this.bags=this.bags.filter(e=>e.bool==false);
				console.log(this.bags);
				localStorage.setItem('bags',JSON.stringify(this.bags))
			},
			order(){
				if(this.bags.filter(e=>e.bool==true).length>0){
					localStorage.setItem('order',JSON.stringify(this.bags.filter(e=>e.bool==true)))
					uni.navigateTo({
						url:'../order/order'
					})
				}
				else{
					uni.showToast({
						title: '请勾选商品',
						duration: 2000
					});
					
				}
			}
			
			
		},
		computed: {
			totals() {
				if (this.bags.filter(e => e.bool).length > 0) {
					// console.log('123');
					return this.bags.filter(e => e.bool).map(e => Number(e.price * e.value))
						.reduce((total, n) => {
							return total += n
						})
				} else {
					return 0
				}
			}
			
		},
		watch:{
			bags(n){
				console.log(n);
				if(n.length>0){
				this.bool=n.every(e=>e.bool)
					
				}
			}
			
			
		}
	}
</script>
<style>
	@import url(@/static/iconfont.css);
</style>
<style lang="less" scoped>
	page {
		background-color: whitesmoke;

	}
	.none{
		width: 100%;
		color:gray;
		height:55vh;
		display:flex;
		justify-content: center;
		align-items:center;
	}
	.header {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.bg {
		width: 100%;
		height: 140rpx;
		background-size: cover;
		background-image: url('../../static/images/shopbag_bg.png');
	}

	.bag {
		width: 100%;
		padding-bottom: 150rpx;

		.xuanzhe {
			padding: 30rpx;
			box-sizing: border-box;

			width: 100%;
			background-color: whitesmoke;
			// display: flex;

			>view {
				border-radius: 12rpx;
				padding: 20rpx;
				box-sizing: border-box;
				background-color: white;
				flex-shrink: 0;
				width: 100%;
				display: flex;
				align-items: center;
				margin: 20rpx 0;

				>input {
					width: 50rpx;
					height: 50rpx;
					// border-radius: 50%;

					// outline: 0;
					// border: 0;
					-webkit-appearance: radio;
				}

				image {
					margin: 0 20rpx;
					width: 188rpx;
					height:188rpx;
					flex-shrink:0;
				}

				>view {
					display: flex;
					flex-flow: column;
					// color: #0C34BA;
					justify-content: space-evenly;
					width: 100%;
					height: 100%;
					color: gray;
					>text {
						font-size: 28rpx;
						margin: 20rpx 0;
					}
				}

				.icon {
					flex-shrink: 0;
					// width: 600rpx;
					display: flex;
					justify-content: space-between;

					>view {
						// width: 100%;
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
			}
		}
	}

	.foot {
		width: 100%;
		background-color: white;
		box-sizing: border-box;
		display: flex;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		justify-content: space-between;
		padding: 30rpx;

		input {
			margin-right: 10rpx;
			width: 40rpx;
		}

		>view {
			display: flex;
			align-items: center;
			>text:nth-of-type(2){
				font-size: 36rpx;
				color: #0C34BA;
			}
			>view{
				
				color: #0C34BA;
				margin: 0 10rpx;
				>text{
					font-size: 40rpx;
					font-weight: 500;
				}
			}
			text{
				
			}
		}
		.tijiao{
			background-color: #0C34BA;
			border-radius: 48rpx;
			padding: 18rpx 32rpx;
			color: white;

		}
	}
</style>
