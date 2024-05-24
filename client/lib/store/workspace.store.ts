import { OnboardDto } from "@/generated/dto/onboard-dto";
import { Workspace } from "@/generated/dto/workspace";
import { WorkspaceService } from "@/services/workspace.service";
import { computed, makeObservable, observable, runInAction, set } from "mobx";
export interface IWorkspaceRoot {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  onboardUser: (data: OnboardDto) => Promise<Workspace>;
}
export class WorkspaceRootStore implements IWorkspaceRoot {
  workspaces = [];
  workspaceService: WorkspaceService;
  constructor() {
    makeObservable(this, {
      currentWorkspace: computed,
      workspaces: observable,
    });
    this.workspaceService = new WorkspaceService();
  }

  get currentWorkspace() {
    return this.workspaces[0];
  }

  onboardUser = async (data: OnboardDto) =>
    await this.workspaceService.onboardUser(data).then((response) => {
      runInAction(() => {
        this.workspaces = set(this.workspaces, response.id, response);
      });
      return response;
    });
}
