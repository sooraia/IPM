<script>
export default {
  name: "MapView",
  props: {
    markers: {
      type: Array,
    },
    cityName: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      map: null,
      pins: [],
      cityDefaults: {
        'Porto': { lat: 41.1579, lng: -8.6291, zoom: 12 },
        'Tokyo': { lat: 35.6762, lng: 139.6503, zoom: 11 },
        'Hawaii': { lat: 21.3099, lng: -157.8581, zoom: 10 },
        'CapeTown': { lat: -33.9249, lng: 18.4241, zoom: 11 },
      }
    };
  },
  mounted() {
    if (window.google && window.google.maps) {
      this.initMap();
    } else {
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          this.initMap();
        }
      }, 100);
    }
  },
  beforeUnmount() {
    this.map = null;
    this.clearMarkers();
  },
  watch: {
    markers: {
      handler() {
        if (this.map) {
          this.clearMarkers();
          this.addMarkers();
        }
      },
      deep: true,
    }
  },
  methods: {
    getCityDefaults() {
      return this.cityDefaults[this.cityName] || { lat: 0, lng: 0, zoom: 2 };
    },

    initMap() {
      const defaults = this.getCityDefaults();
      
      this.map = new window.google.maps.Map(this.$refs.mapContainer, {
        center: { lat: defaults.lat, lng: defaults.lng },
        zoom: defaults.zoom,
        mapTypeId: "roadmap",
      });

      this.addMarkers();
    },

    getMarkerColor(estimatedOccupancy) {
      if (estimatedOccupancy > 300) {
        return '#FF2E39';
      }
      return '#F2902F';
    },

    addMarkers() {
      this.markers.forEach((markerData) => {
        const markerColor = this.getMarkerColor(markerData.estimated_occupancy);

        const svgMarker = {
          path: "M64 1C38.8 1 18.3 21.2 18.3 46S64 127 64 127s45.7-56.2 45.7-81S89.2 1 64 1zm0 73.9c-16.6 0-30-13.2-30-29.5C34 29 47.4 15.8 64 15.8S94 29 94 45.3 80.6 74.9 64 74.9z",
          fillColor: markerColor,
          fillOpacity: 1,
          strokeWeight: 0,
          rotation: 0,
          scale: 0.2,
        };
        const marker = new window.google.maps.Marker({
          position: { lat: markerData.latitude, lng: markerData.longitude },
          icon: svgMarker,
          map: this.map,
        });
        this.pins.push(marker);

        if (markerData.infoContent) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: markerData.infoContent,
          });

          marker.addListener("click", () => {
            infoWindow.open(this.map, marker);
          });
        }
      });

      if (this.pins.length > 1) {
        this.fitMapToMarkers();
      } else if (this.pins.length === 0) {
          const defaults = this.getCityDefaults();
          this.map.setCenter({ lat: defaults.lat, lng: defaults.lng });
          this.map.setZoom(defaults.zoom);
      }
    },

    clearMarkers() {
      this.pins.forEach((marker) => {
        marker.setMap(null);
      });
      this.pins = [];
    },

    fitMapToMarkers() {
      const bounds = new window.google.maps.LatLngBounds();
      this.pins.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      this.map.fitBounds(bounds);
      const listener = window.google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
        if (this.map.getZoom() > 15) {
          this.map.setZoom(15);
        }
      });
    }
  },
};
</script>

<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

</style>
