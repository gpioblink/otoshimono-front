<template>
  <v-app style="position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px;">
    <default-bar />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
