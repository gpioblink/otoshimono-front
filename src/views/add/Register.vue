<template>
<v-card class="pt-5">
  <v-card-title>
    Registration Form
  </v-card-title>
  <v-card-text>
    Register lost items
  </v-card-text>
  <v-card-item>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-alert
              v-if="alert.title"
              variant="tonal"
              :title="alert.title"
              :text="alert.text"
              :type="alert.type"
            ></v-alert>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-img
              :width="query.cameraWidth / 3"
              :height="query.cameraHeight / 3"
              cover
              :src="<string>query.pic"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              v-model="data.date"
              :rules="[v => !!v || 'Pickup date is required.']"
              label="Acquisition date"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
            justify="center"
          >
          <v-combobox
            clearable
            multiple
            chips
            required
            label="Select or add tags"
            v-model="data.tags"
            :rules="[v => !!v || 'Please select at least one tag.']"
            :items="<Array<string>>query.tags"
          ></v-combobox>
          </v-col>
          </v-row>
          <v-row justify="center">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              v-model="data.item_name"
              label="Item name"
              hint="Examples: gloves, mobile battery"
              class="mx-auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              v-model="data.color"
              label="Color"
              hint="Example: light blue yellow and pale blue"
              class="mx-auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              v-model="data.situation"
              label="Situation"
              hint="Example: Inside the bus bound for Tokyo Station"
              class="mx-auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
          >
            <v-textarea
              v-model="data.note"
              auto-grow
              rows="2"
              label="Others"
              class="mx-auto"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
          >
            <v-card :loading="registerDisabled" elevation="0">
              <v-card-title class="grey--text">Pick up position</v-card-title>
              <v-card-text text-color="grey">Please drag the pin to fix it in the correct position.</v-card-text>
              <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0"
                  style="width: 100%; height: 300px;" :center="data.location" :zoom="15" :fullscreen-control="false">
              </GoogleMap>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card-item>
  
  <v-card-actions>
    <v-row>
      <v-col>
        <v-btn color="primary" block to="/">Cancel</v-btn>
      </v-col>
      <v-col>
        <v-btn :loading="registerLoading" :disabled="registerDisabled" color="primary" variant="outlined" block @click="register">Register</v-btn>
      </v-col>
  </v-row>
  </v-card-actions>
</v-card>
<thanksDialog :dialog="dialog3" :data="responseData"/>
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { GoogleMap, Marker } from "vue3-google-map";
import { Loader } from "@googlemaps/js-api-loader"
import thanksDialog from "@/components/add/thanksDialog.vue";

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
let markers: google.maps.Marker[] = [];
onMounted(async() => {
  alert.type = "info"
  alert.title = "Getting location information..."
  alert.text = "We use location information to identify the pickup location. Please allow the acquisition of location information."
  moveToTop()
})

const dialog3 = ref(false)
const registerLoading = ref(false)
const registerDisabled = ref(true)
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

const validate = () => {
  alert.title = ""
  alert.text = ""
  if (!data.date) {
    alert.type = "error"
    alert.title = "You have not entered a found date."
    alert.text = "Please pickup date is required."
    window.scrollTo({
    top: 0,
    behavior: "smooth"
    })
    return false
  }
  if (data.date && !dayjs(data.date).isValid()) {
    alert.type = "error"
    alert.title = "Pickup date is invalid."
    alert.text = "Please enter the found date in YYYY-MM-DD HH:mm format."
    moveToTop()
    return false
  }
  if (!data.tags || data.tags.length === 0) {
    alert.type = "error"
    alert.title = "No tags selected."
    alert.text = "Please select at least one tag."
    window.scrollTo({
    top: 0,
    behavior: "smooth"
    })
    return false
  }
  return true
}
interface ResponseData {
  id: number,
  pic: string,
  date: string,
  note: string,
  item_name: string,
  situation: string,
  others: string,
  color: string,
  tags: string[],
  location: {
    lat: number,
    lng: number,
  }
}
let responseData = reactive(<ResponseData>{})

const register = async () => {
  if (!validate()) return
  registerLoading.value = true
  data.date = dayjs(data.date).toISOString()
  const response = await fetch(`${import.meta.env.VITE_OTOSHIMONO_BACKEND_BASE_URL}/item`, {
      method: "POST",
    body: JSON.stringify(data),
      mode: "cors",
  }).catch((e) => {
    moveToTop()
    alert.type = "error"
    alert.title = "Registration failed."
    alert.text = "Registration failed. Please reload and register again."
    console.log(e);
  });
  responseData = await response?.json()
  registerLoading.value = false
  dialog3.value = true
}

const reset = () => {
  dialog3.value = false
}

const data = reactive({
  note: "",
  date: dayjs().format("YYYY-MM-DD HH:mm"),
  tags: [],
  location:{
		lat: 0,
		lng: 0
  },
  pic: query.pic,
  item_name: "",
  situation: "",
  others: "",
  color: "",
})

watch(query, (val) => {
  data.pic = val.pic
})

watch(() => mapRef.value?.ready, (ready) => {
  if (!ready) return
  // do something with the api using `mapRef.value.api`
  // or with the map instance using `mapRef.value.map`
  data.location.lat = 35.685175
  data.location.lng = 139.7528
  console.log(data.location)
  const gmap = mapRef.value?.map
  const gmapPosition = new google.maps.LatLng(data.location.lat, data.location.lng)
  gmap?.setCenter(gmapPosition)
  const marker = new google.maps.Marker({
    position: gmapPosition,
    map: gmap,
    draggable: true,
  });
  marker.addListener("dragend", (event) => {
    const position : google.maps.LatLng = event.latLng!
    data.location.lat = position.lat()
    data.location.lng = position.lng()
  })
  markers.push(marker)
  navigator.geolocation.getCurrentPosition((position) => {
    alert.title = ""
    data.location.lat = position.coords.latitude
    data.location.lng = position.coords.longitude
    console.log(data.location)
    const gmap = mapRef.value?.map
    const gmapPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    gmap?.setCenter(gmapPosition)
    markers[0].setPosition(gmapPosition)
    registerDisabled.value = false
  }, (error) => {
    console.log(error)
    alert.title = ""
    registerDisabled.value = false
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: Infinity
  })
})


const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}




</script>
