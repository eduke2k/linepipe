import { ActionStatus } from '@/models/pipelineState/ActionState';
import { StageStatus } from '@/models/pipelineState/StageState';

interface LatestActionExecutionResponse {
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

interface CurrentRevisionResponse {
  'created': number;
  'revisionChangeId': string;
  'revisionId': string;
}

interface ActionStateResponse {
  'actionName': string;
  'currentRevision': CurrentRevisionResponse;
  'entityUrl': string;
  'latestExecution': LatestActionExecutionResponse;
  'revisionUrl': string;
};

interface InboundTransitionStateResponse {
  'disabledReason': string;
  'enabled': boolean;
  'lastChangedAt': number;
  'lastChangedBy': string;
}

interface LatestStageExecutionResponse {
  'pipelineExecutionId': string;
  'status': StageStatus;
}

interface StageStateResponse {
  'actionStates': ActionStateResponse[];
  'inboundTransitionState': InboundTransitionStateResponse;
  'latestExecution': LatestStageExecutionResponse;
  'stageName': string;
}

export {
  StageStateResponse,
  LatestStageExecutionResponse,
  InboundTransitionStateResponse,
  ActionStateResponse,
  CurrentRevisionResponse,
  LatestActionExecutionResponse
};
