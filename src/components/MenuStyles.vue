<template>
    <div class="styles">
        <app-style-unit
        v-for="unit in activeUnits"
        ></app-style-unit>
    </div>
</template>

<script>
import StyleUnit from "./StyleUnit";
export default {
  computed: {
    activeUnits() {
      return this.$store.state.styles.length+1;
    }
  },
  components: {
    appStyleUnit: StyleUnit
  }
};
</script>


<style lang="scss">
</style>
