import axios from "axios";
import router from "../../router";
const state = {
  user: JSON.parse(localStorage.getItem("user")),
};

// getters
const getters = {
  getUser: state => state.user,
};
const actions = {
    registration({ commit }, user) {
        return new Promise((resolve, reject) => {
          axios({
            url: "/users/registration",
            data: user,
            method: "POST"
          })
            .then(res => {
              // this.$awn.alert("Your custom message")
              resolve(res.data);
            })
            .catch(err => {
              // this.$awn.alert("Your custom message")

              reject(err.response);
            });
        });
      },
      activation({ commit }, id) {
        return new Promise((resolve, reject) => {
          axios({
            url: "/users/activateUser",
            data: id,
            method: "PUT"
          })
            .then(res => {
              // this.$awn.alert("Your custom message")
              resolve(res.data);
            })
            .catch(err => {
              // this.$awn.alert("Your custom message")

              reject(err.response);
            });
        });
      },
      login({ commit }, user) {
        return new Promise((resolve, reject) => {
          axios({
            url: "/auth/login",
            data: JSON.stringify({"email": user.user.email, "password": user.user.password}),
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
          },
          })
            .then(res => {
              const token = res.data.access_token;
              localStorage.setItem("user-token", token);
              axios.defaults.headers.common["Authorization"] ='Bearer ' +  token;
              resolve('')
            })
            .catch(err => {
              resolve(err.response);
            });
        });
      },
      verifyToken({ commit, dispatch, rootState }) {
        axios({
          url: "/auth/check-token",
          method: "POST"
        }).then(res => {
          commit("setUser", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }).catch(error => {
          localStorage.removeItem("user-token");
            router.push({ name: "login" });
        });
      },
    }
    const mutations = {
      setUser: (state, user) => {
        state.user = user;
      },
    };
export default {
    actions,
    mutations,
    state,
    getters
  };
  