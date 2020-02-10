<template>
  <div class="aws-target">
    <!-- Target Toolbar -->
    <v-toolbar dense flat color="transparent" class="mt-3">
      <v-toolbar-title>{{ awsTargetConfig.label }} ({{ awsTarget.getPipelines().length }})</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="refresh" icon width="40" height="40" :loading="isPending">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh Pipeline Group</span>
      </v-tooltip>
    </v-toolbar>

    <!-- Pipeline Grid -->
    <div :class="['card-list cards', cardListClasses ]" v-if="showPipelineCards">
      <PipelineComponent
        v-for="pipelinState in filteredPipelines"
        v-bind:key="pipelinState.name"
        :pipeline="pipelinState" />
    </div>

    <!-- Alternative Messaged -->
    <div class="card-list no-cards" v-else>
      <!-- Loading -->
      <div class="cards-loading" v-if="apiStatus == apiStatuses.PENDING">
        <v-progress-circular
          indeterminate
          :size="32"
          color="primary"
          class="mb-3"
        />
        <span>Loading Pipelines...</span>
      </div>

      <!-- Network Error -->
      <div class="cards-failed" v-if="apiStatus == apiStatuses.ERROR">
        <v-icon large color="error" class="mb-3 shaking">mdi-close-network-outline</v-icon>
        <span class="error--text">Error while fetching Pipelines from AWS target <span class="font-weight-medium">{{ awsTargetConfig.label }}</span></span>
      </div>

      <!-- No Pipelines -->
      <div class="cards-empty" v-if="apiStatus == apiStatuses.SUCCESS && awsTarget.getPipelines().length === 0">
        <v-icon large color="warning shaking" class="mb-3">mdi-emoticon-sad-outline</v-icon>
        <span>No Pipelines configured in AWS target <span class="font-weight-medium warning--text">{{ awsTargetConfig.label }}</span></span>
      </div>

    </div>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AwsTargetConfig } from './../pipeline-config';
import { AwsTarget } from './../models/AwsTarget';
import { PipelineApi } from './../api/PipelineApi';
import PipelineComponent from './PipelineComponent.vue';
import { PipelineState } from '../models/pipelineState/PipelineState';
import { Getter } from 'vuex-class';

enum ApiStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error'
}

@Component({
  components: {
    PipelineComponent
  }
})
export default class TargetComponent extends Vue {
  @Prop({ required: true }) awsTargetConfig!: AwsTargetConfig
  @Getter public searchTerm!: string
  awsTarget: AwsTarget;
  apiStatuses = ApiStatus;
  apiStatus: ApiStatus = ApiStatus.PENDING;

  public constructor () {
    super();
    this.awsTarget = AwsTarget.fromConfig(this.awsTargetConfig);
  }

  private mounted (): void {
    this.getPipelines();
  }

  private refresh (): void {
    this.apiStatus = ApiStatus.PENDING;
    this.getPipelines();
  }

  private async getPipelines (): Promise<void> {
    try {
      const pipelines = await PipelineApi.getPipelines(this.awsTarget);
      const pipelineStates = await PipelineApi.getPipelineStates(this.awsTarget);

      this.awsTarget.setPipelines(pipelines);
      this.awsTarget.setPipelineStates(pipelineStates);

      this.apiStatus = ApiStatus.SUCCESS;
    } catch (error) {
      this.apiStatus = ApiStatus.ERROR;
      this.awsTarget.resetPipelines();
    }
  }

  private get filteredPipelines (): PipelineState[] {
    console.log(this.searchTerm);
    if (!this.searchTerm) return this.awsTarget.getPipelineStates();

    return this.awsTarget.getPipelineStates().filter((pipeline): boolean =>
      pipeline.name.includes(this.searchTerm)
    );
  }

  // private get searchTerm (): string {
  //   return this.$store.getters.searchTerm;
  // }

  private get isPending (): boolean {
    return this.apiStatus === ApiStatus.PENDING;
  }

  private get showPipelineCards (): boolean {
    return (this.apiStatus === ApiStatus.SUCCESS || this.isPending) && this.awsTarget.getPipelines().length > 0;
  }

  private get cardListClasses (): string {
    if (this.isPending) {
      return 'refreshing';
    } else {
      return '';
    }
  }
}

</script>
