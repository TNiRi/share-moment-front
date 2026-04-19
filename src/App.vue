<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Share Moment</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
