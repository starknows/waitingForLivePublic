import{f as O,r as l,g as M,o as h,c as _,F as N,a as n,t as s,h as w,e as y,p as B,i as F}from"./index-46bc9306.js";const T=(o,p)=>{const a=o.__vccOpts||o;for(const[r,i]of p)a[r]=i;return a},b=o=>(B("data-v-86db3acf"),o=o(),F(),o),D={class:"channel__wrapper d-flex f-center f-col w-100 h-100"},z={class:"channel__info m-bottom"},A=b(()=>n("span",null,s("距離 "),-1)),J={class:"channel-name"},L=b(()=>n("span",null,s(" 上次開台已經過了"),-1)),V={class:"channel__time"},E={class:"channel__time-text m-bottom"},H={class:"channel__time-text"},R={class:"channel__care d-flex f-center m-top"},Z=["href"],j=["href"],q={key:1,class:"checking-text"},G={__name:"Channel",setup(o){const a=O().params.channelId,r=l(null),i=l(""),g=/@[0-9a-zA-Z\_\-\.]+$/gm.test(a),k=l(null),f=l(!0),c=l(null),m=d=>{const t=new Date-new Date(d),u=Math.floor(t/864e5),e=t%864e5,I=Math.floor(e/36e5),v=e%36e5,S=Math.floor(v/6e4),$=v%6e4,C=Math.floor($/1e3);return[u,I,S,C]},x=async d=>{g&&fetch("https://service-starknows.onrender.com/auth",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"wuxu",password:"755ec607-b660-402d-b70e-458d2a3a05cc"})}).then(t=>t.json()).then(t=>{const u=JSON.stringify({channelId:d});k.value=t.token,fetch("https://service-starknows.onrender.com/api/last-stream",{method:"post",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"},body:u}).then(e=>e.json()).then(e=>{console.log("last-stream: ",e),f.value=!1,r.value=e.lastLiveId,c.value=m(e.data),window.setInterval(()=>{c.value=m(e.data)},1e3)}),fetch("https://service-starknows.onrender.com/api/channel-name",{method:"post",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"},body:u}).then(e=>e.json()).then(e=>{console.log("channel-name: ",e),i.value=e.data})}).catch(t=>{console.log(t)})};return M(()=>{x(a)}),(d,t)=>(h(),_("div",D,[f.value?(h(),_("div",q,"Checking...")):(h(),_(N,{key:0},[n("div",z,[A,n("span",J,s(i.value),1),L]),n("div",V,[n("span",E,s(`${c.value[0]} 天 ${c.value[1]}時 `),1),n("span",H,s(`${c.value[2]}分 ${c.value[3]}秒`),1)]),n("div",R,[w(a)?(h(),_("a",{key:0,href:`https://www.youtube.com/${w(a)}?sub_confirmation=1`,target:"_blank",rel:"nooppener noreferrer"},s(">> 關心主播"),8,Z)):y("",!0),r.value?(h(),_("a",{key:1,href:`https://www.youtube.com/watch?v=${r.value}`,target:"_blank",rel:"nooppener noreferrer"},s(">> 緬懷主播"),8,j)):y("",!0)])],64))]))}},P=T(G,[["__scopeId","data-v-86db3acf"]]);export{P as default};
