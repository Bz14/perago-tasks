"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as yup from "yup";
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
} from "@/app/redux/slices/positionSlice";

import { resetInitialState } from "@/app/redux/slices/positionSlice";

type FormData = {
  name: string;
  description: string;
  parentPosition: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("position name is required!")
    .min(3, "position name must be at least 3 characters!"),
  description: yup
    .string()
    .min(10, "description must be at least 10 characters!"),
  parentPosition: yup.string(),
});

const CreatePosition = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error, choices } = useSelector(
    (state: RootState) => state.position
  );

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      parentPosition: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  useEffect(() => {
    dispatch(GetChoices());
  }, []);

  const onError = (errors: FieldErrors) => {
    reset();
    console.log(errors);
  };

  useEffect(() => {
    if (success) {
      reset();
      dispatch(resetInitialState());
    }
  }, [success]);

  const onSubmit = async (data: FormData) => {
    console.log("Data", data);
    dispatch(CreateNewPosition(data));
  };

  return (
    <div className="max-w-xl mx-auto mt-28 bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-customBlue">
        Create New Position
      </h2>

      {success && isSubmitSuccessful && (
        <Notification color="green">
          Position created successfully!
        </Notification>
      )}

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
              input: "p-2 focus:ring-customBlue rounded-lg mt-1 text-gray-500",
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
            label="Department"
            placeholder="Select department"
            data={["Engineering", "Marketing", "HR", "Sales"]}
            {...register("parentPosition")}
            error={errors.parentPosition?.message}
            onChange={() => console.log("Hello")}
            classNames={{
              input:
                "border-gray-300 p-2 focus:ring-customBlue rounded-lg w-full mt-1 outline-none text-gray-500",
              label: "text-gray-800",
              error: "ml-2",
            }}
          />
        </div>
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
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
  );
};

export default CreatePosition;
