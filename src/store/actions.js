import axios from "axios";

export default {
  handleError(context, error) {
    if (error.request.status == 422) {
      var resp = JSON.parse(error.request.response);
      var err = resp.errors;
      var msg = "";
      for (var item in err) {
        msg = err[item][0];
        break; // it picks the first error ;
      }
      window.ToasterAlert("error", msg);
      // return msg;
    } else if (error.request.status == 413) {
      msg = "Files too large";
      window.ToasterAlert("error", resp.error);
    } else if (error.request.status == 303) {
      resp = JSON.parse(error.request.response);
      window.ToasterAlert("error", resp.error);
    } else if (error.request.status == 404) {
      resp = JSON.parse(error.request.response);
      msg = "Request not found";
      window.ToasterAlert("error", resp.error);
    } else if (error.request.status == 400) {
      resp = JSON.parse(error.request.response);
      msg = resp.message;
      window.ToasterAlert("error", resp.error);
    } else if (error.request.status == 401) {
      msg = "Oops! Authentication error, Please login again";
      window.ToasterAlert("error", resp.error);
      context.commit("logout");
      // console.log(router.currentRoute)
    } else {
      msg = "Oops! server error, Please try again";
      window.ToasterAlert("error", msg);
    }
    context.commit("setLoader", false);
  },

  post(context, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .post(context.state.endpoint + data.endpoint, data.details, {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + context.state.token,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          context.dispatch("handleError", error);
          reject(error);
        });
    });
  },
  put(context, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      axios
        .put(context.state.endpoint + data.endpoint, data.details, {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + context.state.token,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          context.dispatch("handleError", error);
          reject(error);
        });
    });
  },
  get(context, endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(context.state.endpoint + endpoint, {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: "Bearer " + context.state.token,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          context.dispatch("handleError", error);
          reject(error);
        });
    });
  },
};
