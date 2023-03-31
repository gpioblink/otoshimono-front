<template>
    <v-container class="fill-height" fluid>
      <v-responsive class="d-flex text-center align-center fill-height">
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <v-card border density="comfortable">
                    <v-card-title class="ma-4">
                      Welcome!
                    </v-card-title>
                    <v-card-text>
                       The "Otoshimono App" is a tool that enable users to share their low-value lost and found items, such as umbrellas and gloves, with people all over the world by taking a picture of them.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="mx-auto" to="/add">Register</v-btn>
                        <v-btn class="mx-auto" to="/find">Find</v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>

  <script lang="ts" setup>
  </script>