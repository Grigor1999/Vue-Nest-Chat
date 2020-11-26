<template>
  <!-- <div> -->
  <div class="limiter p-5">
      You have successfully activated your account<br>
      <a @click="$router.push({name: 'login'})" class="btn btn-primary">
							Sign in
						</a>
  </div>

  <!-- <div id="dropDownSelect1"></div>
  </div>-->
</template>
<script>
export default {

  created() {
       this.$store.dispatch("activation", {
        id:this.$route.params.id
      })
  },
 
};
</script>