import { ActionStateResponse } from '@/interfaces/GetPipelineState/GetPipelineStateResponseSubTypes';

interface LatestActionExecution {
  'errorDetails': {
    'code': string;
    'message': string;
  };
  'externalExecutionId': string;
  'externalExecutionUrl': string;
  'lastStatusChange': number;
  'lastUpdatedBy': string;
  'percentComplete': number;
  'status': ActionStatus;
  'summary': string;
  'token': string;
}

interface CurrentRevision {
  'created': number;
  'revisionChangeId': string;
  'revisionId': string;
}

enum ActionStatus {
  UNSET = 'Unset',
  IN_PROGRESS = 'InProgress',
  SUCCEEDED = 'Succeeded',
  FAILED = 'Failed'
}

class ActionState {
  constructor (
    readonly name: string,
    readonly currentRevision?: CurrentRevision,
    readonly entityUrl?: string,
    readonly latestExecution?: LatestActionExecution,
    readonly revisionUrl?: string
  ) {}

  getStatus (): ActionStatus {
    return this.latestExecution ? this.latestExecution.status : ActionStatus.UNSET;
  }

  public static fromResponse (response: ActionStateResponse): ActionState {
    return new ActionState(
      response.actionName,
      response.currentRevision,
      response.entityUrl,
      response.latestExecution,
      response.revisionUrl
    );
  }
}

export { ActionState, LatestActionExecution, CurrentRevision, ActionStatus };
