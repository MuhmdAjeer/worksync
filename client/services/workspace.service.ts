import { OnboardDto } from "@/generated/dto/onboard-dto";
import { APIService } from "./api.service";
import { Workspace } from "@/generated/dto/workspace";

export class WorkspaceService extends APIService {
  constructor() {
    super();
  }

  public async onboardUser(data: OnboardDto): Promise<Workspace> {
    return (await this.post(`/api/workspace/onboarding`, data)).data;
  }
}
