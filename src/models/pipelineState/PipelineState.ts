import { GetPipelineStateResponse } from '@/interfaces/GetPipelineState/GetPipelineStateResponseType';
import { StageState } from './StageState';
import { ActionState } from './ActionState';

class PipelineState {
  stageStates: StageState[];

  constructor (
    readonly created: number,
    readonly name: string,
    readonly version: number,
    stageStates: StageState[],
    readonly updated: number
  ) {
    this.stageStates = stageStates;
  }

  public getStageStates (): StageState[] {
    return this.stageStates;
  }

  public static fromGetPipelineStateResponse (response: GetPipelineStateResponse): PipelineState {
    const stageStates: StageState[] = response.stageStates.map((stageStateResponse): StageState => {
      const actionStates: ActionState[] = stageStateResponse.actionStates.map(actionStateResponse => ActionState.fromResponse(actionStateResponse));

      return new StageState(
        stageStateResponse.stageName,
        actionStates,
        stageStateResponse.inboundTransitionState,
        stageStateResponse.latestExecution);
    });

    return new PipelineState(
      response.created,
      response.pipelineName,
      response.pipelineVersion,
      stageStates,
      response.updated
    );
  }
}

export { PipelineState };
