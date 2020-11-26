<template>
 <div class="inbox_chat">
     <div v-for="(chat,index) in chatsList" :key="index">
            <div class="chat_list " :class="{ active_chat: activeMessage === index }"  @click="activeMess(index,chat.id)">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>{{chat.name}}<span class="chat_date"></span></h5>
                  <!-- <p>{{chat.message}}</p> -->
                </div>
              </div>
            </div>

     </div>
          </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ['title', 'subTilite', 'selectLast','delay','chatsList'],
  data: () => ({
    activeMessage: null,
    delays: [
      { name: '24 hour', value: '24hour' },
      { name: '7 days', value: '7 days' }, 
      { name: '15 days', value: '15 days' }, 
      { name: '30 days', value: '30 days' }, 
    ],
  }),
  methods: {
    activeMess(e,id){
        this.activeMessage = e;
          this.$store
        .dispatch("GetMessages", 
          id,
        )
        this.$emit('connectSocket', id)
    }
  },
  
}
</script>