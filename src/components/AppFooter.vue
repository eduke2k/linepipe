<template>
  <v-footer id="app-footer" color="grey lighten-2" class="justify-end">
    <div class="">Build Version: {{ version }}</div>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {
  private get version (): string {
    return process.env.VERSION;
  }
};

</script>
