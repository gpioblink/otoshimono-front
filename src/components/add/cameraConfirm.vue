<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    activator="parent"
  >
    <v-card class="pt-5">
      <v-card-title>
        この画像で登録しますか？
      </v-card-title>
      <v-card-item>
        <v-img
        justify="center"
        :width="cameraSize.width / 1.3"
        :height="cameraSize.height / 1.3"
        cover
        :src="props.image.url"
        class="mx-auto"
      ></v-img>
      </v-card-item>
      
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="primary" block @click="dialog = false">再撮影</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="upload" :loading="uploadLoading" color="primary" variant="outlined" block>登録</v-btn>
          </v-col>
      </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <registerDialog :dialog="dialog2" :tags="tags" :cameraSize="cameraSize" :pic="pic" :blobUrl="props.image.url"/> 
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from "vue";
import registerDialog from "./registerDialog.vue";

interface Image {
  url: string,
  blob: Blob,
}
interface Props {
  dialog: boolean,
  cameraSize: {
    width: number,
    height: number,
  },
  image: Image,
}
const props = defineProps<Props>()
const dialog = ref(props.dialog)
const dialog2 = ref(false)
const uploadLoading = ref(false)

const tags = ref<string[]>([])
const pic = ref<string>("")

const upload = async () => {
  uploadLoading.value = true
  // ここで画像をアップロードする
  const formData = new FormData();
  formData.append("file", <Blob>props.image.blob, "image.png");
  const response = await fetch(`${import.meta.env.VITE_OTOSHIMONO_BACKEND_BASE_URL}/parse`, {
      method: "POST",
    body: formData,
      mode: "cors",
  }).catch((e) => {
      alert("通信エラーが発生しました。");
      console.log(e);
  });
  const data = await response?.json();
  console.log(data)
  tags.value = data.tags;
  pic.value = data.pic;
  dialog2.value = true
  dialog.value = false
  uploadLoading.value = false
}

</script>
  