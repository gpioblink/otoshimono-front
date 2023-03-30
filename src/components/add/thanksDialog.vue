<template>
  <v-dialog
    v-model="dialog3"
    fullscreen
  >
  <v-card density="comfortable">
    <v-card-title class="ma-4">
        ご協力ありがとうございます！
    </v-card-title>
    <v-card-text>
        <p>落とし物を登録しました。</p>
        <div class="text-caption">{{props.data.note}}</div>
        <div>
        <v-chip
            v-for="(tag, i) in props.data.tags" :key="i"
            class="ma-1"
            label
        >
            <v-icon start icon="mdi-music-accidental-sharp"></v-icon>
            {{ tag }}
        </v-chip>
        </div>
        <v-spacer class="mt-4"></v-spacer>
        <GoogleMap ref="mapRef" api-key="AIzaSyAbdj31UUjRd0SAA506FpVqMZuwyVwpCQ0" 
            style="width: 100%; height: 300px;" :center="props.data.location" :zoom="15" :fullscreen-control="false">
            <Marker :options="{ position: props.data.location }" />
        </GoogleMap>
        <v-spacer class="mt-4"></v-spacer>
        <v-img
        :src="props.data.pic"
        cover
        class="text-white"
        ></v-img>
    </v-card-text>
    <v-card-actions>
        <v-btn class="mx-auto" to="/">TOPに戻る</v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive, toRefs, watch } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

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
interface Props {
  dialog: boolean,
  data: ResponseData
}
const props = defineProps<Props>()
const dialog3 = ref(false)
const { dialog } = toRefs(props)
dialog3.value = dialog.value
watch(dialog, (val : boolean) => {
  dialog3.value = val
})

</script>
  