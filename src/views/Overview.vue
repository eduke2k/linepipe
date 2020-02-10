<template>
  <v-container class="pa-0" no-gutters fluid fill-height>
    <v-layout no-gutters row justify-stretch>
      <v-col cols="12">
        <TargetComponent
          v-for="awsTargetConfig in awsTargetConfigs"
          v-bind:key="awsTargetConfig.id"
          :awsTargetConfig="awsTargetConfig"
        />
      </v-col>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TargetComponent from '@/components/TargetComponent.vue';
// import { AwsTarget } from '../models/AwsTarget';
import { AwsTargetConfig } from '../pipeline-config';

@Component({
  components: {
    TargetComponent
  }
})
export default class Overview extends Vue {
  get awsTargetConfigs (): AwsTargetConfig[] {
    return this.$store.getters.awsTargetConfigs;
  }
  // get awsTargets (): AwsTarget[] {
  //   return this.$store.getters.awsTargets;
  // }
}
</script>
