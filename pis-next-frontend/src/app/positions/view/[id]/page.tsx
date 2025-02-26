"use client";

import {
  Card,
  Text,
  Button,
  Divider,
  Avatar,
  Badge,
  Loader,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store/store";
import { GetPositionById } from "@/app/redux/slices/positionSlice";
import { IconAlertCircle } from "@tabler/icons-react";

const PositionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, position, message } = useSelector(
    (state: RootState) => state.position
  );

  useEffect(() => {
    dispatch(GetPositionById(id));
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen p-6 text-customBlue bg-white">
      {loading && <Loader />}
      {!position && !loading && (
        <div
          className="flex flex-col items-center align-middle mt-10
          "
        >
          <IconAlertCircle size={40} className="text-customBlue" />
          <h1 className="text-customBlue">{message}</h1>
        </div>
      )}
      <Card shadow="xl" radius="lg" className="bg-white w-full max-w-2xl p-6">
        <div className="flex items-center space-x-4">
          <Avatar
            size={60}
            radius="xl"
            className="bg-customBlue text-white text-xl shadow-xl"
          >
            {position && position.name.charAt(0)}
          </Avatar>
          <div>
            <Text className="text-2xl font-bold text-customBlue">
              {position && position.name}
            </Text>
            <Badge size="lg" className="mt-1 bg-customBlue text-white">
              {position && position.hierarchy}
            </Badge>
          </div>
        </div>

        <Divider className="my-4" />
        <Text className="text-customBlue">
          {position && position.description}
        </Text>

        {position && position.children && position.children.length > 0 && (
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

        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            leftSection={<IconEdit size={18} />}
            className="mt-6 bg-customBlue text-white"
          >
            Update
          </Button>
          <Button
            leftSection={<IconTrash size={18} />}
            variant="outline"
            className="mt-6 outline-2 outline-customBlue text-customBlue"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PositionDetails;
