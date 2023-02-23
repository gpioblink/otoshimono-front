<template>
    <v-toolbar color="transparent" class="px-0">
      <v-toolbar-title>おとしものアプリ(仮)</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          color="primary"
          grow
        >
          <v-tab
            :value="1"
          >
            拾ったものを登録
          </v-tab>

          <v-tab
            :value="2"
          >
            落とし物を探す
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </template>
  
  <script lang="ts" setup>
    import { ref } from "vue";
    const tabs = ref(1);
  </script>
  