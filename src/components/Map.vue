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
  data() {
    return {
      savedMap: ""
    };
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

        //on google maps laod add event listener once
        //to listen for wheel events on google map
        // and update zoom in store state
        google.maps.event.addListenerOnce(
          map,
          "idle",
          addWheelListener.bind(this)
        );
        function addWheelListener() {
          document
            .querySelector(".map .gm-style div")
            .addEventListener("wheel", this.getZoom);
        }

        //prepopulate map with markers

        //options for google function custroctor
        const markerOptions = {
          position: { lat: 54.687157, lng: 25.279652 },
          icon: "https://png.icons8.com/color/angularjs/32",
          title: "Angular",
          map: map,
          draggable: true,
          marker_id: Math.random()
        };

        // info for MarkersUnit component
        const markerInfo = {
          lat: 54.687157,
          lng: 25.279652,
          iconSrc: "https://png.icons8.com/color/angularjs/32",
          title: "Angular"
        }

        const marker = new google.maps.Marker(markerOptions);
        console.log(marker);
        console.log(marker.get('marker_id'));
        this.$store.dispatch("addMarker", {
          index: 0,
          markerInfo: markerInfo,
          markerInstance: marker
        });
      });
    },
    //update center of map
    getCenter() {
      const lat = this.savedMap.getCenter().lat();
      const lng = this.savedMap.getCenter().lng();
      this.$store.dispatch("changeMain", ["Lat", lat]);
      this.$store.dispatch("changeMain", ["Lng", lng]);
    },
    //update zoom of map
    getZoom() {
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
