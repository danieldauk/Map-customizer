<template>
<div>
  <button @click="loadMap">Reload</button>
    <div class="map">

    </div>
</div>  
</template>


<script>
import GoogleMapsLoader from "google-maps";
export default {
  computed: {},
  methods: {
    loadMap(myStyles, coordinates, markers) {
      // Google map container 
      const mapContainer = document.querySelector(".map");

      // Google map options object
      const options = {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        styles: myStyles
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
