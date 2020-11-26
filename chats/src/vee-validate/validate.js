import Vue from 'vue'
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
Vue.component('ValidationProvider', ValidationProvider);

// Vue.use(VeeValidate, {
//     events: 'change|blur|xxx'
//   });
// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});

// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});

  extend('password', {
    params: ['target'],
    validate(value, { target }) {
        console.log(value,target)
      return value === target;
    },
    message: 'Password confirmation does not match'
  });