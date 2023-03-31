<template>
  <v-alert
    v-if="alert.title"
    variant="tonal"
    :title="alert.title"
    :text="alert.text"
    :type="alert.type"
  ></v-alert>
  <v-card 
    v-if="data.id"
    density="comfortable"
  >
  <v-card-title class="ma-4">
      Good for you!!🎉🎉
  </v-card-title>
  <v-card-text>
      <p>We have removed the finds from the list.
      Please use the information below to pick them up.</p>
      <div class="text-caption">{{data.note}}</div>
      <v-chip
          v-for="(tag, i) in data.tags" :key="i"
          class="ma-1"
          label
      >
          <v-icon start icon="mdi-music-accidental-sharp"></v-icon>
          {{ tag }}
      </v-chip>
      <div class="text-body-1">{{data.item_name}}</div>
      <div class="text-body-1">{{data.colour}}</div>
      <div class="text-body-1">{{data.situation}}</div>
      <div class="text-body-1">{{data.note}}</div>
      <v-spacer class="mt-4"></v-spacer>
      <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0"
          style="width: 100%; height: 300px;" :center="data.location" :zoom="15" :fullscreen-control="false">
          <Marker :options="{ position: data.location }" />
      </GoogleMap>
      <v-spacer class="mt-4"></v-spacer>
      <v-img
      :src="data.pic"
      cover
      class="text-white"
      ></v-img>
  </v-card-text>
  <v-card-actions>
      <v-btn class="mx-auto" to="/">Back to top</v-btn>
  </v-card-actions>
  </v-card>
</template>
  
  
<script lang="ts" setup>
import { ref, onMounted, reactive, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { GoogleMap, Marker } from "vue3-google-map";
import { Loader } from "@googlemaps/js-api-loader"

interface Query {
  cameraWidth: number;
  cameraHeight: number;
  tags: string[],
  pic: string,
}
const route = useRoute()
const query = <Query><unknown>route.query
const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
const loader = new Loader({
  apiKey: "AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0",
  version: "weekly",
});

interface Alert {
  title: string,
  text: string,
  type: "error" | "success" | "warning" | "info" | undefined
}
const alert = reactive(<Alert>{
  title: "",
  text: "",
  type: "error"
})

interface ResponseData {
  id: number,
  pic: string,
  date: string,
  note: string,
  item_name: string,
  situation: string,
  others: string,
  colour: string,
  tags: string[],
  location: {
    lat: number,
    lng: number,
  }
}
let data = reactive(<ResponseData>{
  id: 0,
  pic: "",
  date: "",
  note: "",
  item_name: "",
  situation: "",
  others: "",
  colour: "",
  tags: [],
  location: {
    lat: 0,
    lng: 0,
  }
})

const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

onMounted(() => {
  const otoshimono = localStorage.getItem("otoshimono");
  if (!otoshimono) {
    alert.title = "Error";
    alert.text = "No lost and found history.";
    alert.type = "error";
    return;
  }
  const parsedOtoshimono = JSON.parse(otoshimono);
  data.id = parsedOtoshimono.id;
  data.pic = parsedOtoshimono.pic;
  data.date = parsedOtoshimono.date;
  data.note = parsedOtoshimono.note;
  data.item_name = parsedOtoshimono.item_name;
  data.situation = parsedOtoshimono.situation;
  data.others = parsedOtoshimono.others;
  data.colour = parsedOtoshimono.colour;
  data.tags = parsedOtoshimono.tags;
  data.location = parsedOtoshimono.location;
  
  console.log(data)
})





</script>
  