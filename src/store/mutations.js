export default {
  setToken(state, token) {
    state.token = token;
  },
  setLang(state, lang) {
    state.language = lang;
  },
  setPrevUrl(state, url) {
    state.prev_url = url;
  },
  setLoader(state, data) {
    state.loader = data;
  },
  getUser(state) {
    var data = localStorage.getItem("pdm");
    if (!data) {
      state.user = null;
      state.token = null;
      window.location.href = "/login";
    }
    data = decodeURIComponent(data);
    data = JSON.parse(data);
    // console.log(data)
    state.user = data;
    state.token = data.tokens;

    var result = encodeURIComponent(JSON.stringify(data));
    localStorage.setItem("pdm", result);
  },
  setUser(state, data) {
    state.user = data;
    state.token = data.tokens;
    // console.log(state.user)
    var result = encodeURIComponent(JSON.stringify(data));
    localStorage.setItem("pdm", result);
  },

  logout(state) {
    var sup = false;
    if (state.user.supervisor) {
      sup = true;
    }
    window.localStorage.removeItem("pdm");
    state.user = null;
    state.token = null;

    if (sup) {
      window.location.href = "/supervisor/login";
    } else {
      window.location.href = "/login";
    }
  },
};
