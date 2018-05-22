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
        <label for="marker-src">Icon url</label>
        <input 
        placeholder="Marker title"
        v-model="marker.title"
        type="url" name="marker-title">
        <label for="marker-title">Marker title</label>
        
        <button 
         @click="addMarker">Add Marker</button>
    </div>
</template>

<script>
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.key = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";
export default {
  data() {
    return {
      marker: {
        lat: "",
        lng: "",
        iconSrc: "",
        title: ""
      }
    };
  },
  methods: {
    addMarker() {
        //if fields are empty
        if(this.marker.lat === "" || this.marker.lng ===""){
            return false;
        }
      //creating new instance of Google Marker
      const latitude = parseFloat(this.marker.lat);
      const longitude = parseFloat(this.marker.lng);

      //change for icon url
      //if absent, add standard icon
      if (this.marker.iconSrc === "") {
        this.marker.iconSrc = "https://png.icons8.com/color/marker/32";
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

        this.$store.dispatch("addMarker", {
          index: this.$store.state.markers.length,
          markerInfo: this.marker,
          markerInstance: marker
        });


      });

      this.marker = {
        lat: "",
        lng: "",
        iconSrc: "",
        title: ""
      }
    }
  }
};
</script>
