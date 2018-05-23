<template>
<div class="myApp">
  <app-controls></app-controls>
  <app-map></app-map>
</div>
</template>

<script>
import Map from "./components/Map.vue";
import Controls from "./components/Controls.vue";
export default {
  components: {
    appMap: Map,
    appControls: Controls
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  outline: 0;
}

.myApp{
  display: grid;
  grid-template-columns: 400px auto;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>


