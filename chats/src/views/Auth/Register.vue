<template>
  <!-- <div> -->
  <div class="limiter">
    <div class="container-login100" style="background-image: url('img/bg-01.c92b2d76.jpg');">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <div class="login100-form validate-form">
          <span class="login100-form-title p-b-49">Register</span>

          <div class="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
            <span class="label-input100">Full name</span>
              <input
                class="input100"
                type="text"
                name="fullname"
                v-model="user.fullname"
                placeholder="Type your username"
              />
            <span class="focus-input100"></span>
          </div>
          <div class="wrap-input100 validate-input m-b-23">
            <span class="label-input100">Email</span>
              <input
                class="input100"
                type="text"
                name="email"
                v-model="user.email"
                placeholder="Type your Email"
              />

            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input m-b-23" data-validate="Password is required">
            <span class="label-input100">Password</span>
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="Type your password"
                v-model="user.password"
              />
            <span class="focus-input100"></span>
          </div>
          <div class="wrap-input100 validate-input m-b-23" data-validate="Password is required">
            <span class="label-input100">Confirm Password</span>
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="Type your password"
                v-model="user.confirm_pass"
              />
            <span class="focus-input100"></span>
          </div>
          <div class="container-login100-form-btn m-b-23">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-form-btn" @click="register">Sign Up</button>
            </div>
          </div>

          <div class="flex-c-m">
            <a href="#" class="login100-social-item bg1">
              <i class="fa fa-facebook"></i>
            </a>

            <a href="#" class="login100-social-item bg2">
              <i class="fa fa-twitter"></i>
            </a>

            <a href="#" class="login100-social-item bg3">
              <i class="fa fa-google"></i>
            </a>
          </div>

          <div class="flex-col-c p-t-155">
            <span class="txt1 p-b-17">Or Sign In Using</span>

            <a @click="$router.push({name: 'login'})" class="txt2">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div id="dropDownSelect1"></div>
  </div>-->
</template>
<script>
export default {
  data: () => ({
    user:{
      email: null,
      fullname: null,
      password: null,
      confirm_pass: null,
    }
  }),
  created() {
    
  },
  methods: {
    register() {
      this.$store.dispatch("registration", {
        user:this.user
      }).then(data =>{
        if(data == 'success'){
              this.$router.push('login')
          
          }
        else{
          console.log(data)
          console.log('sdfsdfd',data[0].constraints.length)
          let errors = '';
           errors += data.map(function(item){
             let err = '';
             for (var key in item.constraints) {
               console.log(item.constraints)
             console.log(key + " -> " + item.constraints[key]);
             err += item.constraints[key] + '<br>';
              }
              return err;
           })
        this.$awn.alert(JSON.stringify(errors))
        }
      })
    },
  },
};
</script>