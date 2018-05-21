<template>
<div
v-on:wheel="getZoom()">
  
    <div
      @mousedown="getCenter()"
      @mouseup="getCenter()"
     class="map">

    </div>
</div>  
</template>


<script>
import GoogleMapsLoader from "google-maps";
export default {
  data(){
    return{
      savedMap:""
    }
  },
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
        styles: this.$store.state.styles,
        disableDefaultUI: true
      };

      //Setting API key property of Google loader
      GoogleMapsLoader.key = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";

      //creating new instance of Google map
      GoogleMapsLoader.load(google => {
        const map = new google.maps.Map(mapContainer, options);
        this.savedMap = map;
        this.$store.dispatch("saveMap", map);
        console.log(document.querySelector(".map .gm-style"));

        //listen for wheel events on google map
        document.querySelector(".map .gm-style div").addEventListener("wheel", this.getZoom);
      });
    },
    //update center of map
    getCenter(){
      const lat = this.savedMap.getCenter().lat();
      const lng = this.savedMap.getCenter().lng();
      this.$store.dispatch("changeMain",["Lat", lat]);
      this.$store.dispatch("changeMain", ["Lng", lng]);
    },
      //update zoom of map
    getZoom(){
      console.log("yey");
      const zoom = this.savedMap.getZoom();
      this.$store.dispatch("changeMain", ["zoom", zoom]);
    }
  },
  mounted() {
    this.loadMap();
  }
};
</script>


<style lang="scss">
.map {
  height: 100%;
  width: 100%;
}
</style>
