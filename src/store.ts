import Vue from 'vue';
import Vuex from 'vuex';
import { AwsTarget } from './models/AwsTarget';
import { AwsTargetConfig } from './pipeline-config';

interface RootState {
  awsTargetConfigs: AwsTargetConfig[];
  awsTargets: AwsTarget[];
  searchTerm: string;
}

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    awsTargetConfigs: [],
    awsTargets: [],
    searchTerm: ''
  },
  getters: {
    awsTargetConfigs: (state): AwsTargetConfig[] => {
      return state.awsTargetConfigs;
    },
    searchTerm: (state): string => {
      return state.searchTerm.trim();
    }
  },
  mutations: {
    setAwsTargetConfigs (state, targetConfigs: AwsTargetConfig[]): void {
      state.awsTargetConfigs = targetConfigs;
    },
    setSearchTerm (state, searchTerm: string): void {
      state.searchTerm = searchTerm;
    }
  },
  actions: {
    setAwsTargetConfigs ({ commit }, targetConfigs: AwsTargetConfig[]): void {
      commit('setAwsTargetConfigs', targetConfigs);
    },
    setSearchTerm ({ commit }, searchTerm: string): void {
      commit('setSearchTerm', searchTerm);
    }
  }
});
