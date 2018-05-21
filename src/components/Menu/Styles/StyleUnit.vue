<template>
    <div class="custom-unit">
        <select name="featureType" v-model="style.featureType">
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
        <select name="elementType" v-model="style.elementType">
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
        <select name="visibility"
         v-model="style.stylers[0].visibility">
            <option>on</option>
            <option>off</option>
            <option>simplified</option>
        </select>
        <input v-model="style.stylers[1].color" type="color">
        <input v-model="style.stylers[2].lightness" type="number" name="lightness" min="-100" max="100">
        <input v-model="style.stylers[3].saturation" type="number" name="saturation" min="-100" max="100">
        <input v-model="style.stylers[4].weight" type="number" name="weight" min="0">
        <input v-model="style.stylers[5].hue" type="color">
        <button 
        v-if="this.$store.state.styles.length === this.index" @click="addStyle">Add Style
        </button>
        <button 
        v-if="this.$store.state.styles.length !== this.index"
        @click="addStyle">Change Style</button>
        <button 
        v-if="this.$store.state.styles.length !== this.index"
        @click="removeStyle">Remove Style</button>
    </div>
</template>

<script>

export default {
  props: ["index"],
  computed: {
    style() {
      if (this.$store.state.styles.length === this.index) {
        return {
          featureType: "all",
          elementType: "all",
          stylers: [
            { visibility: "" }, 
            { color: "" },
            { lightness: 0 },
            { saturation: 0 },
            { weight: 0 },
            { hue: "" }
            ]
        };
      } else {
        
        //loop through stylers array and correct order and  add default values

        const unitStyle = this.$store.state.styles[this.index];
        const newStylersOrder = [];
        const order = ["visibility", "color", "lightness", "saturation", "weight", "hue"];
        for(let y =0; y<order.length; y++){
          for(let i = 0; i<unitStyle.stylers.length; i++){
            if(unitStyle.stylers[i].hasOwnProperty(order[y])){
              newStylersOrder[y] = unitStyle.stylers[i];
              break;
            }

            if(i===unitStyle.stylers.length-1){
              const obj = {}
              obj[order[y]] = "";
              newStylersOrder[y] = obj;
            }
          }
        }
        unitStyle.stylers = newStylersOrder;
        //return corrected style object
        return  unitStyle;
      }
    }
  },
  methods: {
    addStyle() {
      this.$store.dispatch("addStyle", {index:this.index, style:this.style});
    },
    removeStyle(){
      this.$store.dispatch("removeStyle", this.index);
    }
  }
};
</script>


<style lang="scss">


</style>
