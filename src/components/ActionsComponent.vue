<template>
  <div class="actions-component">
    <v-tooltip bottom v-for="action in actions" v-bind:key="action.name">
      <template v-slot:activator="{ on }">
        <div v-on="on" :class="['action', getStatusClass(action)]">
          <v-icon dark>{{ getStatusIcon(action) }}</v-icon>
        </div>
      </template>
      <span>{{ action.name }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ActionState, ActionStatus } from './../models/pipelineState/ActionState';

@Component
export default class ActionsComponents extends Vue {
  @Prop({ required: true }) actions!: ActionState[];

  public getStatusClass (action: ActionState): string {
    if (action.getStatus() === ActionStatus.SUCCEEDED) return 'succeeded success';
    else if (action.getStatus() === ActionStatus.FAILED) return 'failed error';
    else if (action.getStatus() === ActionStatus.IN_PROGRESS) return 'in-progress swinging';
    else return 'unset';
  }

  public getStatusIcon (action: ActionState): string {
    if (action.getStatus() === ActionStatus.SUCCEEDED) return 'mdi-check';
    else if (action.getStatus() === ActionStatus.FAILED) return 'mdi-alert-circle-outline';
    else if (action.getStatus() === ActionStatus.IN_PROGRESS) return 'mdi-loading';
    else return 'unset';
  }
};

</script>
