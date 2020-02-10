interface ArtifactStoreResponse {
  'encryptionKey': {
    'id': string;
    'type': string;
  };
  'location': string;
  'type': string;
}

interface BlockerResponse {
  'name': string;
  'type': string;
}

interface MetadataResponse {
  'created': number;
  'pipelineArn': string;
  'updated': number;
}

interface StageResponse {
  'name': string;
  'actions': ActionResponse[];
  'blockers': BlockerResponse[];
}

interface ActionResponse {
  'actionTypeId': ActionTypeIdResponse;
  'configuration': Record<string, string>;
  'inputArtifacts': InputArtifactResponse[];
  'name': string;
  'outputArtifacts': OutputArtifactResponse[];
  'region': string;
  'roleArn': string;
  'runOrder': number;
}

interface ActionTypeIdResponse {
  'category': string;
  'owner': string;
  'provider': string;
  'version': string;
}

interface InputArtifactResponse {
  'name': string;
}

interface OutputArtifactResponse {
  'name': string;
}

interface PipelineResponse {
  'artifactStore': ArtifactStoreResponse;
  'artifactStores': Record<string, ArtifactStoreResponse>;
  'name': string;
  'roleArn': string;
  'stages': StageResponse[];
  'version': number;
}

export {
  PipelineResponse,
  OutputArtifactResponse,
  InputArtifactResponse,
  ActionTypeIdResponse,
  ActionResponse,
  StageResponse,
  MetadataResponse,
  BlockerResponse,
  ArtifactStoreResponse
};
