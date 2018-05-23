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
  data() {
    //save map instance to change map center on
    //main map center change
    return {
      savedMapInstance: ""
    };
  },
  computed: {
    name() {
      return `preset${this.index}`;
    },
    //
    centerChange() {
      return this.$store.state.coordinates.lat;
    },
    zoomChange(){
        return this.$store.state.zoom;
    }
  },
  watch: {
    centerChange: {
      handler() {

        this.savedMapInstance.setCenter({
          lat: this.$store.state.coordinates.lat,
          lng: this.$store.state.coordinates.lng
        });
      },
      deep: true
    },
    zoomChange(){
        this.savedMapInstance.setZoom(this.zoomChange);
    }
  },
  methods: {
    loadMap() {
      // Google map container
      const mapContainer = document.querySelector("#" + this.name);
      // Google map options object
      const options = {
        center: {
          lat: this.$store.state.coordinates.lat,
          lng: this.$store.state.coordinates.lng
        },
        zoom: this.$store.state.zoom,
        styles: this.unit[Object.keys(this.unit)[0]],
        draggable: false,
        disableDefaultUI: true
      };

      //Setting API key property of Google loader
      GoogleMapsLoader.key = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";

      //creating new instance of Google map
      GoogleMapsLoader.load(google => {
        const map = new google.maps.Map(mapContainer, options);
        this.savedMapInstance = map;
      });
    },
    changeStyle() {
      // make copy of object in order to 
      //delete only copy of styles in styles section
      const objCopy = Object.assign({}, this.unit);

      //dispatch action
      this.$store.dispatch("changeStyle", objCopy[Object.keys(objCopy)[0]]);
    }
  },
  mounted() {
    this.loadMap();
  }
};
</script>

<style lang="scss">
.preset-unit {
  width: 250px;
  height: 150px;
  cursor: pointer;
}
</style>
