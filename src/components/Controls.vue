<template>
    <div class="controls">
      <div class="controls-buttons">
        <button 
        @click="show='appMain'"
        class="control-button">Main</button>
        <button 
        @click="show='appStyles'"
        class="control-button">Styles</button>
        <button 
        @click="show='appPresets'"
        class="control-button">Presets</button>
        <button 
        @click="show='appMarkers'"
        class="control-button">Markers</button>
      </div>
      <transition name="menu" mode="out-in">
        <keep-alive>
          <component :is="show"></component>
        </keep-alive>
      </transition> 
    </div>
</template>

<script>
import Styles from "./menu/Styles/Styles";
import Markers from "./menu/Markers/Markers";
import Presets from "./menu/Presets/Presets";
import Main from "./menu/Main/Main";
export default {
  data() {
    return {
      show: "appMain"
    };
  },
  computed: {
    activeUnits() {
      return this.$store.state.styles.length + 1;
    }
  },
  components: {
    appStyles: Styles,
    appMarkers: Markers,
    appPresets: Presets,
    appMain: Main
  }
};
</script>


<style lang="scss">
.controls {
  height: 100vh;
}

.menu-enter {
  transform: translateX(-100%);
}

.menu-enter-active {
  transition: 0.3s ease-in-out;
}

.menu-leave-active {
  transition: 0.3s ease-in-out;
  transform: translateX(-100%);
}
</style>
