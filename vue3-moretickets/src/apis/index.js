import axios from "./axios";
// const getHomeRecommended = () => {
//     return axios.get("lessons/6335baac8d555800061883d8");
// };

const getHotWords = (id = 4401) => {
  return axios.get("userdataapi/pub/v1/top/keywords", {
    params: {
      cityId: id,
    },
  });
};

const getHotSearch = (id = 4401) => {
  return axios.get("buyerapi/buyer/v1/search/index", {
    params: {
      cityId: id,
    },
  });
};

const getSearched = (keyword, id = 4401) => {
  return axios.get("buyerapi/buyer/v1/search", {
    params: {
      siteCityId: id,
      offset: 0,
      length: 10,
      keyword,
    },
  });
};

const getSearching = (keyword) => {
  return axios.get("buyerapi/buyer/v1/search/keywords/hints?", {
    params: {
      keyword,
    },
  });
};
// 导航栏
const getHomeBanner = (id = 4401) => {
  return axios.get("showapi/pub/site/58a2bb160cf273b891c85e8c/banner/app", {
    params: {
      siteCityOID: id,
    },
  });
};

const getArtist = (artistId) => {
  return axios.get(`showapi/pub/artist/${artistId}`);
};

const getArtistShows = (artistId) => {
  return axios.get(`showapi/pub/artist/${artistId}/show`, {
    params: { offset: 0, length: 10 },
  });
};

const getVenue = (venueId) => {
  return axios.get(`showapi/pub/venue/${venueId}`);
};

const getVenueShows = (venueId) => {
  return axios.get(`showapi/pub/venue/${venueId}/shows`, {
    params: { offset: 0, length: 10 },
  });
};

// const getAll = () => {
//   return axios.get(
//     "https://appapi.moretickets.com/showapi/pub/v1_1/site/58a2bb160cf273b891c85e8c/home_floor"
//   );
// };

export {
  getHotSearch,
  getHomeBanner,
  getHotWords,
  getSearched,
  getSearching,
  getArtist,
  getArtistShows,
  getVenue,
  getVenueShows,
  // getAll,
};

const getChoiceness = (id = 4401) => {
  return axios.get("showapi/pub/site/58a2bb160cf273b891c85e8c/discountShows", {
    params: {
      siteCityOID: id,
      offset: 0,
      length: 10,
    },
  });
};
const getHomeAll = (id = 4401) => {
  return axios.get(
    "showapi/pub/v1_1/site/58a2bb160cf273b891c85e8c/home_floor",
    {
      params: {
        siteCityId: id,
      },
    }
  );
};

const getWatching = (id = 4401) => {
  //showapi/pub/site/58a2bb160cf273b891c85e8c/hot_show?siteCityOID=4505&offset=0&length=20
  return axios.get("showapi/pub/site/58a2bb160cf273b891c85e8c/hot_show", {
    params: {
      siteCityOID: id,
      offset: 0,
      length: 20,
    },
  });
};

const getProgramlist = () => {
  return axios.get(
    "https://appapi.moretickets.com/showapi/pub/v1/site/58a2bb160cf273b891c85e8c/ranking?type=SHOW&siteCityId=4401"
  );
};
const getPerformerlist = () => {
  return axios.get(
    "https://appapi.moretickets.com/showapi/pub/v1/site/58a2bb160cf273b891c85e8c/ranking?type=ARTIST&siteCityId=4401"
  );
};

export {
  getChoiceness,
  getHomeAll,
  getWatching,
  getProgramlist,
  getPerformerlist,
};
