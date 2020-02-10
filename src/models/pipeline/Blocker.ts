interface BlockerResponse {
  'name': string;
  'type': string;
}

class Blocker {
  constructor (
    readonly name: string,
    readonly type: string
  ) {}

  public static fromResponse (response: BlockerResponse): Blocker {
    return new Blocker(
      response.name,
      response.type
    );
  }
}

export { BlockerResponse, Blocker };
