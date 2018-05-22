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
import markersCollection from "./Menu/Markers/markersCollection.js"
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
        markersCollection.forEach(element => {
          this.initMarkers(map, ...element);
        });
        /*this.initMarkers(map, ...markersCollection);
          map,
          54.687157,
          25.279651,
          "https://png.icons8.com/color/50/000000/html-5.png",
          "HTML5"
        );
        this.initMarkers(
          map,
          54.704342,
          25.280381,
          "https://png.icons8.com/ios/50/00d8ff/react-native.png",
          "React"
        );
        this.initMarkers(
          map,
          54.697157,
          25.269651,
          "https://png.icons8.com/ios/50/f7df1e/javascript-filled.png",
          "Javascript"
        );
        this.initMarkers(
          map,
          54.697157,
          25.299651,
          "https://png.icons8.com/color/50/000000/css3.png",
          "CSS3"
        );*/
        
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
    },
    initMarkers(map, lat, lng, iconUrl, title) {
      const markerOptions = {
        position: { lat: lat, lng: lng },
        icon: iconUrl,
        title: title,
        map: map,
        draggable: true,
        marker_id: Math.random()
      };
      // info for MarkersUnit component
      const markerInfo = {
        lat: lat,
        lng: lng,
        iconSrc: iconUrl,
        title: title
      };
 
      //create instance
      const marker = new google.maps.Marker(markerOptions);
  
      this.$store.dispatch("addMarker", {
        index: this.$store.state.markers.length,
        markerInfo: markerInfo,
        markerInstance: marker
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
  height: 100%;
  width: 100%;
}
</style>
