<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
export default {
  name: 'ContinentMap',
  props: {
    continent: {
      type: String,
      default: 'World'
    }
  },
  data() {
    return {
      map: null,
      continentArea: {
        'Asia-Pacific': { center: { lat: 25.0, lng: 115.0 }, zoom: 3 },
        'Africa': { center: { lat: 5.0, lng: 20.0 }, zoom: 3 },
        'America': { center: { lat: 15.0, lng: -90.0 }, zoom: 3 },
        'Europe': { center: { lat: 50.0, lng: 15.0 }, zoom: 4 },
        'World': { center: { lat: 20.0, lng: 0.0 }, zoom: 2 }
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
  },
  watch: {
    continent(newContinent) {
      if (this.map) {
        const view = this.continentArea[newContinent] || this.continentArea['World'];
        this.map.setCenter(view.center);
        this.map.setZoom(view.zoom);
      }
    }
  },
  methods: {
    initMap() {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API não carregada');
        return;
      }

      const view = this.continentArea[this.continent] || this.continentArea['World'];
      
      this.map = new window.google.maps.Map(this.$refs.mapContainer, {
        center: view.center,
        zoom: view.zoom,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        gestureHandling: 'greedy'
      });
    }
  }
};
</script>

<style scoped>
.map-container {
  width: 40%;
  height: 70vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow);
}
</style>