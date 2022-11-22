<template>
  <div class="bigbox">
    <div class="header">
      <img src="../assets/back.png" width="20" alt="" @click="router.back()" />
      <p>{{ ticketTime[0]?.showName }}</p>
    </div>
    <h1>选择场次</h1>
    <div class="box">
      <p
        v-for="(time, i) in ticketTime"
        @click="
          togglePrice(time.showSessionOID);
          index = i;
        "
        :class="{ act: i == index }"
        :key="time"
      >
        {{ time?.sessionName }}
      </p>
    </div>
    <h1>
      <p>选择票面</p>
      <span>根据所选票面随机分配页面</span>
    </h1>
    <van-loading
      color="#f00"
      size="30"
      v-show="loading"
      style="margin-left: 150rem"
    />

    <div class="box2" v-show="!loading">
      <div
        v-for="(price, i) in ticketPrice"
        :class="{ act: i == n }"
        @click.stop="total(price, i)"
        :key="price.seatPlanOID"
      >
        <span v-if="price.comments == ''">{{ price.originalPrice }}票面</span>
        {{ price.originalPrice }}
        {{ price.comments }}
        <span v-if="price?.saleTags?.length" class="span-border">
          {{ price?.saleTags[0]?.displayName }}
        </span>
      </div>
    </div>
  </div>
  <div class="foot">
    <div>
      <div>
        <span>选择数量</span>
        <van-stepper
          v-model="value"
          min="1"
          max="6"
          @overlimit="overlimit()"
          disable-input
        />
      </div>
      <div>
        <p>本演出最多购买6场</p>
        <p>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACk0lEQVRIS72WS2gUQRCGv+rZyYPEBwZy1aiIKAqehIgIgkEFwcm6F194UrzEgyAexLvgQQURPYmol81mA4IJEUQRA54EhSCiRq+BFR+JecxOt/SYXXY37szsZeY4XV1fV/1VXS2k/EnKPBIBTY7uJehzNBsw9Gih0x5UGeYRSoHiaxtMS57ZuAAigWaAroUudjvCVgQV6cygA8OHjjneyARzzWybAudzYUQHgDYg0Jpp4Eu7YYbeZYczdC0KvcBGpegDHGApUDzrzIf2K77/Ak2Wnb5mLwpRwudfwuS6PD+jIvyeY81qQ782bEJjXMUrKfCucc8KYBhZmcPW0FVMSoG3cbrUrpssu3xNv/0XZHjaGGkd0Grmr+KETaMLr1uFVcAhFPbY9Lq/eVSraR1w3mO/o9hm05gZZqyVyBpty8c4ZNMbaKY6izyvrFeBtvT9gNMIZlbxOE6zuMNYTbs1xzGI6/Cg0jJV4GKOHaLZpzWfOoqMxzlsXDdZtgeG247ilgwzYtcXPA4qxWajeNme5739VwWWsxzRsF5rJjqKfGwFaGFlE6atF+GaW+DyMnCLUgwo+JYp8KQeOMgZLXS7AQ9llB9JgQ2wscwfPBlj0e43R1nrO5xUhtnMCPfrgEtZztvGdXu4K/fww7L2GDLCVTSnMqMriygKFgLP4volzllXbQXuxAMHuajhupVDNIO10DhYLLDcJKV+lpsYhiw0Y/CkyHgSWGxKo4rG97iBcMFCDVwSuLJcIHWaNeq+4NG8aOLaogb6z68QCYttiySNX4UmgMU2vj1RkqvNThJKTMkLylGtE3u1hSKnfXmHUaY5nmrGS3oDuAJN9YlRjTTNR1RtBab2TEw6MVqxS/QQbsVhnO1fM/uMLL/LLd0AAAAASUVORK5CYII="
            width="16"
            alt=""
          />
          同一订单3张及以内保证连座
        </p>
      </div>
    </div>
    <div class="jiesuan">
      <div>
        <!-- (originalPrice==0?ticketPrice[0]?.originalPrice:originalPrice.value)*value}}{{(minPrice*value==0?ticketPrice[0]?.minPrice:minPrice*value)*value -->
        <p>
          合计:<del class="gray" v-show="discount < 1 && discount > 0">{{
            originalPrices
          }}</del
          ><span>{{ totals }}</span
          >元
        </p>
        <p class="gray">
          {{ salePrice }}元/张
          <!-- {{ minPrice == 0 ? ticketPrice[0]?.minPrice : minPrice }}元/张 -->
        </p>
      </div>
      <div class="xia" @click="orders()">下一步</div>
      <!-- <div class="xia" @click="router.push('/order')">下一步</div> -->
    </div>
  </div>
</template>

<script setup>
import { getTicketTime, getTicketPrice } from "@/apis/show";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
import "vant/es/toast/style";

import { ref, computed } from "vue";
import { useKkmStore } from "@/stores/kkms";
const storek = useKkmStore();
// console.log(Toast);
// Toast('提示内容');
const router = useRouter();
const route = useRoute();

const loading = ref(true);
const value = ref(1);

// 票的价格、折扣、打折后的钱、下标
const index = ref(0);
const n = ref(0);
const minPrice = ref(0);
const originalPrice = ref(0);
const discount = ref(0);
const salePrice = ref(0);

// 票的时间
const ticketTime = ref([]);
// 票的类型
const ticketPrice = ref([]);

// 路由参数
const showId = route.query?.id;
const cityOID = route.query?.cityOID;

// 步进器
// let num = ref(1)
const overlimit = () => {
  // num.value=value.value+2
  // if (num.value > 6) {
  if (value.value > 1) {
    Toast("最多只能购买6张");
  }
  // }
  // console.log(num.value);
};
// console.log(showId);
// console.log(cityOID);
(async () => {
  // 定票时间
  await getTicketTime(showId, cityOID).then((res) => {
    // console.log(res);
    ticketTime.value = res.data.result.data.slice(0, 6);
    // console.log(ticketTime.value);
  });
  // 票价
  await getTicketPrice(ticketTime.value[0].showSessionOID, cityOID).then(
    (res) => {
      loading.value = false;
      ticketPrice.value = res.data.result.data;
      discount.value = ticketPrice.value[0]?.discount;
      salePrice.value = ticketPrice.value[0]?.salePrice;
      minPrice.value = ticketPrice.value[0]?.minPrice;
    }
  );
})();

const totals = computed(() => {
  // return Math.ceil(value.value * salePrice.value * (discount.value?discount.value:1))
  return value.value * salePrice.value;
});
const originalPrices = computed(() => {
  return originalPrice.value;
});

// 点击查看票价
const togglePrice = (id) => {
  loading.value = true;

  getTicketPrice(id, cityOID).then((res) => {
    loading.value = false;
    ticketPrice.value = res.data.result.data;

    if (ticketPrice.value.length > 0) {
      total(ticketPrice.value[0], 0);
    }
  });
};

const total = (price, i) => {
  value.value = 1;
  n.value = i;
  minPrice.value = price.minPrice;
  originalPrice.value = price.originalPrice;
  discount.value = price.discount;
  salePrice.value = price.salePrice;
  // console.log(price);
};
const orders = () => {
  // console.log(ticketPrice.value !== "");
  if (ticketPrice.value != "") {
    storek.order2 = [
      {
        title: ticketTime.value[index.value].showName, //标题
        date: ticketTime.value[index.value].sessionName, //时间
        price: ticketPrice.value[n.value].originalPrice, //价钱
        index: value.value, //数量
        total: totals.value, //总值
        address: storek.address, //地址
        imgs: storek.imgs,
      },
    ];
    router.push("/order");
  } else {
    alert("请选择相关场次票面后提交");
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.bigbox {
  padding: 15rem;
  padding-bottom: 150rem;

  // font-size: 12rem;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 15rem;
    color: #4a4a4a;
    background-color: #fff;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16rem;

      font-weight: 400;
      // margin-left: 115rem;
    }
  }

  h1 {
    margin: 10rem 0;
    font-size: 16rem;

    span {
      font-size: 14rem;
      font-weight: 400;
      color: #95949d;
    }
  }
}

.act {
  color: #ff1d41;
  background-color: #ffe8ec;
  font-weight: 700;
}

.box {
  display: flex;
  flex-wrap: wrap;
  font-size: 16rem;

  > div,
  p {
    flex-shrink: 0;
    margin: 5rem;
    padding: 10rem;
    background-color: #f6f6f6;
    border-radius: 5rem;

    > span {
      color: #ff1d41;
      margin: 0 5rem;
      font-size: 12rem;
      border: 1rem solid #ff1d41;
    }
  }
}

.box2 {
  // font-size: 12rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 13rem;

  > div,
  p {
    flex-shrink: 0;
    margin: 5rem;
    padding: 10rem;
    background-color: #f6f6f6;
    border-radius: 5rem;

    > .span-border {
      padding: 2rem;
      color: #ff1d41;
      margin: 0 5rem;
      font-size: 12rem;
      border: 1rem solid #ff1d41;
    }
  }
}

.foot {
  background-color: white;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;

  > div {
    padding: 0 15rem;
    box-sizing: border-box;
    border-top: 1rem solid #eaeaeb;
    width: 100%;
    margin: 10rem 0;
    font-size: 16rem;
    font-weight: 600;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5rem 0;

      > p:nth-of-type(1) {
        color: #95949d;
      }

      > p:nth-of-type(2) {
        display: flex;
        align-items: center;

        img {
          margin: 0 5rem;
        }

        color: rgb(251, 82, 0);
      }
    }

    > div:nth-of-type(2) {
      font-size: 12rem;
      font-weight: 400;

      // border: 1rem solid #eaeaeb;
    }
  }

  .jiesuan {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    justify-content: right;

    div {
      display: block;
    }

    .xia {
      border-radius: 32rem;
      padding: 10rem 20rem;
      // background-color:black;
      color: #fff;
      font-size: 16px;
      background: linear-gradient(289deg, #ff1d41, #ee0e87);
    }

    > div:nth-of-type(1) {
      font-size: 16rem;
      // background-color: #ff1d41;
      margin-right: 10rem;

      .gray {
        color: #95949d;
        text-align: right;
        font-weight: 400;
      }

      p {
        margin: 0;
        text-align: right;
        color: black;

        span {
          // color: #ff1d41;
          margin: 0 5rem;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
