<template>
  <v-container class="pa-0" fluid>
    <Camera :resolution="cameraSize" ref="camera" autoplay>
        <v-row justify="center" class="">
            <v-btn
                @click="snapshot"
                position="absolute"
                color="white"
                icon
                style="bottom:20px; position:fixed;"
                :loading="btnLoading"
                class="rounded-circle">
                    <v-icon color="grey" size="x-large" icon="mdi-circle-outline"></v-icon>
            </v-btn>
        </v-row>
    </Camera>
    <cameraConfirm :dialog="confirmDialog" :camera-size="reversedCameraSize" :url="url"/>  
  </v-container>
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import Camera from "simple-vue-camera";
import cameraConfirm from "./cameraConfirm.vue";

const btnLoading = ref(false);
const confirmDialog = ref(false);

const windowSize = reactive({
    width: 0,
    height: 0,
});

const cameraSize = (() => {
    if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
        return {
            width: window.innerHeight,
            height: window.innerWidth,
        };
    } else {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
})();

const reversedCameraSize = (() => {
    if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    } else {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
})();

console.log(cameraSize)

const onResize = () => {
    windowSize.width = window.innerWidth;
    windowSize.height = window.innerHeight;
};
onMounted(() => {
    onResize();
});

const url = ref<string>();
const camera = ref<InstanceType<typeof Camera>>();
const snapshot = async () => {
  btnLoading.value = true;
    const blob = await camera.value?.snapshot(reversedCameraSize);
  url.value = URL.createObjectURL(blob);
  console.log(url);
  confirmDialog.value = true;
  btnLoading.value = false;
    /*
    const link = document.createElement('a');
    link.download = 'aaa.png'
    link.href = url; 
    link.click(); 
    URL.revokeObjectURL(link.href);

    */
}
</script>
  