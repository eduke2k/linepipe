interface JobDetails {
  'jobDetails': {
    'accountId': string;
    'data': {
      'actionConfiguration': {
        'configuration': {
          'string': string;
        };
      };
      'actionTypeId': {
        'category': string;
        'owner': string;
        'provider': string;
        'version': string;
      };
      'artifactCredentials': {
        'accessKeyId': string;
        'secretAccessKey': string;
        'sessionToken': string;
      };
      'continuationToken': string;
      'encryptionKey': {
        'id': string;
        'type': string;
      };
      'inputArtifacts': [
        {
          'location': {
            's3Location': {
              'bucketName': string;
              'objectKey': string;
            };
            'type': string;
          };
          'name': string;
          'revision': string;
        }
      ];
      'outputArtifacts': [
        {
          'location': {
            's3Location': {
              'bucketName': string;
              'objectKey': string;
            };
            'type': string;
          };
          'name': string;
          'revision': string;
        }
      ];
      'pipelineContext': {
        'action': {
          'actionExecutionId': string;
          'name': string;
        };
        'pipelineArn': string;
        'pipelineExecutionId': string;
        'pipelineName': string;
        'stage': {
          'name': string;
        };
      };
    };
    'id': string;
  };
}

export { JobDetails };
