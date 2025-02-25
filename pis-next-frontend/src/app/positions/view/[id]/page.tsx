"use client";

import { Card, Text, Button, Divider, Avatar, Badge } from "@mantine/core";
import { IconArrowLeft, IconEdit, IconTrash } from "@tabler/icons-react";

const position = {
  id: "1",
  name: "CEO",
  hierarchy: "Top Executive",
  description:
    "The Chief Executive Officer (CEO) oversees the entire organization.",
  team: ["CTO", "CFO", "COO", "HR"],
};

const PositionDetails = () => {
  if (!position) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-6 text-customBlue bg-white">
      <Card shadow="xl" radius="lg" className="bg-white w-full max-w-2xl p-6">
        <div className="flex items-center space-x-4">
          <Avatar
            size={60}
            radius="xl"
            className="bg-customBlue text-white text-xl shadow-xl"
          >
            {position.name.charAt(0)}
          </Avatar>
          <div>
            <Text className="text-2xl font-bold text-customBlue">
              {position.name}
            </Text>
            <Badge size="lg" className="mt-1 bg-customBlue text-white">
              {position.hierarchy}
            </Badge>
          </div>
        </div>

        <Divider className="my-4" />
        <Text className="text-customBlue">{position.description}</Text>

        {position.team && position.team.length > 0 && (
          <>
            <Divider className="my-4" />
            <Text className="text-xl font-semibold text-customBlue">
              Team Members
            </Text>
            <div className="mt-2 flex flex-wrap gap-2">
              {position.team.map((member: string, index: number) => (
                <Badge
                  key={index}
                  className="text-white bg-customBlue"
                  size="md"
                >
                  {member}
                </Badge>
              ))}
            </div>
          </>
        )}
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
