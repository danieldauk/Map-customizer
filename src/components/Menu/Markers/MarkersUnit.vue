<template>
    <div class="markersUnit">
        <fieldset>
            <legend>Coordinates:</legend>
            <input 
            placeholder="Latitude"
            v-model="marker.lat"
            type="number" name="marker-latitude">
            <input 
            placeholder="Longitude"
            v-model="marker.lng"
            type="number" name="marker-longitude">
        </fieldset>
        <input 
        placeholder="Icon url"
        v-model="marker.iconSrc"
        type="url" name="marker-src">
        <label for="marker-src">Icon</label>
        <button 
        v-if="$store.state.markers.length === index"
         @click="addMarker">Add Marker</button>
         <button 
        v-if="$store.state.markers.length !== index"
         @click="changeMarker">Change Marker</button>
         <button 
        v-if="$store.state.markers.length !== index"
         @click="removeMarker">Remove Marker</button>

    </div>
</template>

<script>
//add markers with various Js frameworks
//and languages
//import google maps loader and set api key
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.key = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";


export default {
  props: ["index"],
  computed: {
    marker() {

      if (this.$store.state.markers.length === this.index) {
        return {
          lat: "",
          lng: "",
          iconSrc: "",
          title: "Hello"
        };
      } else {
        return this.$store.state.markers[this.index].markerInfo;
      }
    },
    markerInstance(){
      if (this.$store.state.markers.length === this.index){
        return ""
      } else {
        console.log("?");
        //add event listener to change coords at dragend

        //return markerInstance
        return this.$store.state.markers[this.index].markerInstance;
      }
    }
  },
  methods: {
    addMarker() {
      //creating new instance of Google Marker
      const latitude = parseFloat(this.marker.lat);
      const longitude = parseFloat(this.marker.lng);

      //change for icon url
      //if absent, add standard icon
        if(this.marker.iconSrc===""){
            this.marker.iconSrc="https://png.icons8.com/color/angularjs/32";
        }

      GoogleMapsLoader.load(google => {
        const marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          icon: this.marker.iconSrc,
          title: this.marker.title,
          map: this.$store.state.map,
          draggable: true,
          marker_id: Math.random()
        });

        //save instance for later use
        this.markerInstance = marker;

        //add event listener to change coords at dragend
        marker.addListener("dragend", this.changeCoord);

        this.$store.dispatch("addMarker", {
          index: this.index,
          markerInfo: this.marker,
          markerInstance: marker
        });
      });
    },
    changeCoord(){
      //after dragend read new coordiantes of marker
      const latitude = this.markerInstance.getPosition().lat();
      const longitude = this.markerInstance.getPosition().lng();

      //update computed property and change state
      this.marker.lat = latitude;
      this.marker.lng = longitude;
      this.changeMarker();
    },
    changeMarker() {
      console.log(this.index);
      //read coordinates input
      const latitude = parseFloat(this.marker.lat);
      const longitude = parseFloat(this.marker.lng);

      //change position of marker (instance stored in store)
      this.$store.state.markers[this.index].markerInstance.setPosition({ lat: latitude, lng: longitude });
      //change icon 
      this.$store.state.markers[this.index].markerInstance.setIcon(this.marker.iconSrc);


      this.$store.dispatch("addMarker", {
        index: this.index,
        markerInfo: this.marker,
        markerInstance: this.$store.state.markers[this.index].markerInstance
      });
    },
    removeMarker(){
      
      this.$store.dispatch("removeMarker", this.index)
    }
  },
  mounted(){
    if(this.markerInstance !== ""){
      this.$store.state.markers[this.index].markerInstance.addListener("dragend", this.changeCoord);
    }
  }
};
</script>

<style lang="scss">
</style>
