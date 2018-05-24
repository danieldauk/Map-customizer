<template>
    <div class="markersUnit">
      <div class="markers-unit-input">
        <label for="marker-latitude">Latitude</label>
        <input step="0.0001" placeholder="Latitude" v-model="marker.lat" type="number" name="marker-latitude">
      </div>
      <div class="markers-unit-input">
        <label for="marker-longitude">Longitude</label>
        <input step="0.0001" placeholder="Longitude" v-model="marker.lng" type="number" name="marker-longitude">

      </div>
      <div class="markers-unit-input">
        <label for="marker-src">Icon url</label>
        <input placeholder="Icon url" v-model="marker.iconSrc" type="url" name="marker-src">
      </div>

      <div class="markers-unit-input">
        <label for="marker-title">Marker title</label>
        <input placeholder="Marker title" v-model="marker.title" name="marker-title">
      

      </div>

      <div class="custom-style-button">
          <button  @click="addMarker">Add Marker</button> 
      </div>
      
  </div>
</template>

<script>
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";
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
      console.log(this.marker.lat);
      const latitude = parseFloat(parseFloat(this.marker.lat).toFixed(4));
      const longitude = parseFloat(parseFloat(this.marker.lng).toFixed(4));

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

<style lang="scss">
@import "../../../SASS/variables";

.markersUnit{
  display:grid;
   grid-template-rows: repeat(4, 25px) auto;
   border: 1px solid rgba($color-grey-medium, 0.5);
   align-items: end;
   padding: 5px 10px;
   margin-bottom: 10px;
   
   &:not(:first-child){
     padding-top: 25px;
    position: relative;
   }

   
}
.markers-unit-input{
  display:grid;
  grid-template-columns: 100px auto;
  align-items: end;

  color: $color-grey-dark;
  input{
   color: $color-grey-dark;
   width: 95%;
   border: none;
   -webkit-appearance: none;
   border-radius: 0;
   border-bottom: 1px solid rgba($color-grey-medium, 0.5);
  }
 
    padding-bottom: 5px;
  
  
}

@media(max-width: 800px){
  .markersUnit{
   
   &:not(:first-child){
     padding-top: 35px;
   }

   
}
}
</style>
