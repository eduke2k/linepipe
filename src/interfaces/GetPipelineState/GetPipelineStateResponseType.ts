import { StageStateResponse } from './GetPipelineStateResponseSubTypes';

interface GetPipelineStateResponse {
  'created': number;
  'pipelineName': string;
  'pipelineVersion': number;
  'stageStates': StageStateResponse[];
  'updated': number;
}

export { GetPipelineStateResponse };
