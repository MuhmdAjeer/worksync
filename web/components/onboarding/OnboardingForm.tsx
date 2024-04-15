"use client";
import { onboardingSchema } from "@/lib/schema/Workspace";
import { OnboardingWorkspace } from "@/lib/types/Workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const OnboardingForm = () => {
  const form = useForm<OnboardingWorkspace>({
    resolver: zodResolver(onboardingSchema),
  });
  return (
    <form className="flex gap-4 flex-col">
      <div>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Name"
              message={fieldState.error?.message}
              placeholder="Enter your workspace name"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={form.control}
          name="slug"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Slug"
              message={fieldState.error?.message}
              placeholder={`app.worksync.com/your_slug_here`}
            />
          )}
        />
      </div>
      <div>
        <Button>Go Live</Button>
      </div>
    </form>
  );
};

export default OnboardingForm;
