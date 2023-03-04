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

                            <span class="mt-5">会津若松市一箕町亀賀郷之原</span>
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
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
const itemDetail = ref({tags: ["ああああ", "いいいい"], note: "地球に落ちていました", date: "2099-01-01", pic: "https://cdn.vuetifyjs.com/images/cards/foster.jpg"})
const center = { lat: 35.6809591, lng: 139.7673068 }
</script>
  