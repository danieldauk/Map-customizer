<template>
    <div class="controls">
        <app-menu-styles></app-menu-styles>
        <app-menu-main></app-menu-main>
    </div>
</template>

<script>
import MenuStyles from "./MenuStyles";
import MenuMarkers from "./MenuMarkers";
import MenuPresets from "./MenuPresets";
import MenuMain from "./MenuMain";
export default {
  computed: {
    activeUnits() {
      return this.$store.state.styles.length+1;
    }
  },
  components: {
    appMenuStyles: MenuStyles,
    appMenuMarkers: MenuMarkers,
    appMenuPresets: MenuPresets,
    appMenuMain: MenuMain,
  }
};
</script>


<style lang="scss">
</style>
