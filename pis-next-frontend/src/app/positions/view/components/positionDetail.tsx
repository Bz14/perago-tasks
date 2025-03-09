import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PositionNode } from "@/app/interfaces/interface";
import {
  Card,
  Text,
  Button,
  Divider,
  Avatar,
  Badge,
  TextInput,
  Textarea,
  Modal,
  Container,
  Loader,
  Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import positionApi from "@/app/api/api";

const schema = z.object({
  name: z.string().nonempty({ message: "Title is required" }).min(2, {
    message: "Title must be at least 2 characters",
  }),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(10, {
      message: "Description must be at least 10 characters",
    }),
  parentId: z.string().optional(),
});

interface PositionDetailProps {
  position: PositionNode | null;
  onPositionDeleted: () => void;
}

const PositionDetail: React.FC<PositionDetailProps> = ({
  position,
  onPositionDeleted,
}) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState, setValue, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      parentId: "",
    },
    mode: "onBlur",
  });

  const { errors } = formState;
  const [isEdit, setIsEdit] = useState(false);

  const updatePosition = useMutation({
    mutationFn: (data: {
      id: string;
      name: string;
      description: string;
      parentId: string;
    }) =>
      position
        ? positionApi.updatePosition(position.id, data)
        : Promise.reject(new Error("Position is null")),

    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        { queryKey: ["position", variables?.id] },
        data
      );
      notifications.show({
        title: "Success",
        message: "Position updated successfully!",
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
      setIsEdit(false);
      reset();
    },
  });

  const deletePosition = useMutation({
    mutationFn: (id: string) => positionApi.deletePositionById(id),

    onSuccess: (data, variables) => {
      queryClient.setQueriesData({ queryKey: ["position", variables] }, data);
      queryClient.invalidateQueries({ queryKey: ["positions"] });

      notifications.show({
        title: "Success",
        message: "Position deleted successfully!",
        color: "green",
        autoClose: 1000,
        withCloseButton: true,
        position: "top-right",
      });
    },

    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
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
      onPositionDeleted();
    },
  });

  const { data: choices } = useQuery({
    queryKey: ["choices"],
    queryFn: positionApi.getChoices,
    enabled: isEdit,
  });

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => {
    if (position) {
      setValue("name", position.name);
      setValue("description", position.description);
      setValue("parentId", position.parentId ?? "");
    }
  }, [position, setValue]);

  const handleSave = async (data: {
    name: string;
    description: string;
    parentId?: string;
  }) => {
    if (!position) return;
    updatePosition.mutate({
      id: position.id,
      name: data.name,
      description: data.description,
      parentId: data.parentId ?? "",
    });
  };

  const handleDelete = async () => {
    if (!position) return;
    deletePosition.mutate(position.id ?? "");
    closeModal();
  };

  if (!position) {
    return null;
  }

  return (
    <Container className="w-1/3 text-customBlue bg-white mt-28">
      <Card
        shadow="xl"
        radius="lg"
        className="bg-white w-full max-w-2xl p-6 border border-customBlue hover:shadow-2xl"
      >
        <div className="flex items-center space-x-4 mt-2">
          <Avatar
            size={60}
            radius="xl"
            className="bg-customBlue text-white text-xl shadow-xl"
          >
            {position && position.name && position.name.charAt(0)}
          </Avatar>
          <div>
            {isEdit ? (
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className="text-2xl font-bold text-customBlue"
                    error={errors.name?.message}
                  />
                )}
              />
            ) : (
              <Text className="text-2xl font-bold text-customBlue">
                {position.name}
              </Text>
            )}
          </div>
        </div>

        <Divider className="my-4" />

        {isEdit ? (
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                className="text-customBlue"
                error={errors.description?.message}
              />
            )}
          />
        ) : (
          <Text className="text-customBlue">{position.description}</Text>
        )}

        {isEdit && (
          <div className="mt-2">
            <Controller
              name="parentId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Parent Position"
                  placeholder="Select parent position"
                  data={choices && choices.length > 0 ? choices : []}
                  classNames={{
                    input:
                      "border-gray-300 p-3 rounded-lg focus:ring-customBlue w-full outline-none",
                    label: "text-gray-800",
                    error: "ml-2 text-red-500",
                  }}
                />
              )}
            />
          </div>
        )}

        {position && position.children?.length > 0 && (
          <>
            <Divider className="my-4" />
            <Text className="text-xl font-semibold text-customBlue">
              Team Members
            </Text>
            <div className="mt-2 flex flex-wrap gap-2">
              {position.children.map((member) => (
                <Badge
                  key={member.id}
                  className="text-white bg-customBlue"
                  size="md"
                >
                  {member.name}
                </Badge>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            leftSection={
              isEdit ? <IconPlus size={18} /> : <IconEdit size={18} />
            }
            className="mt-6 bg-customBlue text-white"
            onClick={isEdit ? handleSubmit(handleSave) : () => setIsEdit(true)}
            disabled={updatePosition.isPending}
          >
            {updatePosition.isPending ? (
              <Loader size="sm" color="white" />
            ) : isEdit ? (
              "Save"
            ) : (
              "Update"
            )}
          </Button>
          <Button
            leftSection={<IconTrash size={18} />}
            variant="outline"
            className="mt-6 outline-2 outline-customBlue text-customBlue"
            onClick={openModal}
            disabled={deletePosition.isPending}
          >
            {deletePosition.isPending ? (
              <Loader size="sm" color="red" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>

        <Modal
          opened={modalOpened}
          onClose={closeModal}
          title="Are you sure?"
          centered
          styles={{
            header: { backgroundColor: "#154c79" },
            title: { color: "#fff" },
            close: { color: "#fff" },
          }}
        >
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" color="red" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDelete}
              disabled={deletePosition.isPending}
            >
              {deletePosition.isPending ? (
                <Loader size="sm" color="white" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </Modal>
      </Card>
    </Container>
  );
};

export default PositionDetail;
