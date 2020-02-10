<template>
  <div class="stages-component">
    <div
      v-for="stage in stages"
      v-bind:key="stage.name"
      class="stage"
    >
      <ActiosComponent :actions="stage.getActionStates()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Stage } from '../models/pipeline/Stage';
import ActiosComponent from './ActionsComponent.vue';

@Component({
  components: {
    ActiosComponent
  }
})
export default class StagesComponent extends Vue {
  @Prop({ required: true }) stages!: Stage[];
};

</script>
