import{u as m,r,o as u,c as i,a as e,w as f,v,b as c,t,d as h}from"./main-993d5821.js";const x={class:"guide__wrapper d-flex f-center f-col w-100 h-100"},w=e("h1",null,t("你推多久沒開台了？"),-1),y={class:"d-flex f-center f-col"},g={class:"d-flex f-center m-top"},k=e("span",{class:"text-id"},t("頻道ID: "),-1),b={class:"text-hint"},I=e("a",{href:"https://www.youtube.com/@Kintsuai",target:"_blank",rel:"nooppener noreferrer"},t("@Kintsuai"),-1),V=e("a",{href:"https://www.youtube.com/@Suzuna_xx7",target:"_blank",rel:"nooppener noreferrer"},t("@Suzuna_xx7"),-1),C={key:0,class:"text-warn m-top"},B={__name:"Guide",setup(D){const _=m(),s=r(null),n=r(null),l=()=>{s.value=s.value.trim(),/@[0-9a-zA-Z\_\-\.]+$/gm.test(s.value)?_.push({name:"Channel",params:{channelId:s.value}}):n.value="ID格式有誤"},d=o=>{o.key==="Enter"&&l()};return(o,a)=>(u(),i("div",x,[w,e("div",y,[e("div",g,[k,f(e("input",{class:"m-1","onUpdate:modelValue":a[0]||(a[0]=p=>s.value=p),onInput:a[1]||(a[1]=()=>n.value=null),onKeypress:d},null,544),[[v,s.value]]),e("span",{class:"material-symbols-outlined icon-timer",onClick:l},"timer")]),e("span",b,[c(t("e.g. "),1),I,c(t(" or ")),V]),n.value?(u(),i("span",C,t(n.value),1)):h("",!0)])]))}};export{B as default};
