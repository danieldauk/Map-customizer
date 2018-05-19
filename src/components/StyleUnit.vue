<template>
    <div class="custom-unit">
        <select name="featureType" v-model="style.featureType">
            <option>all</option>
            <option>administrative</option>
            <option>landscape</option>
            <option>poi</option>
            <option>road</option>
            <option>transit</option>
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
        </select>
        <input v-model="style.stylers[1].color" type="color">
        <button @click="addStyle">add Style</button>
    </div>
</template>

<script>
//add index as props to access starting information from store
//to be used later with presets
// push method when clicking on addStyle on different unit??
export default {
  data() {
    return {
      style: {
        featureType: "all",
        elementType: "all",
        stylers: [{ visibility: "on" }, { color: "#ffffff" }]
      }
    };
  },
  methods: {
    addStyle() {
      this.$store.dispatch("addStyle", this.style);
    }
  }
};
</script>


<style lang="scss">
</style>
