<template>
    <div class="controls">
        <app-styles></app-styles>
        <app-main></app-main>
    </div>
</template>

<script>
import Styles from "./menu/Styles/Styles";
import Markers from "./menu/Markers/Markers";
import Presets from "./menu/Presets/Presets";
import Main from "./menu/Main/Main";
export default {
  computed: {
    activeUnits() {
      return this.$store.state.styles.length+1;
    }
  },
  components: {
    appStyles: Styles,
    appMarkers: Markers,
    appPresets: Presets,
    appMain: Main,
  }
};
</script>


<style lang="scss">
</style>
