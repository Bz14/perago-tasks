"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Notification,
  Loader,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import {
  Login,
  resetSuccessState,
  resetErrorState,
} from "@/app/redux/slices/adminSlice";

type FormData = {
  userName: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(3, "Username must be at least 3 characters!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(3, "Password must be at least 3 characters!"),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.admin
  );

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    dispatch(resetSuccessState());
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        reset();
        dispatch(resetSuccessState());
        router.push("/positions/create");
      }, 2000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        reset();
        dispatch(resetErrorState());
      }, 1000);
    }
  }, [error]);

  const onError = (errors: FieldErrors) => {
    reset();
    console.log(errors);
  };

  const onSubmit = async (data: FormData) => {
    dispatch(Login(data));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-customBlue">
          Admin Login
        </h2>

        {success && (
          <Notification color="green">
            Login successful! Redirecting...
          </Notification>
        )}

        {error && <Notification color="red">{error}</Notification>}

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 mt-6 p-4"
        >
          <div>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              {...register("username")}
              error={errors.username?.message}
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
            {loading && isSubmitting ? (
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
