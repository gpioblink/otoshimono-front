<template>
    <v-container class="fill-height" fluid>
      <v-responsive class="d-flex text-center align-center fill-height">
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <v-card border density="comfortable" class="pa-5">
                    <v-card-title class="ma-4">
                      Welcome!
                    </v-card-title>
                    <v-card-text>
                       The "Otoshimono App" is a tool that enable users to share their low-value lost and found items, such as umbrellas and gloves, with people all over the world by taking a picture of them.
                    </v-card-text>
                    <v-row justify="center">
                        <v-col>
                          <v-btn variant="text" to="/add">Register</v-btn>
                        </v-col>
                        <v-col>
                          <v-btn variant="text" to="/find">Find</v-btn>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-col>
                          <v-btn variant="text" color="grey-darken-2" to="/history">Found Item History</v-btn>
                        </v-col>
                      </v-row>
                </v-card>
            </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>

  <script lang="ts" setup>
  </script>