<template>
<div>
    <div class="map">

    </div>
</div>  
</template>


<script>
import GoogleMapsLoader from "google-maps";
export default {
  methods: {
    loadMap() {
      // Google map container
      const mapContainer = document.querySelector(".map");

      // Google map options object
      const options = {
        center: {
          lat: this.$store.state.coordinates.lat,
          lng: this.$store.state.coordinates.lng
        },
          zoom: this.$store.state.zoom,
          styles: this.$store.state.styles
      };

      //Setting API key property of Google loader
      GoogleMapsLoader.key = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";

      //creating new instance of Google map
      GoogleMapsLoader.load(google => {
        const map = new google.maps.Map(mapContainer, options);

        this.$store.dispatch("saveMap", map);
      });
    }
  },
  mounted() {
    this.loadMap();
  }
};
</script>


<style lang="scss">
.map {
  height: 500px;
  width: 500px;
}
</style>
