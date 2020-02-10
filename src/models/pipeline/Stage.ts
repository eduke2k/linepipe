import { Action } from './Action';
import { Blocker } from './Blocker';

class Stage {
  private actions: Action[]
  private blockers: Blocker[]

  constructor (
    readonly name: string,
    actions: Action[],
    blockers: Blocker[]
  ) {
    this.actions = actions;
    this.blockers = blockers || [];
  }

  public getActions (): Action[] {
    return this.actions;
  }

  public getBlockers (): Blocker[] {
    return this.blockers;
  }
}

export { Stage };
