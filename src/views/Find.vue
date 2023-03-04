<template>
  <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0" 
    style="width: 100%; height: 100%" :center="center" :zoom="15" :fullscreen-control="false" :map-type-control="showMapTypeControl"
    @zoom_changed="zoomChanged" @center_changed="centerChanged">

    <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" @click="markerClicked(location.id)" />

  </GoogleMap>

  <v-text-field
        style="top:125px; right: 10px; position: absolute; max-width: 600px; width: 70%;"
        variant="solo"
        label="フィルターを入力"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="unforcus()"
    ></v-text-field>

  <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      :touchless="!drawer"
      temporary
      :style="`height: 40%; min-height: 400px; max-height: 600px; max-width: 600px; left: ${drawerLeft};`"
    >
    
    <v-card height="100%" class="card-outter" style="position: relative">
      <v-card-title>会津若松市一箕町亀賀郷之原
        <div class="text-caption">{{itemDetail.note}}</div>
        <div>
          <v-chip
            v-for="(tag, i) in itemDetail.tags" :key="i"
            class="ma-1"
            label
          >
            <v-icon start icon="mdi-music-accidental-sharp"></v-icon>
            {{ tag }}
          </v-chip>
        </div>
      </v-card-title>
      <v-card-item>
        <div>    
          <v-img
            height="200"
            :src="itemDetail.pic"
            cover
            class="text-white"
          ></v-img>
        </div>
      </v-card-item>

      <v-card-actions class="card-actions">
        <v-btn color="primary" @click="dialog = true">
          自分の落とし物です！
        </v-btn>
        <v-btn variant="text">
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      width="100%"
      style="max-width: 1000px;"
    >
      <v-card>
        <v-card-title>最終確認</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <span>会津若松市一箕町亀賀郷之原</span>
        <div class="text-caption">{{itemDetail.note}}</div>
        <div>
          <v-chip
            v-for="(tag, i) in itemDetail.tags" :key="i"
            class="ma-1"
            label
          >
            <v-icon start icon="mdi-music-accidental-sharp"></v-icon>
            {{ tag }}
          </v-chip>
        </div>
        <v-spacer class="mt-4"></v-spacer>
        <v-img
          :src="itemDetail.pic"
          cover
          class="text-white"
        ></v-img>
        </v-card-text>
        <v-divider class="mt-2"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            to="/done/pickup"
          >
            発見済みにする
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)

const drawerLeft = ref<string>("0px")
const dialog = ref<boolean>(false)

const center = { lat: 35.6809591, lng: 139.7673068 }

const drawer = ref(false)

const showMapTypeControl = ref(false)

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

const windowSizeChanged = () => {
  console.log(`windowWidth: ${window.innerWidth}`);
  drawerLeft.value = (window.innerWidth < 600) ? `0` : `${window.innerWidth / 2 - 300}px`;
  showMapTypeControl.value = (window.innerWidth > 850)
}

onMounted(() => {
  windowSizeChanged();
  window.addEventListener('resize', windowSizeChanged);
  moveToCurrentPosition();
})

const moveToCurrentPosition = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (pos) => {
      console.log(`geolocation: ${pos.coords.latitude},${pos.coords.longitude}`)
      const gmap = mapRef.value?.map
      const position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      gmap?.setCenter(position)
    })
  }
}

const addCurrentLocationMarker = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (pos) => {
      console.log(`geolocation: ${pos.coords.latitude},${pos.coords.longitude}`)
      const gmap = mapRef.value?.map
      const position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)

      // 現在地に青点を追加
      new google.maps.Marker({
        position: position,
        map: gmap,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillOpacity: 1,
          strokeWeight: 2,
          fillColor: '#5384ED',
          strokeColor: '#ffffff',
        },
      });
    })
  }
}

watch(() => mapRef.value?.ready, (ready) => {
  if (!ready) return
  moveToCurrentPosition()
  addCurrentLocationMarker()
})

const zoomChanged = () => {
  // TODO: 変更後の範囲に応じてマーカーを取得
  const gmap = mapRef.value?.map;
  unforcus()
  console.log(mapRef.value)
  console.log('Map: Zoom:', gmap?.getZoom());
}

const unforcus = () => {
  const elem = document.activeElement;
  if(elem) {
    // @ts-ignore
    elem.blur()
  }
}

const centerChanged = () => {
  // TODO: 変更後の範囲に応じてマーカーを取得
  const gmap = mapRef.value?.map;
  const center = gmap?.getCenter();
  unforcus()
  if(center) {
    console.log('Map: Center: (', center.lat(), ',', center.lng(), ')');
  }
}

const markerClicked = (id: string) => {
  console.log(`Marker: Cliked Id: ${id}`)

  // bottom sheetの表示
  drawer.value = true;

  // descriptionの取得
  const description = {tags: ["手袋", "赤"], note: "地面に落ちていました", date: "2023-02-26"}
}

</script>
  