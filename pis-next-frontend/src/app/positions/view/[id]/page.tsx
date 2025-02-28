"use client";

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
  Notification,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store/store";
import {
  GetPositionById,
  UpdatePosition,
  DeletePosition,
  resetErrorState,
  resetSuccessState,
} from "@/app/redux/slices/positionSlice";

const PositionDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, position, message, success } = useSelector(
    (state: RootState) => state.position
  );

  const { isLogged } = useSelector((state: RootState) => state.admin);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!isLogged) {
      router.push("/admin/login");
    }
  }, [isLogged]);

  useEffect(() => {
    if (id) {
      dispatch(GetPositionById(id));
    }
  }, [id]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetSuccessState());
      }, 1000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 7000);
    }
  }, [error]);

  useEffect(() => {
    if (position) {
      setData({
        name: position.name || "",
        description: position.description || "",
      });
    }
  }, [position]);

  const handleSave = () => {
    dispatch(
      UpdatePosition({ id: id, name: data.name, description: data.description })
    );
    setIsEdit(false);
  };

  const handleDelete = () => {
    dispatch(DeletePosition(id));
    setShowModal(false);

    setTimeout(() => {
      router.push("/positions/view");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 text-customBlue bg-white">
      {!position && !loading && (
        <div className="flex flex-col items-center align-middle mt-10">
          <IconAlertCircle size={40} className="text-customBlue" />
          <h1 className="text-customBlue">{message}</h1>
        </div>
      )}
      {position && (
        <Card
          shadow="xl"
          radius="lg"
          className="bg-white w-full max-w-2xl p-6  border border-customBlue hover:shadow-2xl"
        >
          {success && <Notification color="green">{message}</Notification>}
          {error && <Notification color="red">{error}</Notification>}
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
                <TextInput
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="text-2xl font-bold text-customBlue"
                />
              ) : (
                <Text className="text-2xl font-bold text-customBlue">
                  {position?.name}
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
            <Text className="text-customBlue">{position?.description}</Text>
          )}

          {position?.children && position.children.length > 0 && (
            <>
              <Divider className="my-4" />
              <Text className="text-xl font-semibold text-customBlue">
                Team Members
              </Text>
              <div className="mt-2 flex flex-wrap gap-2">
                {position.children.map((member: any) => (
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
            >
              {isEdit ? "Save" : "Update"}
            </Button>
            <Button
              leftSection={<IconTrash size={18} />}
              variant="outline"
              className="mt-6 outline-2 outline-customBlue text-customBlue"
              onClick={() => setShowModal(true)}
            >
              Delete
            </Button>
          </div>
          <Modal
            opened={showModal}
            onClose={() => setShowModal(false)}
            title="All positions under the hierarchy will be deleted. Are you sure?"
            centered
            styles={{
              header: { backgroundColor: "#154c79" },
              title: { color: "#fff" },
              close: { color: "#fff" },
            }}
          >
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                color="red"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Modal>
        </Card>
      )}
    </div>
  );
};

export default PositionDetails;
