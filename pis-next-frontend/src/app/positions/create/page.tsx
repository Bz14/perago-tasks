"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import Image from "next/image";
import * as yup from "yup";
import img from "../../../../public/images/hierarchy.png";
import {
  TextInput,
  Select,
  Button,
  Notification,
  Loader,
  Textarea,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import {
  CreateNewPosition,
  GetChoices,
  resetSuccessState,
  resetErrorState,
} from "@/app/redux/slices/positionSlice";

import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  description: string;
  parentPosition: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Position name is required!")
    .min(2, "Position name must be at least 2 characters!"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters!"),
  parentId: yup.string(),
});

const CreatePosition = () => {
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error, choices } = useSelector(
    (state: RootState) => state.position
  );

  const { isLogged } = useSelector((state: RootState) => state.admin);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      parentId: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    dispatch(resetSuccessState());
  }, []);

  useEffect(() => {
    dispatch(GetChoices());
  }, []);

  const onError = (errors: FieldErrors) => {
    reset();
    console.log(errors);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        reset();
        dispatch(resetSuccessState());
      }, 1000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        reset();
        dispatch(resetErrorState());
      }, 7000);
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        reset();
        dispatch(resetErrorState());
      }, 1000);
    }
  }, [error]);

  const onSubmit = async (data: FormData) => {
    dispatch(CreateNewPosition(data));
  };

  if (!isLogged) {
    route.push("/admin/login");
  }

  return (
    <div className="max-w-4xl mx-auto mt-32 bg-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3 flex justify-center bg-customBlue">
        <Image
          src={img}
          alt="Hierarchy Structure"
          className="max-w-full h-auto rounded-lg"
          width={300}
          height={100}
        />
      </div>

      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold text-center text-customBlue">
          Create New Position
        </h2>

        {success && (
          <Notification color="green">
            Position created successfully!
          </Notification>
        )}
        {error && <Notification color="red">{error}</Notification>}

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 mt-6 p-4"
        >
          <div>
            <TextInput
              label="Position Title"
              placeholder="e.g. Software Engineer"
              {...register("name")}
              error={errors.name?.message}
              classNames={{
                input:
                  "p-2 focus:ring-customBlue rounded-lg mt-1 text-gray-500",
                label: "text-gray-800",
                error: "ml-2",
              }}
            />
          </div>

          <div>
            <Textarea
              label="Job Description"
              placeholder="Describe the position..."
              {...register("description")}
              error={errors.description?.message}
              classNames={{
                input:
                  "border-gray-300 p-2 focus:ring-customBlue rounded-lg w-full mt-1 outline-none text-gray-500",
                label: "text-gray-800",
                error: "ml-2",
              }}
            />
          </div>

          <div>
            <Select
              label="Parent Position"
              placeholder="Select parent position"
              data={choices.length > 0 ? choices : []}
              {...register("parentId")}
              error={errors.parentId?.message}
              onChange={(value) => setValue("parentId", value)}
              classNames={{
                input:
                  "border-gray-300 p-2 focus:ring-customBlue rounded-lg w-full mt-1 outline-none text-gray-500",
                label: "text-gray-800",
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
              "Create Position"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePosition;
