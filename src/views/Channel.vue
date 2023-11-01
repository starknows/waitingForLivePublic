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
  .invalid-text(v-else-if="resultStatus==='empty'")
    .channel__info.m-bottom
      span {{ channelName }}
      span {{ ` 目前沒有開台紀錄` }}
  .invalid-text(v-else-if="resultStatus==='unsafe'") {{ '頻道 ID 錯誤' }}
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const channelId = route.params.channelId;
const lastLiveId = ref(null);
const channelName = ref("");
const safeId = /@[0-9a-zA-Z\_\-\.]+$/gm.test(channelId);
const token = ref(null);
const resultStatus = ref(null)
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
    fetch("https://service-starknows.onrender.com/auth", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "wuxu",
        password: "755ec607-b660-402d-b70e-458d2a3a05cc",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const body = JSON.stringify({ channelId });
        token.value = json.token;
        fetch("https://service-starknows.onrender.com/api/last-stream", {
          method: "post",
          headers: {
            Authorization: `Bearer ${json.token}`,
            "Content-Type": "application/json",
          },
          body,
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("last-stream: ", json);
            lastLiveId.value = json.lastLiveId;
            if (!json.lastLiveId) {
              resultStatus.value = 'empty'
            } {
              resultStatus.value = 'valid'
              nowStreamTime.value = getSubtractTimeFromNow(json.data);
              window.setInterval(() => {
                nowStreamTime.value = getSubtractTimeFromNow(json.data);
              }, 1000);
            }
          });
        fetch("https://service-starknows.onrender.com/api/channel-name", {
          method: "post",
          headers: {
            Authorization: `Bearer ${json.token}`,
            "Content-Type": "application/json",
          },
          body,
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("channel-name: ", json);
            channelName.value = json.data;
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
onMounted(() => {
  if (safeId) doFetching(channelId);
  else resultStatus = 'unsafe'
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
  color: #aaa
</style>
