<template>
  <v-app>
    <AppHeader />
    <v-content>
      <router-view/>
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { config } from './pipeline-config';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
// import { loadAwsTargets } from './helper/Loader';

@Component({
  components: {
    AppHeader,
    AppFooter
  }
})
export default class App extends Vue {
  async mounted (): Promise<any> {
    this.$store.dispatch('setAwsTargetConfigs', config);
  }
}
</script>

<style lang="scss">
@import "./scss/linepipe.scss";
</style>
