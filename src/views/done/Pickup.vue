<template>
    <v-container class="fill-height" fluid>
        <v-responsive class="d-flex text-center align-center fill-height">
            <v-row justify="center">
                <v-col cols="auto">
                    <v-card border density="comfortable">
                        <v-card-title class="ma-4">
                            よかったですね！！🎉🎉
                        </v-card-title>
                        <v-card-text>
                            <p>発見したものをリストから削除しました。
                            以下の情報を参考に、拾いに行ってください。</p>
                            <v-divider class="my-5"></v-divider>
                            <div>
                            <div class="text-h6">{{itemDetail.address}}</div>
                            <v-chip
                                v-for="(tag, i) in itemDetail.tags" :key="i"
                                class="ma-1"
                                label
                            >
                                <v-icon start icon="mdi-music-accidental-sharp"></v-icon>
                                {{ tag }}
                            </v-chip>
                            <div class="text-body-1">{{itemDetail.item_name}}</div>
                            <div class="text-body-1">{{itemDetail.color}}</div>
                            <div class="text-body-1">{{itemDetail.situation}}</div>
                            <div class="text-body-1">{{itemDetail.note}}</div>
                            </div>

                            <v-spacer class="mt-4"></v-spacer>

                            <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0" 
                                style="width: 100%; height: 300px;" :center="center" :zoom="15" :fullscreen-control="false">
                                <Marker :options="{ position: center }" />
                            </GoogleMap>

                            <v-spacer class="mt-4"></v-spacer>
                            <v-img
                            :src="itemDetail.pic"
                            cover
                            class="text-white"
                            ></v-img>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="mx-auto" to="/">TOPに戻る</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { GoogleMap, Marker } from "vue3-google-map";

const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
const itemDetail = ref({
  address: "",
  tags: [""],
  note: "",
  date: "",
  pic: "https://placehold.jp/30/cfcfcf/ffffff/500x500.png?text=Loading...",
  color: "",
  situation: "",
  item_name: "",
})
const center = ref({ lat: 0, lng: 0 })

const backendBaseURL = import.meta.env.VITE_OTOSHIMONO_BACKEND_BASE_URL

const id = useRoute().params.id

interface ResultItem {
  id: number
  tags: string[]
  note: string
  pic: string
  location: { lat: number, lng: number }
  date: string,
  item_name: string,
  color: string,
  situation: string,
  others: string
}

onMounted(async () => {
  const resRaw = await fetch(`${backendBaseURL}/item/${id}`)
  const item: ResultItem = await resRaw.json()

  // descriptionの更新
  itemDetail.value = {
    tags: item.tags,
    note: item.note,
    date: item.date,
    pic: item.pic,
    color: item.color,
    situation: item.situation,
    item_name: item.item_name,
  }

  // 地図の中心の変更
  center.value = {lat: item.location.lat, lng: item.location.lng}

  // タイトルを変更
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ location: new google.maps.LatLng(item.location.lat, item.location.lng) }, 
    (results, status) => {
      if (status != google.maps.GeocoderStatus.OK) return
      if (results[0].geometry) {
        console.log(results[0].formatted_address)
        itemDetail.value.address = results[0].formatted_address
      }
  })

  // 地図から削除
  await fetch(`${backendBaseURL}/item/${id}`, { method: "DELETE"})
})
</script>
  