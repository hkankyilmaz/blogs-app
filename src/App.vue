<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import "./assets/main.css";
import logo from "@/assets/logo.png";
import UseAuthUser from "@/services/AuthService";

const appLogo = logo;

const header = ref(null);
const footer = ref(null);
const mainContent = ref(null);

const { getUser } = UseAuthUser();

onMounted(() => {
  const headerHeight = header.value.offsetHeight;
  const footerHeight = footer.value.offsetHeight;
  const totalHeight = headerHeight + footerHeight;
  const h = `calc(100vh - ${totalHeight}px)`;
  mainContent.value.style.height = h;
});
</script>

<template lang="pug">

main(class="flex flex-col min-h-[100vh] m-auto justify-between max-w-[1200px] bg-[#FAFAFA] shadow-lg")

  header(class="bg-gray-800  text-white  flex justify-between items-center px-3 md:px-10" ref="header")
      div
        img(:src="appLogo" alt="Vue logo" width="70" height="50" class="cursor-pointer" @click="handleClick")
      nav(class="flex space-x-3 md:space-x-5") 
          RouterLink(to="/") Home
          RouterLink(to="/login") Login
          RouterLink(v-if="!isSessionExist" to="/register") Register
          RouterLink(v-if="!isSessionExist" to="/reset-password") Reset
          span(v-if="isSessionExist") Welcome
          span(v-if="isSessionExist" @click="logOutUser" class="cursor-pointer") Log Out
  div(class="grid grid-cols-[auto_300px]  gap-3" ref='mainContent')
      RouterView(class="")
      aside(class="flex flex-col")
        div(class="h-[50%]") Top Stars Author
        div(class="h-[50%]") Top Star Blog
  footer(class="bg-gray-800  text-white flex justify-center items-center p-5" ref="footer")
      p(class="text-sm") © 2024 bloggApp  - Hakan KARAYILMAZ
  

</template>
