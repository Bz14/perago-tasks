"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TextInput, PasswordInput, Button, Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import positionApi from "@/app/api/api";
import { LoginFormData } from "@/app/interfaces/interface";
import Link from "next/link";

const schema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required!")
      .email("Invalid email address!"),
    password: z
      .string()
      .nonempty("Password is required!")
      .min(8, "Password must be at least 8 characters!"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required!")
      .min(3, "Confirm Password must be at least 3 characters!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  const signupMutation = useMutation({
    mutationFn: (data: LoginFormData) => positionApi.signup(data),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Signup successful. Redirecting.....",
        color: "green",
        autoClose: 1000,
        withCloseButton: true,
        position: "top-center",
      });
      router.push("/admin/login");
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Failure",
        message: error ? error.message : "An error occurred",
        color: "red",
        autoClose: 1000,
        withCloseButton: true,
        position: "top-center",
      });
    },
    onSettled: () => {
      reset();
    },
  });

  const onSubmit = (data: LoginFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-customBlue">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6 p-4">
          <div>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
              classNames={{
                input:
                  "p-2 focus:ring-customBlue rounded-lg mt-1 text-gray-500",
                label: "text-customBlue",
                error: "ml-2",
              }}
            />
          </div>

          <div>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
              classNames={{
                input:
                  "border-gray-300 p-2 focus:ring-customBlue rounded-lg mt-1 text-gray-500",
                label: "text-customBlue",
                error: "ml-2",
              }}
            />
          </div>

          <div>
            <PasswordInput
              label="Confirm Password"
              placeholder="Enter your password again"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              classNames={{
                input:
                  "border-gray-300 p-2 focus:ring-customBlue rounded-lg mt-1 text-gray-500",
                label: "text-customBlue",
                error: "ml-2",
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            className="bg-customBlue hover:bg-gray-500 text-white"
          >
            {signupMutation.isPending && isSubmitting ? (
              <Loader color="white" size="sm" />
            ) : (
              "Signup"
            )}
          </Button>

          <p className=" text-gray-500 text-end">
            Already have an account?{" "}
            <Link
              href="/admin/login"
              className="text-customBlue font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
