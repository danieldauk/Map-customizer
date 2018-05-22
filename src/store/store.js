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
    zoom: 14,
    markers: [],
    styles: []
  },
  getters: {},
  mutations: {
    addStyle(state, payload) {
      //if it's new style, push to array
      if (payload.index === state.styles.length) {
        state.styles.push(payload.style);
      } else {
        // else change existing one
        state.styles[payload.index] = payload.style;
      }
      //apply changes
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
    changeStyle(state, payload) {
        //update state
        state.styles = payload;

      //apply changes
      state.map.setOptions({
        center: {
          lat: state.coordinates.lat,
          lng: state.coordinates.lng
        },
        zoom: state.zoom,
        styles: payload
      });
    },
    changeMain(state, payload) {
      if (payload[0] === "Lat") {
        state.coordinates.lat = payload[1];
      } else if (payload[0] === "Lng") {
        state.coordinates.lng = payload[1];
      } else {
        state.zoom = payload[1];
      }

      //apply changes
      state.map.setOptions({
        center: {
          lat: state.coordinates.lat,
          lng: state.coordinates.lng
        },
        zoom: state.zoom,
        styles: state.styles
      });
    },
    removeStyle(state, payload) {
      state.styles.splice(payload, 1);

      //apply changes
      state.map.setOptions({
        center: {
          lat: state.coordinates.lat,
          lng: state.coordinates.lng
        },
        zoom: state.zoom,
        styles: state.styles
      });
    },
    addMarker(state, payload) {
      //if it's new marker, push to array
      if (payload.index === state.markers.length) {
        state.markers.push({
          markerInfo: payload.markerInfo,
          markerInstance: payload.markerInstance
        });

      } else {
        // else change existing one
        state.markers[payload.index] = {
          markerInfo: payload.markerInfo,
          markerInstance: payload.markerInstance
        };
      }
    },
    removeMarker(state, payload) {
      state.markers[payload].markerInstance.setMap(null);
      
      state.markers.splice(payload, 1);
    }
  },
  actions: {
    addStyle(context, payload) {
      context.commit("addStyle", payload);
    },
    saveMap(context, payload) {
      context.commit("saveMap", payload);
    },
    changeStyle(context, payload) {
        context.commit("changeStyle", payload);
      },
    changeMain(context, payload) {
      context.commit("changeMain", payload);
    },
    removeStyle(context, payload) {
      context.commit("removeStyle", payload);
    },
    addMarker(context, payload) {
      context.commit("addMarker", payload);
    },
    removeMarker(context, payload) {
      context.commit("removeMarker", payload);
    }
  }
});
