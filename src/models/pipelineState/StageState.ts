import { ActionState } from './ActionState';

interface InboundTransitionState {
  'disabledReason': string;
  'enabled': boolean;
  'lastChangedAt': number;
  'lastChangedBy': string;
}

interface LatestStageExecution {
  'pipelineExecutionId': string;
  'status': StageStatus;
}

enum StageStatus {
  UNSET = 'Unset',
  IN_PROGRESS = 'InProgress',
  SUCCEEDED = 'Succeeded',
  FAILED = 'Failed'
}

class StageState {
  private actionStates: ActionState[]

  constructor (
    readonly name: string,
    actionStates?: ActionState[],
    readonly inboundTransitionState?: InboundTransitionState,
    readonly latestExecution?: LatestStageExecution
  ) {
    this.actionStates = actionStates || [];
  }

  public getActionStates (): ActionState[] {
    return this.actionStates;
  }

  public getStatus (): StageStatus {
    return this.latestExecution ? this.latestExecution.status : StageStatus.UNSET;
  }
}

export { StageState, InboundTransitionState, LatestStageExecution, StageStatus };
