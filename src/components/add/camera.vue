<template>
  <v-container class="pa-0" fluid>
    <v-row justify="center" class="">
        <v-col cols="11" md="8">
            <v-alert
                  v-if="alert.title"
                  variant="tonal"
                  :title="alert.title"
                  :text="alert.text"
                  :type="alert.type"
                ></v-alert>
        </v-col>
    </v-row>
    <Camera @started="cameraStartedFunc" :resolution="cameraSize" ref="camera" autoplay></Camera>
    <v-row justify="center" class="">
        <v-btn
            @click="snapshot"
            position="absolute"
            color="white"
            icon
            style="bottom:20px; position:fixed;"
            :disabled="btnDisabled"
            class="rounded-circle">
                <v-icon color="grey" size="x-large" icon="mdi-circle-outline"></v-icon>
        </v-btn>
    </v-row>
    <cameraConfirm :dialog="confirmDialog" :camera-size="reversedCameraSize" :image="image"/>  
  </v-container>
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import Camera from "simple-vue-camera";
import cameraConfirm from "./cameraConfirm.vue";

const btnDisabled = ref(true);
const confirmDialog = ref(false);

interface Alert {
    title: string,
    text: string,
    type: "success" | "info" | "warning" | "error" | undefined,
}
const alert = reactive(<Alert>{
    title: '',
    text: '',
    type: undefined,
});

onMounted(() => {
    alert.title = "カメラを起動しています...";
    alert.text = "落とし物の画像を撮影するためにカメラを起動します。カメラのアクセスを許可してください。";
    alert.type = "info";
});

const cameraStartedFunc = () => {
    console.log("camera started");
    alert.title = "";
    btnDisabled.value = false;
};

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

const camera = ref<InstanceType<typeof Camera>>();
    interface Image {
        url: string,
        blob: Blob,
    }

const image = reactive<Image>({
    url: '',
    blob: new Blob(),
});
const snapshot = async () => {
  btnDisabled.value = true;
    const blob = await camera.value?.snapshot(reversedCameraSize);
    image.url = URL.createObjectURL(<Blob>blob);
    image.blob = <Blob>blob;
  confirmDialog.value = true;
  btnDisabled.value = false;
}
</script>
  