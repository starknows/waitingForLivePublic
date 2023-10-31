<template lang="pug">
.guide__wrapper.d-flex.f-center.f-col.w-100.h-100
    h1 {{ '你推多久沒開台了？' }}
    .d-flex.f-center.f-col
        .d-flex.f-center.m-top
            span.text-id {{ '頻道ID: ' }}
            input.m-1(v-model="inputValue" @input="()=>warningText = null" @keypress.prevent="listenEnter")
            span.material-symbols-outlined.icon-timer(@click="doClick") timer
        span.text-hint
            | {{ 'e.g. ' }}
            a(href="https://www.youtube.com/@Kintsuai" target="_blank" rel="nooppener noreferrer") {{ '@Kintsuai' }}
            | {{ ' or ' }}
            a(href="https://www.youtube.com/@Suzuna_xx7" target="_blank" rel="nooppener noreferrer") {{ '@Suzuna_xx7' }}
        span.text-warn.m-top(v-if="warningText") {{ warningText }}
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const inputValue = ref(null);
const warningText = ref(null);
const doClick = () => {
  const safeId = /@[0-9a-zA-Z\_\-\.]+$/gm.test(inputValue.value);
  if (safeId)
    router.push({ name: "Channel", params: { channelId: inputValue.value } });
  else warningText.value = "ID格式有誤";
};
const listenEnter = (e) => {
  if (e.key === "Enter") doClick();
};
</script>

<style lang="sass">
.text-id
    font-size: 1.25rem
    font-weight: 700
.text-hint
    font-size: 0.75rem
    opacity: 0.8
.text-warn
    color: #E84A5F
    font-weight: 800
span
    & > a
        color: inherit
        text-decoration: none
        padding-bottom: 3px
        &:hover
            border-bottom: 1px solid rgba(black, 0.3)
.icon-timer
    user-select: none
    cursor: pointer
    color: rgba(var(--black), 0.6)
    transition: .2s
    transform: rotate(30deg)
    &:hover
        transform: scale(1.1)
        color: rgba(#FF0000, 0.8)
</style>
