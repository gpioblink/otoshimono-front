<template>
  <v-dialog
    v-model="dialog"
    activator="parent"
    width="auto"
  >
    <v-card width="w-80">
      <v-card-title>
        この画像で登録しますか？
      </v-card-title>
      <v-card-item>
        <v-img
        justify="center"
        :width="cameraSize.width / 1.3"
        :height="cameraSize.height / 1.3"
        cover
        :src="props.url"
      ></v-img>
      </v-card-item>
      
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="primary" block @click="dialog = false">再撮影</v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" variant="outlined" block @click="dialog = false">登録</v-btn>
          </v-col>
      </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";

interface Props {
  dialog: boolean,
  cameraSize: {
    width: number,
    height: number,
  },
  url : string,
}
const props = defineProps<Props>()
const dialog = ref(props.dialog)

</script>
  