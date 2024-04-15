"use client";
import { login } from "@/lib/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [state, formAction] = useFormState(login, { error: "" });
  useEffect(() => {
    if (state?.error.length) {
      toast.error(state?.error);
    }
  }, [state]);
  return (
    <div>
      {/* <form action={formAction}> */}
      <input type="email" name="email" id="" />
      <input type="password" name="password" id="" />
      <button>server action test </button>
      {/* </form> */}
    </div>
  );
}
