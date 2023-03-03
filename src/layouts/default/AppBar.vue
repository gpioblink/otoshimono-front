<template>
    <v-toolbar color="transparent" class="px-0">
      <v-toolbar-title>おとしものアプリ(仮)</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          color="primary"
          grow
        >
          <v-tab
            to="/add"
          >
            拾ったものを登録
          </v-tab>

          <v-tab
            to="/find"
          >
            落とし物を探す
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </template>
  
  <script lang="ts" setup>
    import { ref } from "vue";
  </script>
  