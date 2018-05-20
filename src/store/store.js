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
    styles: [
      {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 65
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": "50"
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": "30"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": "40"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ffff00"
              },
              {
                  "lightness": -25
              },
              {
                  "saturation": -97
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "lightness": -25
              },
              {
                  "saturation": -100
              }
          ]
      }
  ]
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
      console.log(state.styles);
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
    removeStyle(state,payload){
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
    },
    removeStyle(context, payload) {
      context.commit("removeStyle", payload);
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
