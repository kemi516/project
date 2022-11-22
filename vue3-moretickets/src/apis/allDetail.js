import axios from "./axios";
const getDetail = (showID) => {
  return axios.get(`showapi/pub/show/${showID}`);
};
const getGroup = (showID) => {
  return axios.get(`buyerapi/buyer/v1/shows/${showID}/group_shows`);
};
const getDescription = (showID) => {
  return axios.get(`showapi/pub/show/${showID}/description`);
};
const getFaq = (showID) => {
  return axios.get(`showapi/pub/v1/shows/${showID}/faq_tags?type=SHOW_FAQ`);
};
const getRecommendShows = (showID) => {
  return axios.get(`showapi/pub/shows/${showID}/recommendShows`);
};

export { getDetail, getGroup, getDescription, getFaq, getRecommendShows };
