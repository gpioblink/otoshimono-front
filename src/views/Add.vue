<template>
    <v-container class="fill-height pl-0 pr-0" :style="{background: 'black'}" fluid>
        <camera ref="camera" autoplay>
            <v-responsive class="d-flex text-center align-end fill-height">
                <v-btn>I'm on top of the video</v-btn>
            </v-responsive>
        </camera>
    </v-container>
</template>

<script lang="ts" setup>
import Camera from "simple-vue-camera";

</script>
  