<template>
    <div 
    @click="changeStyle"
    class="preset-unit" :id="name">

    </div>
</template>

<script>
import GoogleMapsLoader from "google-maps";
export default {
  props: ["index", "unit"],
  computed:{
      name(){
          return `preset${this.index}`
      }
  },
  methods: {
    loadMap() {
      // Google map container
      const mapContainer = document.querySelector("#"+this.name);
      // Google map options object
      const options = {
        center: {
          lat: this.$store.state.coordinates.lat,
          lng: this.$store.state.coordinates.lng
        },
          zoom: this.$store.state.zoom,
          styles: this.unit[Object.keys(this.unit)[0]]
      };

      //Setting API key property of Google loader
      GoogleMapsLoader.key = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";

      //creating new instance of Google map
      GoogleMapsLoader.load(google => {
        const map = new google.maps.Map(mapContainer, options);

      });
    },
    changeStyle(){
        this.$store.dispatch("changeStyle", this.unit[Object.keys(this.unit)[0]]);
    }
  },
  mounted() {
    this.loadMap();
  }
}
</script>

<style lang="scss">
 .preset-unit{
     width: 250px;
     height: 150px;
 }
</style>
