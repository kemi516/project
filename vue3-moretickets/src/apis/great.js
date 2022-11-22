import axios from "./axios";

const getGreat = (cityId, offset = 0) => {
  return axios.get(
    `https://m.moretickets.com/showapi/pub/site/58a2bb160cf273b891c85e8c/discountShows?offset=${offset}&length=10&siteCityOID=${cityId}`
  );
};

export { getGreat };
