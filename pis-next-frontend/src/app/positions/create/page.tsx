"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import * as yup from "yup";
import img from "../../../../public/images/img1.jpg";
import { TextInput, Select, Button, Loader, Textarea } from "@mantine/core";
import {
  useCreatePositionMutation,
  useGetChoicesQuery,
} from "@/app/redux/slices/positionSlice";
import checkAdmin from "@/app/utils/checkAdmin";

import { FormData } from "@/app/interfaces/interface";

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
  const router = useRouter();
  useEffect(() => {
    if (!checkAdmin()) {
      router.push("/admin/login");
    }
  }, []);

  const [createPosition, { isLoading, isSuccess, error }] =
    useCreatePositionMutation();

  const { data: choices } = useGetChoicesQuery(undefined);

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

  const onError = (errors: FieldErrors) => {
    reset();
    console.log(errors);
  };

  const onSubmit = async (data: FormData) => {
    await createPosition(data);
    reset();
    if (isSuccess) {
      notifications.show({
        title: "Success",
        message: "Position created successfully!",
        color: "green",
        autoClose: 500,
        withCloseButton: true,
        position: "top-center",
      });
    }

    if (error) {
      notifications.show({
        title: "Failure",
        message: error ? error.data.message : "An error occurred",
        color: "red",
        autoClose: 500,
        withCloseButton: true,
        position: "top-center",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row gap-8 mt-28">
      <div className="h-96 flex justify-center md:w-1/2 bg-customBlue rounded-lg shadow-lg mt-2">
        <Image
          src={img}
          alt="Hierarchy Structure"
          className="w-full h-auto rounded-lg"
          width={500}
          height={300}
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-start gap-6">
        <h2 className="text-xl font-bold text-center text-customBlue">
          Create New Position
        </h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <div>
            <TextInput
              label="Position Title"
              placeholder="e.g. Software Engineer"
              {...register("name")}
              error={errors.name?.message}
              classNames={{
                input: "p-3 border-gray-300 rounded-lg focus:ring-customBlue",
                label: "text-gray-800",
                error: "ml-2 text-red-500",
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
                  "border-gray-300 p-3 rounded-lg focus:ring-customBlue w-full outline-none",
                label: "text-gray-800",
                error: "ml-2 text-red-500",
              }}
            />
          </div>

          <div>
            <Select
              label="Parent Position"
              placeholder="Select parent position"
              data={choices && choices.length > 0 ? choices : []}
              {...register("parentId")}
              error={errors.parentId?.message}
              onChange={(value) => setValue("parentId", value)}
              classNames={{
                input:
                  "border-gray-300 p-3 rounded-lg focus:ring-customBlue w-full outline-none",
                label: "text-gray-800",
                error: "ml-2 text-red-500",
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            className="bg-customBlue hover:bg-gray-500 text-white mt-4"
          >
            {isLoading && isSubmitting ? (
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
