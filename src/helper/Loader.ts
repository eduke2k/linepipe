import { AwsTargetConfig } from '@/pipeline-config';
import { AwsTarget } from '@/models/AwsTarget';
// import { Pipeline } from '@/models/Pipeline';

// async function loadPipelinesByAwsTarget (apiKey: string): Promise<Pipeline[]> {
//   console.log(apiKey);
//   return Promise.resolve([]);
// }

/**
 * Todo
 * @param configArray
 */
async function loadAwsTargets (configArray: AwsTargetConfig[]): Promise<AwsTarget[]> {
  if (configArray.length === 0) return Promise.reject(new Error('Config is empty'));

  // Create AwsTarget instances from config array
  const awsTargets = configArray.map(config => AwsTarget.fromConfig(config));

  // Iterate over AwsTarget instances and populate model with pipelines via api key
  // awsTargets.forEach(async (awsTarget) => {
  //   const pipelines = await loadPipelinesByAwsTarget(awsTarget.apiKey);
  //   awsTarget.setPipelines(pipelines);
  //   return awsTarget;
  // });

  return awsTargets;
}

export { loadAwsTargets };
