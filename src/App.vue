<template>
  <div id="app">
    <form-main />
  </div>
</template>

<script>
import FormMain from "./views/Form-main";
export default {
  components: {
    FormMain,
  },
  name: "App",
};
</script>

<style lang="scss">
html {
  padding: 0;
}
body {
  background: #ebecf0;
  padding: 0;
  p {
    color: #61677c;
    text-shadow: 1px 1px 1px #fff;
    margin: 1rem / 1.5;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
