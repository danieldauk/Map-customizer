<template>
    <div class="markers">
        <fieldset>
            <legend>Markers: </legend>
            <app-markers-unit
            :key="Math.random()*10"
            :index="index"
            v-for="(unit, index) in markersUnits"
            ></app-markers-unit>
        </fieldset>
    </div>
</template>

<script>

import MarkersUnit from "./MarkersUnit.vue";
export default {
  computed: {
    markersUnits() {
      return this.$store.state.markers.length + 1;
    }
  },
  components: {
    appMarkersUnit: MarkersUnit
  }
};
</script>

<style lang="scss">
</style>
