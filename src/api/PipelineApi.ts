import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ListPipelinesResponse } from '../interfaces/ListPipelines/ListPipelinesResponseType';
import { GetPipelineResponse } from '../interfaces/GetPipeline/GetPipelineResponseType';
import { Pipeline } from '@/models/pipeline/Pipeline';
import { AwsTarget } from '@/models/AwsTarget';
import { PipelineState } from '@/models/pipelineState/PipelineState';
import { GetPipelineStateResponse } from '@/interfaces/GetPipelineState/GetPipelineStateResponseType';

enum ApiAction {
  GET_PIPELINE = 'GetPipeline',
  GET_PIPELINE_EXECUTION = 'GetPipelineExecution',
  GET_PIPELINE_STATE = 'GetPipelineState',
  LIST_ACTION_EXECUTIONS = 'ListActionExecutions',
  LIST_PIPELINES = 'ListPipelines',
  LIST_PIPELINE_EXECUTIONS = 'ListPipelineExecutions',
  START_PIPELINE_EXECUTIONS = 'StartPipelineExecution',
  UPDATE_PIPELINE = 'UpdatePipeline'
}

interface GetPipelineRequestData {
  name: string;
  version?: number;
}

interface GetPipelineStateRequestData {
  name: string;
}

class PipelineApi {
  static async getPipelineStates (awsTarget: AwsTarget): Promise<PipelineState[]> {
    try {
      // First, get the complete Pipeline list from aws
      const listPipelinesResponse: ListPipelinesResponse = await this.post(ApiAction.LIST_PIPELINES, awsTarget.apiKey);
      const pipelineStates: PipelineState[] = [];

      // Then, get more detailed view of each pipeline and create Pipeline model instances.
      for (let index = 0; index < listPipelinesResponse.pipelines.length; index++) {
        const data: GetPipelineStateRequestData = {
          name: listPipelinesResponse.pipelines[index].name
        };
        const params: Record<string, string> = {
          name: listPipelinesResponse.pipelines[index].name
        };

        try {
          const getPipelineStateResponse: GetPipelineStateResponse = await this.post(ApiAction.GET_PIPELINE_STATE, awsTarget.apiKey, data, params);
          pipelineStates.push(PipelineState.fromGetPipelineStateResponse(getPipelineStateResponse));
        } catch (error) {
          throw error;
        }
      };

      return pipelineStates;
    } catch (error) {
      throw (error);
    }
  }

  static async getPipelines (awsTarget: AwsTarget): Promise<Pipeline[]> {
    try {
      // First, get the complete Pipeline list from aws
      const listPipelinesResponse: ListPipelinesResponse = await this.post(ApiAction.LIST_PIPELINES, awsTarget.apiKey);
      const pipelines: Pipeline[] = [];

      // Then, get more detailed view of each pipeline and create Pipeline model instances.
      for (let index = 0; index < listPipelinesResponse.pipelines.length; index++) {
        const data: GetPipelineRequestData = {
          name: listPipelinesResponse.pipelines[index].name
        };
        const params: Record<string, string> = {
          name: listPipelinesResponse.pipelines[index].name
        };

        try {
          const getPipelineResponse: GetPipelineResponse = await this.post(ApiAction.GET_PIPELINE, awsTarget.apiKey, data, params);
          pipelines.push(Pipeline.fromGetPipelineResponse(getPipelineResponse));
        } catch (error) {
          throw error;
        }
      };

      return pipelines;
    } catch (error) {
      throw (error);
    }
  }

  static async post (action: ApiAction, apiKey: string, data: any = undefined, params: Record<string, string> = {}): Promise<any> {
    const url: string = process.env.VUE_APP_AWS_PIPELINE_API_URL + '/' + action;
    const config: AxiosRequestConfig = {
      params: params,
      headers: {
        'Content-type': 'application/x-amz-json-1.1',
        'Authorization': apiKey,
        'X-Amz-Target': 'CodePipeline_20150709.' + action
      }
    };

    return axios.post(url, data, config)
      .then((response: AxiosResponse): void => {
        return response.data;
      })
      .catch((error: Error): void => {
        throw (error);
      });
  }
}

export { ApiAction, PipelineApi };
