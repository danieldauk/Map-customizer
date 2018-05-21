<template>
    <div class="presets">
          <app-presets-unit
            :key="Math.random()*100"
            :index="index"
            :unit="unit"
            v-for="(unit, index) in presets"
            ></app-presets-unit>
    </div>
</template>

<script>

import PresetsUnit from "./PresetsUnit";
import presetCollection from "./presetCollection.js";
export default {
  computed: {
    presets() {
      return presetCollection;
    }
  },
  components: {
    appPresetsUnit: PresetsUnit
  }
};
</script>


<style lang="scss">
</style>