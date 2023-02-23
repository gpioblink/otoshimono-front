<template>
  <GoogleMap api-key="AIzaSyCvCTTPWA-EgJopWDqGsf47sKP9tNQz0a8" style="width: 100%; height: 100%" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script lang="ts" setup>
import { GoogleMap, Marker } from "vue3-google-map";

const center = { lat: 40.689247, lng: -74.044502 };
</script>
  