<template>
  <div
  class="preset-map-container"
  :class="{activePreset: activePresetCond}"
  @click="changeStyle">
    <div 
    class="preset-map" :id="name">
    </div>
    <div class="map-name">{{mapName}}</div>
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
    activePresetCond() {
      if (Object.keys(this.unit)[0] === this.$store.state.activePreset) {
        return true;
      } else {
        return false;
      }
    },
    mapName() {
      //change camelCase name to Sentence Case name
      const text = Object.keys(this.unit)[0];
      const splitText = text.replace(/([A-Z])/g, " $1");
      const result = splitText.charAt(0).toUpperCase() + splitText.slice(1);
      return result;
    },
    centerChange() {
      return this.$store.state.coordinates.lat;
    },
    zoomChange() {
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
    zoomChange() {
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
      GoogleMapsLoader.KEY = "AIzaSyD5REs3jCVewYEstPogCmQ2UfGemY-z5lg";

      //creating new instance of Google map
      GoogleMapsLoader.load(google => {
        const map = new google.maps.Map(mapContainer, options);
        this.savedMapInstance = map;
      });
    },
    changeStyle() {
      // make copy of array in order to
      //delete only copy of styles in styles section
      //dispatch action
      this.$store.dispatch(
        "changeStyle",
        this.unit[Object.keys(this.unit)[0]].slice()
      );

      //set active preset
      this.$store.dispatch("setActivePreset", Object.keys(this.unit)[0]);
    }
  },
  mounted() {
    this.loadMap();
  }
};
</script>

<style lang="scss">
@import "../../../SASS/variables";
.preset-map-container {
  margin: 0 20px 20px 20px;
  transition: 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba($color-black, 0.3);

    .map-name {
      height: 30px;
    }
  }
}

.activePreset {
  transform: scale(1.08);
  box-shadow: 0 5px 15px rgba($color-black, 0.3);
  &:hover {
    transform: scale(1.08);
  }
  .map-name {
    height: 30px;
    background: $color-green;
  }
}

.preset-map {
  width: 100%;
  height: 150px;
  cursor: pointer;
}

.map-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: $color-white;
  background: $color-blue;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0px;
  overflow: hidden;
}

@media (max-width: 800px) {
  .preset-map-container {
    .map-name {
      height: 30px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  .activePreset {
    &:hover {
      transform: scale(1.08);
      box-shadow: 0 5px 15px rgba($color-black, 0.3);
    }
  }
}
</style>
