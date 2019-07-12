<template>
  <div>
    <div class="gradient" />
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: rgb(51, 51, 51);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    0deg,
    rgba(51, 51, 51, 1) 0%,
    rgba(17, 58, 65, 1) 70%
  );

  z-index: -1;
}
</style>
