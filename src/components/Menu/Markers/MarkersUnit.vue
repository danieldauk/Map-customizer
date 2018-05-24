<template>
    <div class="markersUnit">
    <div class="markers-unit-input">
      <label for="marker-latitude">Latitude</label>
      <input placeholder="Latitude" v-model="marker.lat" step="0.0001" type="number" name="marker-latitude">
    </div>
    <div class="markers-unit-input">
      <label for="marker-longitude">Longitude</label>
      <input step="0.0001" placeholder="Longitude" v-model="marker.lng" type="number" name="marker-longitude">
    </div>
    <div class="markers-unit-input icon">
      <label for="marker-src">Icon url</label>
      <input placeholder="Icon url" v-model="marker.iconSrc" type="url" name="marker-src">
      <div class="icon-preview" >
        <img :src="marker.iconSrc">
      </div>
      
    </div>
    <div class="markers-unit-input">
      <label for="marker-title">Marker title</label>
      <input placeholder="Marker title" v-model="marker.title" type="url" name="marker-title">

    </div>
    <div class="custom-style-buttons">
      <button class="add-style" @click="changeMarker">Change Marker</button>
      <div>
          <button 
          @click="removeAllMarkers"
          class="clear-all">clear all</button>
          <button  @click="removeMarker"><i class="fas fa-times"></i></button>
      </div>
      </div>

  </div>
</template>

<script>
export default {
  props: ["index"],
  computed: {
    marker() {
      return this.$store.state.markers[this.index].markerInfo;
    },
    markerInstance() {
      return this.$store.state.markers[this.index].markerInstance;
    }
  },
  methods: {
    changeCoord() {
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
      this.$store.state.markers[this.index].markerInstance.setPosition({
        lat: latitude,
        lng: longitude
      });
      //change icon
      this.$store.state.markers[this.index].markerInstance.setIcon(
        this.marker.iconSrc
      );

      this.$store.dispatch("addMarker", {
        index: this.index,
        markerInfo: this.marker,
        markerInstance: this.$store.state.markers[this.index].markerInstance
      });
    },
    removeMarker() {
      this.$store.dispatch("removeMarker", this.index);
    },
    removeAllMarkers(){
      this.$store.dispatch("removeAllMarkers");
    }
  },
  mounted() {
    this.$store.state.markers[this.index].markerInstance.addListener(
      "dragend",
      this.changeCoord
    );
  }
};
</script>

<style lang="scss">
@import "../../../SASS/variables";
.icon {
  grid-template-columns: 100px auto 30px;
}

.icon-preview {
  display:flex;
  justify-content: flex-end;
  align-items: center;
  height: 20px;
  img{
    height: 100%;
    display:block;
  }
}

.custom-style-button {
  display: flex;
  justify-content: center;
  button {
    background: $color-green;
    color: $color-white;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    margin: 5px 0px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 3px 10px rgba($color-black, 0.3);
      outline: 0;
    }
    &:active {
      transform: scale(1.02);
      box-shadow: 0 1px 5px rgba($color-black, 0.3);
    }
  }
}

.custom-style-buttons {
  display: flex;
  justify-content: center;

  div {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 85px;
    height: 18px;
    &:hover .clear-all {
      width: 60px;
      right: 25px;
    }
    button {
      &:last-child {
        display: flex;
        justify-content: center;
        align-content: center;
        height: 18px;
        width: 18px;
        color: $color-white;
        background: $color-red;
        border-radius: 2px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        .fa-times{
          font-size: 11px;
        }
      }
    }
  }

  .clear-all {
    position: absolute;
    margin: 0;
    padding: 0;
    top: 0;
    right: 0;
    height: 18px;
    width: 0;
    z-index: 1;
    transition: 0.2s;
    overflow: hidden;
    color: $color-white;
    border-radius: 2px;
    font-weight: 700;

    &:hover {
      background: $color-red;

    }
  }

  button {
    border: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 3px 10px rgba($color-black, 0.3);
      outline: 0;
    }
    &:active {
      transform: scale(1.02);
      box-shadow: 0 1px 5px rgba($color-black, 0.3);
    }
  }
}

.add-style {
  background: $color-blue;
  color: $color-white;
  border-radius: 5px;
  padding: 8px 15px;
  margin: 5px 0px;
  font-size: 15px;
}

@media(max-width: 800px){
 
  .custom-style-buttons {

    div {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 85px;
      height: 18px;
      width: 100%;
      .clear-all {
        width: 60px;
        left: 10px;
        background: $color-red;
      }
    }
  }
}
</style>
