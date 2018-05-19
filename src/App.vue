<template>
<div>
  <app-controls></app-controls>
  <app-map></app-map>
</div>
</template>

<script>
  import Map from "./components/Map.vue"
  import Controls from "./components/Controls.vue"
  export default {
    components:{
      appMap: Map,
      appControls: Controls
    }
  }
</script>

