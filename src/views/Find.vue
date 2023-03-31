<template>
  <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0" 
    style="width: 100%; height: 100%" :center="center" :zoom="15" :fullscreen-control="false" :map-type-control="showMapTypeControl"
    @zoom_changed="zoomChanged" @center_changed="centerChanged" @click="unforcus()">
  </GoogleMap>

  <v-text-field
        ref="textBox"
        style="top:125px; right: 10px; position: absolute; max-width: 600px; width: 70%;"
        variant="solo"
        label="Enter Filter"
        v-model="filterQuery"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="lazyUnforcus()"
        @keyup.enter="lazyUnforcus()"
    ></v-text-field>

  <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      :touchless="!drawer"
      temporary
      :style="`height: 40%; min-height: 400px; max-height: 600px; max-width: 600px; left: ${drawerLeft};`"
    >

    <v-card height="100%" class="card-outter" style="position: relative">
      <v-card-title>{{ itemDetail.title }}
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
          It's my lost item!
        </v-btn>
        <v-btn variant="text" @click="drawer = false">
          Cancel
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
        <v-card-title>Final confirmation</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <span>{{ itemDetail.title }}</span>
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
          Cancel
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            :to="`/done/pickup/${itemDetail.id}`"
          >
          Mark as discovered
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

interface ResultMarker {
  id: number
  tags: string[]
  note: string
  pic: string
  location: { lat: number, lng: number }
  date: string
}

interface OtoshimonoMarker {
  tags: string[]
  note: string
  pic: string
  location: { lat: number, lng: number }
  date: string
  marker: google.maps.Marker
}

const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
const textBox = ref(null)

const drawerLeft = ref<string>("0px")
const dialog = ref<boolean>(false)

const center = { lat: 35.6809591, lng: 139.7673068 }

const drawer = ref(false)

const showMapTypeControl = ref(false)

const filterQuery = ref("")

const itemDetail = ref({id: "", title: "", tags: ["ああああ", "いいいい"], note: "地球に落ちていました", date: "2099-01-01", pic: "https://cdn.vuetifyjs.com/images/cards/foster.jpg"})

const backendBaseURL = import.meta.env.VITE_OTOSHIMONO_BACKEND_BASE_URL

// const currentLocationMarker: google.maps.Marker | null = null
const resultMarkers: { [id :string]: OtoshimonoMarker } = {}

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

const removeAllMarkers = () => {
  console.log(resultMarkers)
  for (const key in resultMarkers) {
    console.log("delete:", key)
    if (resultMarkers.hasOwnProperty(key)) {
        console.log("delete:", key)

        resultMarkers[key].marker.setMap(null);

        delete resultMarkers[key];
    }
  }
}

const showCurrentLocationMarkers = async () => {
  removeAllMarkers()

  const gmap = mapRef.value?.map
  if(!mapRef.value) return

  // google mapの表示領域を取得する
  const bounds = gmap?.getBounds()

  const resRaw = await fetch(`${backendBaseURL}/search`, {
    method: "POST",
    body: JSON.stringify({
      "location1": {
          "lat": bounds?.getSouthWest().lat(),
          "lng": bounds?.getSouthWest().lng()
      },
      "location2": {
          "lat": bounds?.getNorthEast().lat(),
          "lng": bounds?.getNorthEast().lng()
      },
      // "tags": [
      //     "手袋"
      // ],
      "query": filterQuery.value
    })
  })
  
  const res: {count: number, items: ResultMarker[]} = await resRaw.json()

  for(let i = 0; i < res.count; i++) {
    const item = res.items[i]
    if(item.id in resultMarkers) {
      continue
    }

    // 取得してきたマーカーをGoogleMap用のマーカーにする
    const marker = new google.maps.Marker({
        title: item.id.toString(),
        position: new google.maps.LatLng(item.location.lat, item.location.lng),
        map: gmap,
    });

    marker.addListener("click", (data) => {
      const markerId = marker.getTitle()
      if (typeof markerId == "string") {
        markerClicked( markerId )
      }
    });

    // 詳細情報保存用の配列に詰める
    resultMarkers[item.id] = {
      tags: item.tags,
      note: item.note,
      pic: item.pic,
      location: { lat: item.location.lat, lng: item.location.lng },
      date: item.date,
      marker: marker
    }

  }
}

watch(() => mapRef.value?.ready, (ready) => {
  if (!ready) return
  moveToCurrentPosition()
  addCurrentLocationMarker()

  showCurrentLocationMarkers()
})

const zoomChanged = () => {
  // TODO: 変更後の範囲に応じてマーカーを取得
  const gmap = mapRef.value?.map;

  // FIXME: 検索窓のフォーカス外し用
  unforcus()

  // console.log('Map: Zoom:', gmap?.getZoom());
  showCurrentLocationMarkers()
}

const lazyUnforcus = () => {
  setTimeout(() => { unforcus() }, 100 )

  showCurrentLocationMarkers()
}

const unforcus = () => {
  if(textBox.value) {
    // @ts-ignore
    textBox.value.blur()
  }
}

const centerChanged = () => {
  // TODO: 変更後の範囲に応じてマーカーを取得
  const gmap = mapRef.value?.map;
  const center = gmap?.getCenter();

  // FIXME: 検索窓のフォーカス外し用
  unforcus()

  if(center) {
    console.log('Map: Center: (', center.lat(), ',', center.lng(), ')');
    showCurrentLocationMarkers();
  }
}

const markerClicked = (id: string) => {
  console.log(`Marker: Cliked Id: ${id}`)
  const item = resultMarkers[id]

  // descriptionの更新
  itemDetail.value = {id: id, title: "", tags: item.tags, note: item.note, date: item.date, pic: item.pic}

  // bottom sheetの表示
  drawer.value = true;

  // タイトル状態だけど
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ location: new google.maps.LatLng(item.location.lat, item.location.lng) }, 
    (results, status) => {
      if (status != google.maps.GeocoderStatus.OK) return
      if (results[0].geometry) {
        console.log(results[0].formatted_address)
        itemDetail.value.title = results[0].formatted_address
      }
  })
}

</script>
