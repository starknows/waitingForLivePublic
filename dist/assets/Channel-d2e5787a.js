import{_ as O,f as M,r as s,g as T,o as c,c as l,F as B,a as n,t as o,h as w,e as y,p as F,i as N}from"./index-3969b051.js";const g=r=>(F("data-v-d517a790"),r=r(),N(),r),A={class:"channel__wrapper d-flex f-center f-col w-100 h-100"},D={class:"channel__info m-bottom"},z=g(()=>n("span",null,o("距離 "),-1)),L={class:"channel-name"},R=g(()=>n("span",null,o(" 上次開台已經過了"),-1)),V={class:"channel__time"},E={class:"channel__time-text m-bottom"},H={class:"channel__time-text"},J={class:"channel__care d-flex f-center m-top"},P=["href"],Z=["href"],j={key:1,class:"checking-text"},q={__name:"Channel",setup(r){const d="https://service-starknows.onrender.com",h=M().params.channelId,u=s(null),p=s(""),k=/@[0-9a-zA-Z\_\-\.]+$/gm.test(h),b=s(null),f=s(!0),a=s(null),m=_=>{const t=new Date-new Date(_),i=Math.floor(t/864e5),e=t%864e5,I=Math.floor(e/36e5),v=e%36e5,x=Math.floor(v/6e4),C=v%6e4,S=Math.floor(C/1e3);return[i,I,x,S]},$=async _=>{k&&fetch(`${d}/auth`,{method:"post",headers:{"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{const i=JSON.stringify({channelId:_});b.value=t.token,fetch(`${d}/api/last-stream`,{method:"post",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"},body:i}).then(e=>e.json()).then(e=>{console.log("last-stream: ",e),f.value=!1,u.value=e.lastLiveId,a.value=m(e.data),window.setInterval(()=>{a.value=m(e.data)},1e3)}),fetch(`${d}/api/channel-name`,{method:"post",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"},body:i}).then(e=>e.json()).then(e=>{console.log("channel-name: ",e),p.value=e.data})}).catch(t=>{console.log(t)})};return T(()=>{$(h)}),(_,t)=>(c(),l("div",A,[f.value?(c(),l("div",j,"Checking...")):(c(),l(B,{key:0},[n("div",D,[z,n("span",L,o(p.value),1),R]),n("div",V,[n("span",E,o(`${a.value[0]} 天 ${a.value[1]}時 `),1),n("span",H,o(`${a.value[2]}分 ${a.value[3]}秒`),1)]),n("div",J,[w(h)?(c(),l("a",{key:0,href:`https://www.youtube.com/${w(h)}?sub_confirmation=1`,target:"_blank",rel:"nooppener noreferrer"},o(">> 關心主播"),8,P)):y("",!0),u.value?(c(),l("a",{key:1,href:`https://www.youtube.com/watch?v=${u.value}`,target:"_blank",rel:"nooppener noreferrer"},o(">> 緬懷主播"),8,Z)):y("",!0)])],64))]))}},Q=O(q,[["__scopeId","data-v-d517a790"]]);export{Q as default};
