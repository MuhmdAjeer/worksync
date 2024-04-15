"use client";

import Typography from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreateUserDto } from "@/generated/dto/create-user-dto";
import { login } from "@/lib/actions";
import { loginSchema } from "@/lib/schema/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [state, action] = useFormState(login, { error: "" });
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);
  const loginHandler: SubmitHandler<CreateUserDto> = async (data) => {
    action(data);
  };

  return (
    <div className="relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
      <Card>
        <CardHeader>
          <Typography variant="h4">Welcome Back, Login</Typography>

          <CardDescription>Stay connected to your team!</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  message={fieldState.error?.message}
                  size={28}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  message={fieldState.error?.message}
                  size={28}
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={() => {
              void form
                .handleSubmit(loginHandler)()
                .then(() => {
                  router.push("/onboarding");
                });
            }}
            className="w-full"
          >
            Submit
          </Button>
          <Separator className="my-2" />
          <Button className="w-full ">
            <GitHubLogoIcon />
          </Button>
          <Typography color="gray" variant="h4" affects="muted">
            New to Worksync?{" "}
            <Link className="text-info" href="/auth/register">
              Create an account
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
