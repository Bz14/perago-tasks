"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import img from "../../../../public/images/img1.jpg";
import { TextInput, Select, Button, Loader, Textarea } from "@mantine/core";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import positionApi from "@/app/api/api";

import checkAdmin from "@/app/utils/checkAdmin";

import { FormData } from "@/app/interfaces/interface";

const schema = z.object({
  name: z
    .string()
    .nonempty("Position name is required!")
    .min(2, "Position name must be at least 2 characters!"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters!"),
  parentId: z.string(),
});

const CreatePosition = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    if (!checkAdmin()) {
      router.push("/admin/login");
    }
  }, []);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      parentId: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isSubmitting } = formState;

  const createPosition = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      parentId: string;
    }) => positionApi.createPosition(data),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Position created successfully!",
        color: "green",
        autoClose: 1000,
        withCloseButton: true,
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Failure",
        message: error ? error.message : "An error occurred",
        color: "red",
        autoClose: 1000,
        withCloseButton: true,
        position: "top-right",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["choices"] });
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      reset();
    },
  });

  const { data: choices } = useQuery({
    queryKey: ["choices"],
    queryFn: positionApi.getChoices,
  });

  const onSubmit = async (data: FormData) => {
    createPosition.mutate(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              onChange={(value) => setValue("parentId", value ?? "")}
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
            {createPosition.isPending && isSubmitting ? (
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
