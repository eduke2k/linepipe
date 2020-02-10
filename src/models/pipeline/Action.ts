interface ActionTypeId {
  'category': string;
  'owner': string;
  'provider': string;
  'version': string;
}

interface InputArtifact {
  'name': string;
}

interface OutputArtifact {
  'name': string;
}

interface ActionResponse {
  'actionTypeId': ActionTypeId;
  'configuration': Record<string, string>;
  'inputArtifacts': InputArtifact[];
  'name': string;
  'outputArtifacts': OutputArtifact[];
  'region': string;
  'roleArn': string;
  'runOrder': number;
}

class Action {
  constructor (
    readonly name: string,
    readonly actionTypeId: ActionTypeId,
    readonly configuration: Record<string, string>,
    readonly inputArtifacts: InputArtifact[],
    readonly outputArtifacts: OutputArtifact[],
    readonly region: string,
    readonly roleArn: string,
    readonly runOrder: number
  ) {}

  public static fromResponse (response: ActionResponse): Action {
    return new Action(
      response.name,
      response.actionTypeId,
      response.configuration,
      response.inputArtifacts,
      response.outputArtifacts,
      response.region,
      response.roleArn,
      response.runOrder
    );
  }
}

export { ActionResponse, Action };
