// 演出
import axios from "./axios";
// import { useCounterStore } from "../stores/counter";
// const store = useCounterStore();
// console.log(useCounterStore().citysId);
// console.log(store);

const getListMain = (n, id = 4401, offset = 0) => {
  // console.log('123id:', id);
  return axios.get(
    `showapi/pub/site/${id}/active_show?&offset=${
      offset * 10
    }&length=10&seq=desstartTime=&endTime=&siteCityOID=${id}`,
    {
      params: {
        type: n ? n : "",
      },
    }
  );
};

//m.moretickets.com/showapi/pub/site/4401/active_show?&type=&offset=0&length=10&seq=desstartTime=&endTime=&siteCityOID=4401
// https://appapi.moretickets.com/showapi/pub/site/58a2bb160cf273b891c85e8c/banner/app

// 详情
const getDetail = (showID) => {
  return axios.get(`showapi/pub/show/${showID}`);
};

// 猜你喜欢
const getLiked = (showID) => {
  return axios.get(`buyerapi/buyer/v1/shows/${showID}/group_shows`);
};

const getFilter = () => {
  return axios.get(`showapi/pub/v1_1/site/5cd039a0c1cd064cd8340978/home_floor`);
};

const getlocation = () => {
  return axios.get("showapi/cities?src=m_web&time=1666596687423");
};
// getTicketPrice
const getTicketPrice = (id, cityOID) => {
  return axios.get(
    `showapi/pub/v1_2/showSession/${id}/seatplans/sale?src=m_web&time=1666679364097`,
    {
      params: {
        locationCityOID: cityOID,
      },
    }
  );
};

const getTicketTime = (showId, cityOID) => {
  return axios.get(
    `showapi/pub/v1_2/show/${showId}/sessionone?src=m_web&time=1666679046278`,
    {
      params: {
        locationCityOID: cityOID,
      },
    }
  );
};
export {
  getListMain,
  getDetail,
  getLiked,
  getFilter,
  getlocation,
  getTicketTime,
  getTicketPrice,
};
