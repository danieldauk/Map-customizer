<template>
    <div class="markersUnit">
        <fieldset>
            <legend>Coordinates:</legend>
            <input 
            placeholder="Latitude"
            v-model="marker.lat"
            step="0.0001"
            type="number" name="marker-latitude">
            <input 
            step="0.0001"            
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
         @click="changeMarker">Change Marker</button>
         <button 
         @click="removeMarker">Remove Marker</button>

    </div>
</template>

<script>

export default {
  props: ["index"],
  computed: {
    marker() {
        return this.$store.state.markers[this.index].markerInfo;
    },
    markerInstance(){
        return this.$store.state.markers[this.index].markerInstance;
    }
  },
  methods: {
    changeCoord(){
      //after dragend read new coordiantes of marker
      const latitude = this.markerInstance.getPosition().lat();
      const longitude = this.markerInstance.getPosition().lng();

      //update computed property and change state
      this.marker.lat = latitude.toFixed(4);
      this.marker.lng = longitude.toFixed(4);
      this.changeMarker();
    },
    changeMarker() {
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
      this.$store.state.markers[this.index].markerInstance.addListener("dragend", this.changeCoord);
  }
};
</script>

<style lang="scss">
</style>
