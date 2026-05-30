import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   bannerData: [],
//   configImageData: "",
//   data: {
//     movie :{
//       action: [],
//       animation: [],
//       comeady: [],
//       crime: [],
//       documentery: [],
//       action: [],

//     }
//   }

// }
const tvSlice = createSlice({
  name: "BingeHub",
  initialState: {
    bannerData: [],
    configImageData: "",
    nowTvPlayingData: [],
    topRatedData: [],
    tvSeriesData: [],
    bollywoodData: [],
    hollywoodData: [],
    similarData: [],
    recommededData: [],
    genreType: "movie",
    searchInput: "",
    providers: [],
    screenshots: [],
    reviews: [],
    loading: true,
    error: null,
  },
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setConfigImageData: (state, action) => {
      state.configImageData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setNowTvPlayingData: (state, action) => {
      state.nowTvPlayingData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setTopRatedData: (state, action) => {
      state.topRatedData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setTvSeriesData: (state, action) => {
      state.tvSeriesData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setBollywoodData: (state, action) => {
      state.bollywoodData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setHollywoodData: (state, action) => {
      state.hollywoodData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setSimilarData: (state, action) => {
      state.similarData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setRecommededData: (state, action) => {
      state.recommededData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setGenreType: (state, action) => {
      state.genreType = action.payload;
      state.error = null;
      state.loading = false;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
      state.error = null;
      state.loading = false;
    },
    setDetailsData: (state, action) => {
      state.detailsData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
      state.error = null;
      state.loading = false;
    },
    setScreenshots: (state, action) => {
      state.screenshots = action.payload;
      state.error = null;
      state.loading = false;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setBannerData,
  setConfigImageData,
  setNowTvPlayingData,
  setTopRatedData,
  setTvSeriesData,
  setBollywoodData,
  setHollywoodData,
  setSimilarData,
  setRecommededData,
  setGenreType,
  setSearchInput,
  setDetailsData,
  setProviders,
  setScreenshots,
  setReviews,
  setLoading,
  setError,
} = tvSlice.actions;
export default tvSlice.reducer;
