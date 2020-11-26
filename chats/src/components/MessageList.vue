<template>
  
    <div class="msg_history" ref="messagesContainer">
      <div v-for="(item, index) in this.messages" :key="index">
        <div class="outgoing_msg" v-if="item.userId == user.userId">
          <div class="sent_msg">
            <p>{{item.message}}</p>
            <!-- <span class="time_date">{{item.user.fullname}}</span> -->
          </div>
        </div>
        <div class="incoming_msg" v-else>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p>{{item.message}}</p>
              <!-- <span class="time_date">{{item.user.fullname}}</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
</template>

<script>
import { watch } from 'fs';
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["messageList"],
  computed: {
       ...mapGetters({
      user: "getUser",
      messages: "getMessages"
    }),
  },
  data: () => ({
    activeMessage: null,
  }),
  created(){
   this.$nextTick(() => this.scrollToEnd());
  },
  mounted(){

  },
 updated() {
       
        this.$nextTick(() => this.scrollToEnd());
    },
  methods:{
    scrollToEnd: function () {
            var content = this.$refs.messagesContainer;
            content.scrollTop = content.scrollHeight
        }
  }
};
</script>