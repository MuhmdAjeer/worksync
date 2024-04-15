import { ZodType, z } from "zod";
import { OnboardingWorkspace } from "../types/Workspace";

export const onboardingSchema: ZodType<OnboardingWorkspace> = z.object({
  name: z.string(),
  slug: z.string(),
});
