import { PipelineResponse } from './ListPipelinesResponseSubTypes';

interface ListPipelinesResponse {
  'nextToken': string;
  'pipelines': PipelineResponse[];
}

export { ListPipelinesResponse };
