<template>
    <v-toolbar color="transparent" class="px-0">
      <v-toolbar-title>おとしものアプリ(仮)</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text">
        拾ったものを登録
      </v-btn>

      <v-btn variant="text">
        落とし物を探す
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          color="primary"
          grow
        >
          <v-tab
            :value="1"
          >
            <v-icon>mdi-phone</v-icon>
          </v-tab>

          <v-tab
            :value="2"
          >
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab
            :value="3"
          >
            <v-icon>mdi-account-box</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </template>
  
  <script lang="ts" setup>
    //
  </script>
  