<template>
    <div class="menu-main">
        <div class="slide-title">Main</div>

              <div class="main-input-container">
                  <label 
                  class="main-label"
                  for="latitude">Latitude:</label>
                  <input 
                  step="0.0001"
                  class="main-input" @input="changeLat" :value="latitude" name="latitude" type="number">
              </div>
              <div class="main-input-container">
                <label 
                class="main-label"
                for="longitude">Longitude:</label>
                <input 
                step="0.0001"
                class="main-input" 
                @input="changeLng"  :value="longitude" name="longitude" type="number">
              </div>
              <div class="main-input-container">
                <label 
                class="main-label"
                for="zoom">Zoom:</label>
                <input 
                class="main-input" 
                @input="changeZoom"  :value="zoom" min="0" max="18" name="zoom" type="number">
              </div>
    </div>
</template>

<script>
export default {
  computed: {
    latitude() {
      return this.$store.state.coordinates.lat;
    },
    longitude() {
      return this.$store.state.coordinates.lng;
    },
    zoom() {
      return this.$store.state.zoom;
    }
  },
  methods: {
    changeLat(e) {
      this.$store.dispatch("changeMain", ["Lat", parseFloat(e.target.value)]);
    },
    changeLng(e) {
      this.$store.dispatch("changeMain", ["Lng", parseFloat(e.target.value)]);
    },
    changeZoom(e) {
      this.$store.dispatch("changeMain", ["zoom", parseFloat(e.target.value)]);
    }
  }
};
</script>

<style lang="scss">
@import "../../../SASS/variables";
.menu-main {
  max-height: 100vh;
  overflow: auto;
}

.slide-title {
  color: $color-grey-medium;
  border-bottom: 1px solid rgba($color-grey-medium, 0.5);
  margin: 0 10px 10px 10px;
  font-size: 25px;
  height: 49px;
  display: flex;
  align-items: flex-end;
}

.main-input-container{
  display:grid;
  height:50px;
  grid-template-columns: 100px auto;
  align-items: center;
  border-bottom: 1px solid rgba($color-grey-medium, 0.5);
  margin: 0 10px;
}

.main-input {
  border: none;
  width: 100%;
  font-size: 20px;
  transition: 0.2s;
  color:$color-grey-dark;
  
  &:focus{
    transform:scale(1.05);
    outline: 0;
  }
}

.main-label {
  margin-right: 10px;
  font-size: 18px;
  color: $color-grey-medium;
}
</style>
