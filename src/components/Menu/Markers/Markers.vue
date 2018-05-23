<template>
    <div class="markers">
      <div class="slide-title">Markers</div>
        <fieldset>
            <legend>Markers: </legend>
            <app-add-marker></app-add-marker>
            <app-markers-unit
            :key="unit.markerInstance.get('marker_id')"
            :index="index"
            v-for="(unit, index) in markersUnits"
            ></app-markers-unit>
        </fieldset>
    </div>
</template>

<script>

import MarkersUnit from "./MarkersUnit.vue";
import AddMarker from "./AddMarker.vue";
export default {
  
  computed: {
    markersUnits() {
      return this.$store.state.markers;
    }
  },
  components: {
    appMarkersUnit: MarkersUnit,
    appAddMarker: AddMarker
  }
};
</script>

<style lang="scss">

.markers{
  max-height: 100vh;
  overflow:auto;
}
</style>
