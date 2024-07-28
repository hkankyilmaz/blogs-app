<script setup lang="js">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import _ from "lodash";
import { message } from "ant-design-vue";

import useAuthUser from "@/services/AuthService";

const { register, login, sendPasswordRestEmail } = useAuthUser();

const { formType } = defineProps({
  formType: {
    type: String,
    required: true,
  },
});

const buttonText =
  formType == "register"
    ? "Register"
    : formType == "login"
      ? "Login"
      : formType == "resetPassword"
        ? "Reset Password"
        : "Unknown";

const state = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
});

const errorMessage = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
});

const passwordRef = computed(() => state.password);

const rules = {
  email: {
    required: helpers.withMessage("! Please enter your email", required),
    email: helpers.withMessage("! Please enter a valid email", email),
  },

  ...(formType !== "resetPassword" && {
    password: {
      required: helpers.withMessage("! Please enter your password", required),
      minLength: helpers.withMessage(
        "! Password must be at least 6 characters",
        (value) => value.length >= 6
      ),
    },
  }),

  ...(formType == "register" && {
    passwordConfirm: {
      required: helpers.withMessage("! Please enter your password", required),
      sameAs: helpers.withMessage(
        "! Passwords do not match",
        sameAs(passwordRef)
      ),
      minLength: helpers.withMessage(
        "! Password must be at least 6 characters",
        (value) => value.length >= 6
      ),
    },
  }),
};

const v$ = useVuelidate(rules, state);

const submit = () => {
  v$.value.$touch();
  errorMessage.email = "";
  errorMessage.password = "";
  errorMessage.passwordConfirm = "";
  if (v$.value.$error) {
    _.map(v$.value.$silentErrors, (value, key) => {
      _.keys(value).map((k) => {
        if (value.$property === "email") errorMessage.email = value.$message;
        if (value.$property === "password")
          errorMessage.password = value.$message;
        if (value.$property === "passwordConfirm")
          errorMessage.passwordConfirm = value.$message;
      });
    });
    message.error("Please fill in the fields correctly");
    return;
  } else {
    if (formType == "register") {
      register(state.email, state.password);
    }
    if (formType == "login") {
      login(state.email, state.password);
    }
    if (formType == "resetPassword") {
      sendPasswordRestEmail(state.email);
    }
  }
};
</script>

<template lang="pug">

form(class="flex flex-col w-[330px] m-auto items-center space-y-3 justify-center h-[calc(100vh-130px)]" @submit.prevent="submit")
    input(type="text" placeholder="Email" class="p-3 border w-full focus:outline-none" v-model="state.email")
    span(v-if="errorMessage.email !== ''" class="w-full text-sm text-left") {{ errorMessage.email }}
    input( v-if="formType == 'login' || formType == 'register'" type="password" placeholder="Password" class="p-3 border w-full focus:outline-none" v-model="state.password")
    span(v-if="errorMessage.password !== '' && formType !== 'resetPassword'" class="w-full text-sm text-left") {{ errorMessage.password }}
    input(v-if="formType == 'register'" type="password" placeholder="Confirm Password" class="p-3 border w-full focus:outline-none" v-model="state.passwordConfirm")
    span(v-if="errorMessage.passwordConfirm !== '' && formType == 'register'" class="w-full text-sm text-left") {{ errorMessage.passwordConfirm }}
    button(type="submit" class="border p-3 w-full bg-black text-white cursor-pointer border-none")  {{  buttonText }}
    span(v-if="formType == 'register'" class="") Already have an account? 
      RouterLink(to="/login" class="underline") Login
    div(v-if="formType == 'login'" class="flex flex-col items-center space-y-0")
      span Don't have an account? 
        RouterLink(to="/register" class="underline") Register
      span Forgot Password? 
        RouterLink(to="/reset-password" class="underline") Reset Password
    span(v-if="formType == 'resetPassword'" class="") Have you Remember the Password? 
      RouterLink(to="/login" class="underline") Login

</template>

<style lang=""></style>
