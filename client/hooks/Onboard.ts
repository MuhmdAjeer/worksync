import { OnboardDto } from "@/generated/dto/onboard-dto";
import ApiClient from "@/lib/apiClient";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const UseOnboardUser = (): UseMutationResult<
  void,
  Error,
  OnboardDto,
  unknown
> => {
  const mutationOptions: UseMutationOptions<void, Error, OnboardDto, unknown> =
    {
      mutationFn: async (userDto: OnboardDto) => {
        await ApiClient.onboardUser(userDto);
      },
      onError: (error) => {
        alert('hii')
        toast.error("Error");
      },
    };

  return useMutation(mutationOptions);
};
