<template>
    <div class="menu-main">
        <fieldset>
            <legend>Coordinates:</legend>
            <input @change="changeLat" :value="latitude" name="latitude" type="number">
            <label for="latitude">Latitude</label>
            <input @change="changeLng"  :value="longitude" name="longitude" type="number">
            <label for="longitude">Longitude</label>
        </fieldset>
        <fieldset>
            <legend>Zoom:</legend>
            <input @change="changeZoom"  :value="zoom" min="0" max="18" name="zoom" type="number">
            <label for="zoom">Zoom</label>
        </fieldset>
        
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
      this.$store.dispatch("changeMain",["Lat", parseInt(e.target.value)] );
    },
    changeLng(e) {
      this.$store.dispatch("changeMain", ["Lng", parseInt(e.target.value)]);
    },
    changeZoom(e) {
      this.$store.dispatch("changeMain", ["zoom", parseInt(e.target.value)]);
    }
  }
};
</script>

<style lang="scss">
</style>
