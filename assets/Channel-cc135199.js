import{e as M,r as i,f as D,o as n,c as s,F as N,a as o,t,g as $,d as h,p as B,h as F}from"./main-4ef41bf3.js";const L=(c,_)=>{const y=c.__vccOpts||c;for(const[l,d]of _)y[l]=d;return y},x=c=>(B("data-v-1610af2b"),c=c(),F(),c),R={class:"channel__wrapper d-flex f-center f-col w-100 h-100"},A={key:0,class:"checking-text"},z={class:"channel__info m-bottom"},P=x(()=>o("span",null,t("距離 "),-1)),U={class:"channel-name"},V=x(()=>o("span",null,t(" 上次開台已經過了"),-1)),E={class:"channel__time"},H={class:"channel__time-text m-bottom"},J={class:"channel__time-text"},Z={class:"channel__care d-flex f-center m-top f-wrap"},q=["href"],G=["href"],K=["href"],Q=["href"],W={key:2,class:"invalid-text d-flex f-center f-col"},X={class:"m-bottom"},Y=x(()=>o("span",null,t(" 目前沒有開台紀錄"),-1)),j={key:3,class:"invalid-text d-flex f-center"},ee={key:4,class:"invalid-text d-flex f-center"},te={key:5,class:"invalid-text d-flex f-center"},ae={__name:"Channel",setup(c){const _="https://service.starknows.tw",l=M().params.channelId,d=/@[0-9a-zA-Z\_\-\.]+$/gm.test(l),a=i(null),k=i(""),w=i(null),r=i(null),g=i(null),b=i(null),I=f=>{const u=new Date-new Date(f),p=Math.floor(u/864e5),v=u%864e5,m=Math.floor(v/36e5),e=v%36e5,C=Math.floor(e/6e4),O=e%6e4,T=Math.floor(O/1e3);return[p,m,C,T]},S=async f=>{if(d)try{const p=await(await fetch(`${_}/auth`,{method:"post",headers:{"Content-Type":"application/json"}})).json(),v=JSON.stringify({channelId:f}),m={"Content-Type":"application/json"};document.cookie,p.token&&(m.Authorization=`Bearer ${p.token}`),fetch(`${_}/api/channel-info`,{method:"post",headers:m,body:v,credentials:"include"}).then(e=>{switch(e.status){case 400:return a.value="unsafe",null;case 403:return a.value="empty",null;case 404:return a.value="error",null;default:return e.json()}}).then(e=>{e.status.includes("429")&&(a.value="429"),e&&(a.value="valid",w.value=e.lastLiveId,k.value=e.name,g.value=e.deer,b.value=e.ecpay,r.value=I(e.lastLiveTime),window.setInterval(()=>{r.value=I(e.lastLiveTime)},1e3))})}catch(u){}};return D(()=>{d?S(l):a.value="unsafe"}),(f,u)=>(n(),s("div",R,[a.value?a.value==="valid"?(n(),s(N,{key:1},[o("div",z,[P,o("span",U,t(k.value),1),V]),o("div",E,[o("span",H,t(`${r.value[0]} 天 ${r.value[1]}時 `),1),o("span",J,t(`${r.value[2]}分 ${r.value[3]}秒`),1)]),o("div",Z,[$(l)?(n(),s("a",{key:0,href:`https://www.youtube.com/${$(l)}?sub_confirmation=1`,target:"_blank",rel:"nooppener noreferrer"},t(">> 關心主播"),8,q)):h("",!0),w.value?(n(),s("a",{key:1,href:`https://www.youtube.com/watch?v=${w.value}`,target:"_blank",rel:"nooppener noreferrer"},t(">> 緬懷主播"),8,G)):h("",!0),g.value?(n(),s("a",{key:2,class:"highlight",href:`https://deerdonate.herokuapp.com/donation/${g.value}`,target:"_blank",rel:"nooppener noreferrer"},t(">> 譴責主播"),8,K)):h("",!0),b.value?(n(),s("a",{key:3,class:"highlight",href:`https://p.ecpay.com.tw/${b.value}`,target:"_blank",rel:"nooppener noreferrer"},t(">> 譴責主播"),8,Q)):h("",!0)])],64)):a.value==="empty"?(n(),s("div",W,[o("span",X,t(k.value),1),Y])):a.value==="unsafe"?(n(),s("div",j,t("頻道 ID 錯誤"))):a.value==="error"?(n(),s("div",ee,t("錯誤發生"))):a.value==="429"?(n(),s("div",te,t("服務被封鎖中，暫時無法使用"))):h("",!0):(n(),s("div",A,"Checking..."))]))}},se=L(ae,[["__scopeId","data-v-1610af2b"]]);export{se as default};
