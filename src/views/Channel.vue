<template lang="pug">
.channel__wrapper.d-flex.f-center.f-col.w-100.h-100
  .checking-text(v-if="!resultStatus") Checking...
  template(v-else-if="resultStatus==='valid'")
    .channel__info.m-bottom
      span {{ `距離 ` }}
      span.channel-name {{ channelName }}
      span {{ ` 上次開台已經過了` }}
    .channel__time
      span.channel__time-text.m-bottom {{ `${nowStreamTime[0]} 天 ${nowStreamTime[1]}時 ` }}
      span.channel__time-text {{ `${nowStreamTime[2]}分 ${nowStreamTime[3]}秒` }}
    .channel__care.d-flex.f-center.m-top
      a(v-if="channelId" :href="`https://www.youtube.com/${channelId}?sub_confirmation=1`" target="_blank" rel="nooppener noreferrer") {{ '>> 關心主播' }}
      a(v-if="lastLiveId" :href="`https://www.youtube.com/watch?v=${lastLiveId}`" target="_blank" rel="nooppener noreferrer") {{ '>> 緬懷主播' }}
  .invalid-text.d-flex.f-center.f-col(v-else-if="resultStatus==='empty'")
      span.m-bottom {{ channelName }}
      span {{ ` 目前沒有開台紀錄` }}
  .invalid-text.d-flex.f-center(v-else-if="resultStatus==='unsafe'") {{ '頻道 ID 錯誤' }}
  .invalid-text.d-flex.f-center(v-else-if="resultStatus==='error'") {{ '錯誤發生' }}
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const API_ROOT = import.meta.env.VITE_API_URL;
const route = useRoute();
const channelId = route.params.channelId;
const lastLiveId = ref(null);
const channelName = ref("");
const safeId = /@[0-9a-zA-Z\_\-\.]+$/gm.test(channelId);
const resultStatus = ref(null);
const nowStreamTime = ref(null);
const getSubtractTimeFromNow = (dateString) => {
  const dayOffset = new Date() - new Date(dateString);
  const subtractDay = Math.floor(dayOffset / 86400000);
  const hourOffset = dayOffset % 86400000;
  const subtractHour = Math.floor(hourOffset / 3600000);
  const minuteOffset = hourOffset % 3600000;
  const substractMinute = Math.floor(minuteOffset / 60000);
  const secondOffset = minuteOffset % 60000;
  const substractSecond = Math.floor(secondOffset / 1000);
  return [subtractDay, subtractHour, substractMinute, substractSecond];
};
const doFetching = async (channelId) => {
  if (safeId) {
    try {
      const authResult = await fetch(`${API_ROOT}/auth`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
      });
      const authContent = await authResult.json();
      const body = JSON.stringify({ channelId });
      const headers = { "Content-Type": "application/json" };
      if (authContent.token)
        headers["Authorization"] = `Bearer ${authContent.token}`;
      fetch(`${API_ROOT}/api/channel-name`, {
        method: "post",
        headers,
        body,
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("channel-name: ", json);
          channelName.value = json.data;
        });
      fetch(`${API_ROOT}/api/last-stream`, {
        method: "post",
        headers,
        body,
      })
        .then((res) => {
          switch (res.status) {
            case 400:
              resultStatus.value = "unsafe";
              return null;
            case 403:
              resultStatus.value = "empty";
              return null;
            case 404:
              resultStatus.value = "error";
              return null;
            default:
              return res.json();
          }
        })
        .then((json) => {
          console.log("last-stream: ", json);
          if (!json) return;
          resultStatus.value = "valid";
          lastLiveId.value = json.lastLiveId;
          nowStreamTime.value = getSubtractTimeFromNow(json.data);
          window.setInterval(() => {
            nowStreamTime.value = getSubtractTimeFromNow(json.data);
          }, 1000);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }
};
onMounted(() => {
  if (safeId) doFetching(channelId);
  else resultStatus = "unsafe";
});
</script>

<style lang="sass" scoped>
.channel
  &__info
    font-size: 1.75rem
    font-weight: 600
    max-width: 80%
    text-align: center
    @media screen and (max-width: 897px)
      font-size: 1.5rem
    & > span.channel-name
      font-size: 1.5em
      border-bottom: 2px solid
      @media screen and (max-width: 897px)
        display: flex
        flex-direction: col
        margin: 0.5rem 0
  &__time
    margin: 2rem 0
    @media screen and (max-width: 897px)
      margin: 0.5rem 0
    @media screen and (max-height: 500px)
      margin: 0.5rem 0
  &__time-text
    text-align: center
    font-size: 7rem
    font-weight: 700
    @media screen and (max-width: 1200px)
      display: flex
      flex-direction: column
    @media screen and (max-width: 897px)
      font-size: 3rem
    @media screen and (max-height: 500px)
      font-size: 3rem
  &__care
    & > a
      color: inherit
      text-decoration: none
      padding-bottom: 3px
      margin: 0 1rem
      font-weight: 700
      font-size: 2rem
      @media screen and (max-width: 897px)
        font-size: 1rem
      &:hover
          border-bottom: 1px solid rgba(black, 0.3)
.checking-text
  font-size: 2rem
  opacity: 0.8
.invalid-text
  font-size: 2rem
  opacity: 0.8
</style>
