import { Pipeline } from './pipeline/Pipeline';
import { AwsTargetConfig } from '@/pipeline-config';
import { PipelineState } from './pipelineState/PipelineState';

class AwsTarget {
  pipelines: Pipeline[];
  pipelineStates: PipelineState[];

  constructor (
    readonly id: number,
    readonly label: string,
    readonly apiKey: string,
    pipelines: Pipeline[],
    pipelineStates: PipelineState[]
  ) {
    this.pipelines = pipelines;
    this.pipelineStates = pipelineStates;
  }

  getPipelines (): Pipeline[] {
    return this.pipelines;
  }

  setPipelines (pipelines: Pipeline[]): void {
    this.pipelines = pipelines;
  }

  getPipelineStates (): PipelineState[] {
    return this.pipelineStates;
  }

  setPipelineStates (pipelineStates: PipelineState[]): void {
    this.pipelineStates = pipelineStates;
  }

  resetPipelines (): void {
    this.pipelines = [];
    this.pipelineStates = [];
  }

  static fromConfig (config: AwsTargetConfig): AwsTarget {
    return new AwsTarget(config.id, config.label, config.apiKey, [], []);
  }
}

export { AwsTarget };
