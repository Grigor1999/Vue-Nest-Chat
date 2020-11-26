import axios from "axios";
import router from "../../router";
const actions = {
    GetRoomList({ commit }, user) {
        return new Promise((resolve, reject) => {
          axios({
            url: "/message/getRoomList",
            method: "POST"
          })
            .then(res => {
              resolve(res.data);
            })
            .catch(err => {

              reject(err.response);
            });
        });
      },
    }
export default {
    actions,
  };
  