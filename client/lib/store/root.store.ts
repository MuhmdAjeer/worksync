import { enableStaticRendering } from "mobx-react";
import { WorkspaceRootStore } from "./workspace.store";

enableStaticRendering(typeof window === "undefined");

export interface IRootStore {
  workspaceStore: WorkspaceRootStore;
}

export class RootStore implements IRootStore {
  workspaceStore: WorkspaceRootStore;
  constructor() {
    this.workspaceStore = new WorkspaceRootStore();
  }
}
