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
    .channel__care.d-flex.f-center.m-top.f-wrap
      a(v-if="channelId" :href="`https://www.youtube.com/${channelId}?sub_confirmation=1`" target="_blank" rel="nooppener noreferrer") {{ '>> 關心主播' }}
      a(v-if="lastLiveId" :href="`https://www.youtube.com/watch?v=${lastLiveId}`" target="_blank" rel="nooppener noreferrer") {{ '>> 緬懷主播' }}
      a.highlight(v-if="deerUrl" :href="`https://deerdonate.herokuapp.com/donation/${deerUrl}`" target="_blank" rel="nooppener noreferrer") {{ '>> 譴責主播' }}
      a.highlight(v-if="ecPayUrl" :href="`https://p.ecpay.com.tw/${ecPayUrl}`" target="_blank" rel="nooppener noreferrer") {{ '>> 譴責主播' }}
  .invalid-text.d-flex.f-center.f-col(v-else-if="resultStatus==='empty'")
    span.m-bottom {{ channelName }}
    span {{ ` 目前沒有開台紀錄` }}
  .invalid-text.d-flex.f-center(v-else-if="resultStatus==='unsafe'") {{ '頻道 ID 錯誤' }}
  .invalid-text.d-flex.f-center(v-else-if="resultStatus==='error'") {{ '錯誤發生' }}
  .invalid-text.d-flex.f-center(v-else-if="resultStatus==='429'") {{ '服務暫時無法使用' }}
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const API_ROOT = import.meta.env.VITE_API_URL;
const route = useRoute();
const channelId = route.params.channelId;
const safeId = /@[0-9a-zA-Z\_\-\.]+$/gm.test(channelId);
// INFO
const resultStatus = ref(null);
const channelName = ref("");
const lastLiveId = ref(null);
const nowStreamTime = ref(null);
const deerUrl = ref(null);
const ecPayUrl = ref(null);
//
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
      console.log(document.cookie);
      if (authContent.token)
        headers["Authorization"] = `Bearer ${authContent.token}`;
      fetch(`${API_ROOT}/api/channel-info`, {
        method: "post",
        headers,
        body,
        credentials: "include",
      })
        .then((res) => {
          switch (res.status) {
            case 400:
              resultStatus.value = "unsafe";
              break;
            case 403:
              resultStatus.value = "empty";
              break;
            case 404:
              resultStatus.value = "error";
              break;
            default:
          }
          res.json();
        })
        .then((json) => {
          if (json.status.includes("429")) {
            console.log("last-stream: ", json);
            resultStatus.value = "429";
            return;
          }
          if (resultStatus.value) return;
          resultStatus.value = "valid";
          lastLiveId.value = json.lastLiveId;
          channelName.value = json.name;
          deerUrl.value = json.deer;
          ecPayUrl.value = json.ecpay;
          nowStreamTime.value = getSubtractTimeFromNow(json.lastLiveTime);
          window.setInterval(() => {
            nowStreamTime.value = getSubtractTimeFromNow(json.lastLiveTime);
          }, 1000);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }
};
onMounted(() => {
  if (safeId) doFetching(channelId);
  else resultStatus.value = "unsafe";
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
    @media screen and (max-height: 320px)
        font-size: 1rem
        margin-bottom: 0.5rem
    & > span.channel-name
      font-size: 1.5em
      border-bottom: 2px solid
      @media screen and (max-width: 897px)
        display: flex
        padding-bottom: 0.5rem
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
    @media screen and (max-height: 320px)
      font-size: 2rem
    @media screen and (max-width: 320px)
      font-size: 2rem
  &__care
    & > a
      color: inherit
      text-decoration: none
      padding-bottom: 3px
      margin: 0 1rem 1rem
      font-weight: 700
      font-size: 2rem
      &.highlight
        filter: drop-shadow(2px 2px 2px rgba(black, 0.4))
        &:hover
          opacity: 0.8
      @media screen and (max-width: 897px)
        font-size: 1rem
      @media screen and (max-height: 320px)
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
