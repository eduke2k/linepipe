<template>
  <v-scroll-x-transition>
    <div class="pipeline-card elevation-3 vue" v-if="ready">
      <div class="card-title">
        <div class="title-elements">
          <span class="font-weight-medium white--text">{{ pipeline.name }}</span>
          <span class="subtitle white--text" >Vue Project</span>
        </div>
        <div class="flex-grow-1"></div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon width="40" height="40" dark>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </template>
          <span>Show Pipeline</span>
        </v-tooltip>
      </div>
      <div class="card-stages">
        <StagesComponent :stages="pipeline.getStageStates()" />
      </div>
    </div>
  </v-scroll-x-transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import StagesComponent from './StagesComponent.vue';
import { PipelineState } from '../models/pipelineState/PipelineState';

@Component({
  components: {
    StagesComponent
  }
})
export default class PipelineComponent extends Vue {
  @Prop({ required: true }) pipeline!: PipelineState;
  ready = false;

  mounted (): void {
    this.ready = true;
  }
};

</script>
