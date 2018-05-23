<template>
    <div class="custom-unit">
    <div class="custom-style-unit">
      <label for="featureType">featureType:</label>
      <select
      class="style-select"
       name="featureType" v-model="style.featureType">
        <option>all</option>
        <option>administrative</option>
        <option>administrative.country</option>
        <option>administrative.land_parcel</option>
        <option>administrative.locality</option>
        <option>administrative.neighborhood</option>
        <option>administrative.province</option>
        <option>landscape</option>
        <option>landscape.man_made</option>
        <option>landscape.natural</option>
        <option>landscape.natural.landcover</option>
        <option>landscape.natural.terrain</option>
        <option>poi</option>
        <option>poi.attraction</option>
        <option>poi.business</option>
        <option>poi.government</option>
        <option>poi.medical</option>
        <option>poi.park</option>
        <option>poi.place_of_worship</option>
        <option>poi.school</option>
        <option>poi.sports_complex</option>
        <option>road</option>
        <option>road.arterial</option>
        <option>road.highway</option>
        <option>road.highway.controlled_access</option>
        <option>road.local</option>
        <option>transit</option>
        <option>transit.line</option>
        <option>transit.station</option>
        <option>transit.station.airport</option>
        <option>transit.station.bus</option>
        <option>transit.station.rail</option>
        <option>water</option>
      </select>
    </div>
    <div class="custom-style-unit">
      <label for="elementType">elementType:</label>
      <select class="style-select" name="elementType" v-model="style.elementType">
        <option>all</option>
        <option>geometry</option>
        <option>geometry.fill</option>
        <option>geometry.stroke</option>
        <option>labels</option>
        <option>labels.icon</option>
        <option>labels.text</option>
        <option>labels.text</option>
        <option>labels.text.stroke</option>
      </select>
    </div>
    <div class="custom-style-unit">
      <label for="visibility">visibility:</label>
      <select 
      class="style-select" 
      name="visibility" v-model="style.stylers[0].visibility">
        <option>on</option>
        <option>off</option>
        <option>simplified</option>
      </select>
    </div>
    <div class="custom-style-unit">
      <label for="color">color:</label>
      <input name="color" v-model="style.stylers[1].color" type="color">
    </div>
    <div class="custom-style-unit">
      <label for="lightness">lightness:</label>
      <input
      placeholder="0"
       v-model="style.stylers[2].lightness" type="number" name="lightness" min="-100" max="100">
    </div>
    <div class="custom-style-unit">
      <label for="saturation">saturation:</label>
      <input 
      placeholder="0"
      v-model="style.stylers[3].saturation" type="number" name="saturation" min="-100" max="100">
    </div>

    <div class="custom-style-unit">
      <label for="weight">weight:</label>
      <input 
      placeholder="0"
      v-model="style.stylers[4].weight" type="number" name="weight" min="0">
    </div>
    <div class="custom-style-unit">
      <label for="hue">hue:</label>
      <input name="hue" v-model="style.stylers[5].hue" type="color">
    </div>
    <div v-if="this.$store.state.styles.length === this.index" class="custom-style-button">
      <button  @click="addStyle">Add Style
      </button>
      </div>
      <div v-if="this.$store.state.styles.length !== this.index" class="custom-style-buttons">
      <button v-if="this.$store.state.styles.length !== this.index" @click="addStyle">Change Style</button>
      <button  @click="removeStyle">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index"],
  computed: {
    style() {
      if (this.$store.state.styles.length === this.index) {
        return {
          featureType: "",
          elementType: "",
          stylers: [
            { visibility: "" },
            { color: "" },
            { lightness: "" },
            { saturation: "" },
            { weight: "" },
            { hue: "" }
          ]
        };
      } else {
        //loop through stylers array and correct order and  add default values

        const unitStyle = this.$store.state.styles[this.index];
        const newStylersOrder = [];
        const order = [
          "visibility",
          "color",
          "lightness",
          "saturation",
          "weight",
          "hue"
        ];
        for (let y = 0; y < order.length; y++) {
          for (let i = 0; i < unitStyle.stylers.length; i++) {
            if (unitStyle.stylers[i].hasOwnProperty(order[y])) {
              newStylersOrder[y] = unitStyle.stylers[i];
              break;
            }

            if (i === unitStyle.stylers.length - 1) {
              const obj = {};
              obj[order[y]] = "";
              newStylersOrder[y] = obj;
            }
          }
        }
        unitStyle.stylers = newStylersOrder;
        //return corrected style object
        return unitStyle;
      }
    }
  },
  methods: {
    addStyle() {
      this.$store.dispatch("addStyle", {
        index: this.index,
        style: this.style
      });
    },
    removeStyle() {
      this.$store.dispatch("removeStyle", this.index);
    }
  }
};
</script>


<style lang="scss">
@import "../../../SASS/variables";
.custom-unit {
  color: $color-grey-dark;
  margin: 0 10px 10px;
  display: grid;
  grid-template-rows: repeat(8, 25px) auto;
  grid-template-columns: auto;
  border: 1px solid rgba($color-grey-medium, 0.5);
  padding: 5px 10px;

  &:not(:last-child) {
    padding-top: 25px;
    position: relative;
  }
}

.custom-style-unit {
  display: grid;
  grid-template-columns: 100px auto;
  align-items: center;
}

input,
select {
  border: none;
  width: 100%;
  border-bottom: 1px solid rgba($color-grey-medium, 0.5);
}

.style-select {
  color: $color-grey-dark;
  cursor: pointer;
}

input[type="color"] {
  width: 100%;
  background: none;
  height: 100%;
  opacity: 0.5;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
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

    &:first-child {
      background: $color-blue;
      color: $color-white;
      border-radius: 5px;
      padding: 8px 15px;
      margin: 5px 0px;
      font-size: 15px;
    }
    &:last-child {
      display:flex;
      justify-content: center;
      align-content: center;
      height:18px;
      width:18px;
      color: $color-white;
      font-size: 25px;
      background: $color-red;
      position: absolute;
      border-radius: 2px;

      line-height: 0;
      top: 5px;
      right: 5px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
