<template>
    <div class="styles">
      <div class="slide-title">Styles</div>
          <div class="styles-column-reverse">
          <app-style-unit
            :key="Math.random()"
            :index="index"
            v-for="(unit, index) in activeUnits"
            ></app-style-unit>
          </div>
        
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
.styles {
  max-height: 100vh;
  overflow: auto;
}

.styles-column-reverse {
  display: flex;
  flex-direction: column-reverse;
}

@media (max-width: 800px) {
  .styles {
    max-height: 100%;
  }
}
</style>
