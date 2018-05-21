<template>
    <div class="styles">
      <fieldset>
          <legend>Styles:</legend>
          <app-style-unit
            :key="Math.random()"
            :index="index"
            v-for="(unit, index) in activeUnits"
            ></app-style-unit>
          </fieldset>
        
    </div>
</template>

<script>
import StyleUnit from "./StyleUnit";
export default {
  computed: {
    activeUnits() {
      return this.$store.state.styles.length + 1;
    }
  },
  components: {
    appStyleUnit: StyleUnit
  }
};
</script>


<style lang="scss">
</style>
