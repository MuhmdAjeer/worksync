import OnboardingForm from "@/components/onboarding/OnboardingForm";
import Typography from "@/components/ui/Typography";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="flex w-full justify-between">
        <Typography className="mb-4" variant="h3">
          What will your workspace be?
        </Typography>
        <Typography variant="h4">Step 1/3</Typography>
      </div>
      <div className="w-1/2">
        <OnboardingForm />
      </div>
    </>
  );
};

export default Page;
