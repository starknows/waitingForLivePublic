<template lang="pug">
.author-wrapper.d-flex.f-col
  a(href="https://twitter.com/starknows99" target="_blank" rel="nooppener noreferrer") Starknows 2023
RouterView
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  let preventSetVhLoop = null;
  let setVhVw = () => {
    if (preventSetVhLoop) return;
    console.log("reset VhVw");
    preventSetVhLoop = setTimeout(() => {
      clearTimeout(preventSetVhLoop);
      document
        .querySelector(":root")
        .style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
      preventSetVhLoop = null;
    }, 100);
  };
  setVhVw();
  window.addEventListener("resize", setVhVw);
  window.addEventListener("orientationchange", setVhVw);
});
</script>
<style lang="sass">
#app
  position: relative
  width: 100%
  height: 100vh /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100)
  font-family: 'Noto Serif TC', sans-serif
  letter-spacing: 0.15rem
  background: rgba(#85919d, 0.7)
  color: rgb(var(--black))
.author-wrapper
  position: absolute
  bottom: 2rem
  left: 50%
  transform: translateX(-50%)
  border-bottom: 1px solid rgba(var(--black), 0.6)
  padding-bottom: 3px
  font-weight: 900
  @media screen and (max-height: 650px)
    bottom: 6px
    font-size: 0.75rem
  @media screen and (max-height: 400px)
    display: none
  & > a
    color: inherit
    text-decoration: none
</style>
