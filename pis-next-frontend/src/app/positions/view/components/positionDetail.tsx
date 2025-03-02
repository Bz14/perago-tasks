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
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  useUpdatePositionMutation,
  useDeletePositionMutation,
  useGetChoicesQuery,
} from "@/app/redux/slices/positionSlice";

interface PositionDetailProps {
  position: PositionNode | null;
}

const PositionDetail: React.FC<PositionDetailProps> = ({ position }) => {
  const [updatePosition, { isLoading: isUpdating }] =
    useUpdatePositionMutation();
  const [deletePosition, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeletePositionMutation();

  const [isEdit, setIsEdit] = useState(false);
  const { data: choices } = useGetChoicesQuery(undefined, {
    skip: !isEdit,
  });
  const [data, setData] = useState({ name: "", description: "", parentId: "" });

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => {
    if (position) {
      setData({
        name: position.name,
        description: position.description,
        parentId: position.parentId ?? "",
      });
    }
  }, [position]);

  const handleSave = async () => {
    if (!position) return;
    console.log(data);
    await updatePosition({ id: position.id, ...data });
    setIsEdit(false);
  };

  const handleDelete = async () => {
    if (!position) return;
    await deletePosition(position.id);
    closeModal();
  };

  if (!position) {
    return <></>;
  }

  return (
    <Container className="w-1/3 text-customBlue bg-white mt-28">
      {!isDeleted && (
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
              {position.name.charAt(0)}
            </Avatar>
            <div>
              {isEdit ? (
                <TextInput
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="text-2xl font-bold text-customBlue"
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
            <Textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          ) : (
            <Text className="text-customBlue">{position.description}</Text>
          )}

          {isEdit && (
            <div className="mt-2">
              <Select
                label="Parent Position"
                placeholder="Select parent position"
                data={choices && choices.length > 0 ? choices : []}
                onChange={(value) =>
                  setData({ ...data, parentId: value ?? "" })
                }
                classNames={{
                  input:
                    "border-gray-300 p-3 rounded-lg focus:ring-customBlue w-full outline-none",
                  label: "text-gray-800",
                  error: "ml-2 text-red-500",
                }}
              />
            </div>
          )}

          {position.children?.length > 0 && (
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
              onClick={isEdit ? handleSave : () => setIsEdit(true)}
              disabled={isUpdating}
            >
              {isUpdating ? (
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
              disabled={isDeleting}
            >
              {isDeleting ? <Loader size="sm" color="red" /> : "Delete"}
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
              <Button color="red" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? <Loader size="sm" color="white" /> : "Delete"}
              </Button>
            </div>
          </Modal>
        </Card>
      )}
    </Container>
  );
};

export default PositionDetail;
