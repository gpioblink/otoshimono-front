<template>
    <v-container class="fill-height" fluid>
      <v-responsive class="d-flex text-center align-center fill-height">
        <v-row justify="center" align="center">
            <v-col cols="auto">
                <v-card border density="comfortable">
                    <v-card-title class="ma-4">
                        ようこそ
                    </v-card-title>
                    <v-card-text>
                       「おとしものアプリ(仮)」は、警察に届けるまでもない落とし物を、
                        撮影するだけで世界の人に共有できるツールです。
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="mx-auto" to="/add">拾ったものを登録</v-btn>
                        <v-btn class="mx-auto" to="/find">落とし物を探す</v-btn>
                    
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>
  
  <script lang="ts" setup>
    //
  </script>
  