import { MetadataResponse, PipelineResponse } from './GetPipelineResponseSubTypes';

interface GetPipelineResponse {
  'metadata': MetadataResponse;
  'pipeline': PipelineResponse;
}

export { GetPipelineResponse };
