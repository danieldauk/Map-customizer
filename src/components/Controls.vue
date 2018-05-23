<template>
    <div class="controls">
      <div class="control-sidebar">
          <div class="control-buttons">
            <button 
            :class="{active:(show===
            'appMain'? true:false)}"
            @click="show='appMain'"
            class="control-button"><i class="fas fa-compass"></i></button>
            <button 
            :class="{active:(show===
            'appStyles'? true:false)}"
            @click="show='appStyles'"
            class="control-button"><i class="fas fa-paint-brush"></i></button>
            <button 
            :class="{active:(show===
            'appPresets'? true:false)}"
            @click="show='appPresets'"
            class="control-button"><i class="fas fa-palette"></i></button>
            <button 
            :class="{active:(show===
            'appMarkers'? true:false)}"
            @click="show='appMarkers'"
            class="control-button"><i class="fas fa-map-marker-alt"></i></button>
         </div>
         <div class="control-logo">
           <h5>
             G<span class="red">o</span><span class="yellow">o</span>g<span class="green">l</span><span class="red">e</span> map customizer</h5>
         </div>
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
@import "../SASS/variables";

.controls {
  height: 100vh;
  display: grid;
  grid-template-columns: 50px auto;
  
}

.control-sidebar{
  background: $color-blue;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-rows: 200px auto;
  width: 50px;
}

.control-buttons{
  height: 200px;
  width:100%;
}

.control-button{
    color: $color-white;
    font-size: 25px;
    height: 50px;
    width:100%;
    background: none;
    border: none;
    cursor:pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba($color-white, 0.2);

    &:hover{
      background: $color-blue;
      filter: brightness(110%);
    }
    &:focus{
      outline: 0;
    }

  }

.active{
  background: $color-red;
  &:hover{
    filter: none;
    background: $color-red;
  }
}

.control-logo{
  width: 50px;
  height:100%;
  writing-mode: vertical-lr;
  text-orientation: sideways;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  h5{
    transform: rotate(180deg);
    font-size:20px;
    color: $color-white;
    margin: 12.5px 0;
    font-weight: 500;


    .red{
      color: $color-red;
    }
    .green{
      color: $color-green;
    }
    .yellow{
      color: $color-yellow;
    }
  }
}

.menu-enter {
  transform: translateX(calc(-100% - 50px));
}

.menu-enter-active {
  transition: 0.3s ease-in-out;


}

.menu-leave-active {
  transition: 0.3s ease-in-out;
  transform: translateX(calc(-100% - 50px));
}
</style>
