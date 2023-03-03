<template>
  <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0" 
    style="width: 100%; height: 100%" :center="center" :zoom="15"
    @zoom_changed="zoomChanged" @center_changed="centerChanged">
    <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" @click="markerClicked(location.id)" />
  </GoogleMap>
  <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
    >
    
    <v-card>
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            <span v-for="(tag, i) in itemDetail.tags" :key="i">
              # <a href="#" >{{ tag }}</a> 
            </span>
          </div>
          <div class="text-caption">{{itemDetail.note}}</div>
          <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
            <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
          </v-avatar>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn color="primary">
          自分の落とし物です！
        </v-btn>
        <v-btn variant="text">
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRef } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)

const center = { lat: -28.024, lng: 140.887 }

const drawer = ref(false)

const itemDetail = ref({tags: ["ああああ", "いいいい"], note: "地球に落ちていました", date: "2099-01-01", pic: "https://cdn.vuetifyjs.com/images/cards/foster.jpg"})

const locations = ref([
  { id: "hogehoge", lat: -31.56391, lng: 147.154312 },
  { id: "hogehoge", lat: -33.718234, lng: 150.363181 },
  { id: "hogehoge", lat: -33.727111, lng: 150.371124 },
  { id: "hogehoge", lat: -33.848588, lng: 151.209834 },
  { id: "hogehoge", lat: -33.851702, lng: 151.216968 },
  { id: "hogehoge", lat: -34.671264, lng: 150.863657 },
  { id: "hogehoge", lat: -35.304724, lng: 148.662905 },
  { id: "hogehoge", lat: -36.817685, lng: 175.699196 },
  { id: "hogehoge", lat: -36.828611, lng: 175.790222 },
  { id: "hogehoge", lat: -37.75, lng: 145.116667 },
  { id: "hogehoge", lat: -37.759859, lng: 145.128708 },
  { id: "hogehoge", lat: -37.765015, lng: 145.133858 },
  { id: "hogehoge", lat: -37.770104, lng: 145.143299 },
  { id: "hogehoge", lat: -37.7737, lng: 145.145187 },
  { id: "hogehoge", lat: -37.774785, lng: 145.137978 },
  { id: "hogehoge", lat: -37.819616, lng: 144.968119 },
  { id: "hogehoge", lat: -38.330766, lng: 144.695692 },
  { id: "hogehoge", lat: -39.927193, lng: 175.053218 },
  { id: "hogehoge", lat: -41.330162, lng: 174.865694 },
  { id: "hogehoge", lat: -42.734358, lng: 147.439506 },
  { id: "hogehoge", lat: -42.734358, lng: 147.501315 },
  { id: "hogehoge", lat: -42.735258, lng: 147.438 },
  { id: "hogehoge", lat: -43.999792, lng: 170.463352 },
])

const zoomChanged = () => {
  // TODO: 変更後の範囲に応じてマーカーを取得
  const gmap = mapRef.value?.map;
  console.log(mapRef.value)
  console.log('Map: Zoom:', gmap.getZoom());
}

const centerChanged = () => {
  // TODO: 変更後の範囲に応じてマーカーを取得
  const gmap = mapRef.value?.map;
  const center = gmap.getCenter();
  console.log('Map: Center: (', center.lat(), ',', center.lng(), ')');
}

const markerClicked = (id: string) => {
  console.log(`Marker: Cliked Id: ${id}`)

  // bottom sheetの表示
  drawer.value = true;

  // descriptionの取得
  const description = {tags: ["手袋", "赤"], note: "地面に落ちていました", date: "2023-02-26"}
}

</script>
  