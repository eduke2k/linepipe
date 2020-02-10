<template>
  <v-app-bar app dark color="grey darken-3" id="app-toolbar">
    <v-toolbar-title class="headline text-uppercase">
      <v-icon id="app-logo">$vuetify.icons.logo</v-icon>
      <span class="font-weight-light">AWS WARPZONE</span>
    </v-toolbar-title>
    <div class="flex-grow-1 d-flex justify-center">

    </div>
    <v-text-field
      class="search-input ml-3 mr-3"
      hide-details
      prepend-icon="mdi-magnify"
      single-line
      placeholder="Search for Pipelines"
      v-model="searchTerm"
    ></v-text-field>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue {
  public mounted (): void {
    console.log(this.$vuetify);
  }
  private get searchTerm (): string { return this.$store.getters.searchTerm; }
  private set searchTerm (searchTerm: string) { this.$store.dispatch('setSearchTerm', searchTerm); }
};

</script>
