"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TextInput, PasswordInput, Button, Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import positionApi from "@/app/api/api";
import { LoginFormData } from "@/app/interfaces/interface";

const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email address!"),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(8, "Password must be at least 8 characters!"),
});

const LoginPage = () => {
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

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => positionApi.login(data),
    onSuccess: (loginData) => {
      localStorage.setItem("accessToken", loginData.accessToken);
      notifications.show({
        title: "Success",
        message: "Login successful! Redirecting...",
        color: "green",
        autoClose: 1000,
        withCloseButton: true,
        position: "top-center",
      });
      router.push("/positions/create");
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

  const onError = (errors: FieldErrors) => {
    console.log(errors);
  };

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-customBlue">
          Admin Login
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 mt-6 p-4"
        >
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

          <Button
            type="submit"
            fullWidth
            className="bg-customBlue hover:bg-gray-500 text-white"
          >
            {loginMutation.isPending && isSubmitting ? (
              <Loader color="white" size="sm" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
