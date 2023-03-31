<template>
    <v-toolbar color="transparent" class="px-0">
      <v-toolbar-title>Otoshimono App</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          color="primary"
          grow
        >
          <v-tab
            to="/add"
          >
          Register
          </v-tab>

          <v-tab
            to="/find"
          >
          Find
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </template>

  <script lang="ts" setup>
    import { ref } from "vue";
  </script>
