import { Stage } from './Stage';
import { GetPipelineResponse } from '@/interfaces/GetPipeline/GetPipelineResponseType';
import { Action } from './Action';
import { Blocker } from './Blocker';

interface Metadata {
  'created': number;
  'pipelineArn': string;
  'updated': number;
}

class Pipeline {
  private stages: Stage[]

  constructor (
    readonly metadata: Metadata,
    readonly name: string,
    readonly roleArn: string,
    stages: Stage[],
    readonly version: number
  ) {
    this.stages = stages;
  }

  public getStages (): Stage[] {
    return this.stages;
  }

  public static fromGetPipelineResponse (response: GetPipelineResponse): Pipeline {
    const stages: Stage[] = response.pipeline.stages.map((stageResponse): Stage => {
      const actions: Action[] = stageResponse.actions ? stageResponse.actions.map(actionResponse => Action.fromResponse(actionResponse)) : [];
      const blockers: Blocker[] = stageResponse.blockers ? stageResponse.blockers.map(blockerResponse => Blocker.fromResponse(blockerResponse)) : [];
      return new Stage(stageResponse.name, actions, blockers);
    });

    return new Pipeline(
      response.metadata,
      response.pipeline.name,
      response.pipeline.roleArn,
      stages,
      response.pipeline.version
    );
  }
}

export { Pipeline };
