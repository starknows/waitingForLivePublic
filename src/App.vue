<template lang="pug">
.author-wrapper.d-flex.f-col
  a(href="https://twitter.com/starknows99" target="_blank" rel="nooppener noreferrer") Starknows 2023
RouterView
</template>

<script setup></script>
<style lang="sass">
#app
  position: relative
  width: 100%
  height: 100vh
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
  & > a
    color: inherit
    text-decoration: none
</style>
