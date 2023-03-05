<template>
  <v-dialog
    v-model="dialog2"
    fullscreen
  >
    <v-card class="pt-5">
      <v-card-title>
        登録フォーム
      </v-card-title>
      <v-card-text>
        落とし物を登録します。
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
                  :width="props.cameraSize.width / 3"
                  :height="props.cameraSize.height / 3"
                  cover
                  :src="props.blobUrl"
                  class="mx-auto"
                ></v-img>
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
                label="タグを選択または追加"
                v-model="data.tags"
                :rules="[v => !!v || '少なくとも１つのタグを選択してください。']"
                :items="props.tags"
              ></v-combobox>
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
                  label="備考"
                  :rules="[v => !!v || '備考は必須です。']"
                  class="mx-auto"
                ></v-textarea>
              </v-col>
            </v-row>
              <v-row justify="center">
              <v-col
                cols="12"
                md="5"
              >
                <v-text-field
                  v-model="data.date"
                  :rules="[v => !!v || '拾得日は必須です。']"
                  label="拾得日"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                cols="12"
                md="5"
              >
                <v-card :loading="registerDisabled" elevation="0">
                  <v-card-title class="grey--text">拾得位置</v-card-title>
                  <v-card-text text-color="grey">ピンをドラッグして、正しい位置に修正してください。</v-card-text>
                  <GoogleMap  ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0" 
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
            <v-btn color="primary" block to="/">キャンセル</v-btn>
          </v-col>
          <v-col>
            <v-btn :loading="registerLoading" :disabled="registerDisabled" color="primary" variant="outlined" block @click="register">登録</v-btn>
          </v-col>
      </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <thanksDialog :dialog="dialog3" :data="data"/>
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive, toRefs, watch } from "vue";
import dayjs from "dayjs";
import { GoogleMap, Marker } from "vue3-google-map";
import thanksDialog from "./thanksDialog.vue";
import { strict } from "assert";

interface Props {
  dialog: boolean,
  cameraSize: {
    width: number,
    height: number,
  },
  tags: string[],
  pic: string,
  blobUrl: string,
}
const props = defineProps<Props>()
const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
let markers: google.maps.Marker[] = [];
const dialog2 = ref(false)
const { dialog } = toRefs(props)
dialog2.value = dialog.value
watch(dialog, (val : boolean) => {
  dialog2.value = val
  alert.type = "info"
  alert.title = "位置情報を取得しています..."
  alert.text = "拾得位置を特定するために位置情報を利用します。位置情報の取得を許可してください。"
  moveToTop()
  navigator.geolocation.getCurrentPosition((position) => {
    alert.title = ""
    data.location.lat = position.coords.latitude
    data.location.lng = position.coords.longitude
    console.log(data.location)
    const gmap = mapRef.value?.map
    const gmapPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
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
    registerDisabled.value = false
  }, (error) => {
    console.error(error)
    alert.type = "error"
    alert.title = "位置情報の取得に失敗しました。"
    alert.text = "拾得位置を特定するために位置情報を利用します。再読込して位置情報の取得を許可してください。"
    moveToTop()
  }, {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  })
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
  if (!data.note) {
    alert.type = "error"
    alert.title = "備考が入力されていません。"
    alert.text = "備考は必須です。"
    moveToTop()
    return false
  }
  if (!data.date) {
    alert.type = "error"
    alert.title = "拾得日が入力されていません。"
    alert.text = "拾得日は必須です。"
    moveToTop()
    return false
  }
  if (data.date && !dayjs(data.date).isValid()) {
    alert.type = "error"
    alert.title = "拾得日が不正です。"
    alert.text = "拾得日はYYYY-MM-DD HH:mmの形式で入力してください。"
    moveToTop()
    return false
  }
  if (!data.tags) {
    alert.type = "error"
    alert.title = "タグが選択されていません。"
    alert.text = "少なくとも１つのタグを選択してください。"
    moveToTop()
    return false
  }
  return true
}

const register = async () => {
  if (!validate()) return
  registerLoading.value = true
  data.date = dayjs(data.date).toISOString()
  console.log(JSON.stringify(data))
  await new Promise(resolve => setTimeout(resolve, 1000))
  data.pic = "https://picsum.photos/200/300"
  registerLoading.value = false
  dialog2.value = false
  dialog3.value = true
}

const reset = () => {
  dialog2.value = false
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
  pic: props.pic,
})

watch(data, (val) => {
  console.log(val)
})

const moveToTop = () => {
  const duration = 500;
  const interval = 10;
  const step = -window.scrollY / Math.ceil(duration / interval);
  const timer = setInterval(() => {
    window.scrollBy(0, step);
    if (window.scrollY <= 0) {
      clearInterval(timer);
    }
  }, interval);
}




</script>
  