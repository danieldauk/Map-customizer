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
        <select name="elementType" v-model="style.featureType">
            <option>all</option>
            <option>administrative</option>
            <option>landscape</option>
            <option>poi</option>
            <option>road</option>
            <option>transit</option>
            <option>water</option>
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
//add props to access starting information from store
//add elementType
export default {
  data() {
    return {
      style: {
        featureType: "all",
        elementType: "",
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
