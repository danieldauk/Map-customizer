import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    map: "",
    coordinates: {
      lat: 54.687157,
      lng: 25.279652
    },
    zoom: 8,
    markers: [],
    styles: []
  },
  getters: {},
  mutations: {
    addStyle(state, payload) {
      state.styles.push(payload);
      state.map.setOptions({
        center: {
          lat: state.coordinates.lat,
          lng: state.coordinates.lng
        },
        zoom: state.zoom,
        styles: state.styles
      });
    },
    saveMap(state, payload) {
      state.map = payload;
    },
    changeMain(state, payload) {
      if (payload[0] === "Lat") {
        state.coordinates.lat = payload[1];
      } else if (payload[0] === "Lng") {
        state.coordinates.lng = payload[1];
      } else {
        state.zoom = payload[1];
      }
      state.map.setOptions({
        center: {
          lat: state.coordinates.lat,
          lng: state.coordinates.lng
        },
        zoom: state.zoom,
        styles: state.styles
      });
    }
  },
  actions: {
    addStyle(context, payload) {
      context.commit("addStyle", payload);
    },
    saveMap(context, payload) {
      context.commit("saveMap", payload);
    },
    changeMain(context, payload) {
      context.commit("changeMain", payload);
    }
  }
});

/*
{
    "featureType":"",
    "stylers":[
        {"color": ""},
        {"visibility": ""}
    ]
}
*/
