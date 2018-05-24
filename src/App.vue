<template>
<div class="myApp">
  <app-controls></app-controls>
  <app-map class="app-map"></app-map>
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
@import "../src/SASS/variables";
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  outline: 0;
}

::-webkit-scrollbar {
    width: 10px;
}
 
::-webkit-scrollbar-track {
    background:$color-grey-light;
}
 
::-webkit-scrollbar-thumb {
    background: $color-grey-light2;
}

.myApp{
  display: grid;
  grid-template-columns: 400px auto;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

@media(max-width: 800px){
  .myApp{
  grid-template-columns: auto;
  grid-auto-rows: 250px auto;

  }

  .app-map{
    grid-row: 1 / 2;
  }
}
</style>


