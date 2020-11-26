import axios from "axios";
import router from "../../router";
const state = {
    messages :[]
};

// getters
const getters = {
  getMessages: state => state.messages,
};
const actions = {
 
      GetMessages({ commit },room_id) {
        axios({
          url: "/message/getMessageList",
          method: "POST",
          data: {room_id:room_id}
        }).then(res => {
          commit("setMessages", res.data);
        }).catch(error => {

        });
      },
    }
    const mutations = {
      setMessages: (state, messages) => {
        state.messages = messages;
      },
    };
export default {
    actions,
    mutations,
    state,
    getters
  };
  