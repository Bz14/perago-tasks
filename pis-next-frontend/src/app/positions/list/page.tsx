"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import positionApi from "@/app/api/api";
import { Card, Container, Text, Loader, Button } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconList } from "@tabler/icons-react";
import { useState } from "react";

const ListPositions = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["listOfPositions"],
    queryFn: () => positionApi.getPositionList(page),
    // placeholderData: keepPreviousData,
  });
  return (
    <Container className="mt-28 mx-auto w-1/2 shadow-lg  bg-white rounded-lg p-5">
      <Text className="text-center my-5 text-lg text-customBlue">
        List of Positions
      </Text>
      {isLoading && <Loader />}
      {error && <span className="text-canter mt-28">{error.message}</span>}
      <Container className="grid grid-cols-2 gap-4">
        {data?.positions &&
          data.positions.map((position: { id: string; name: string }) => (
            <Card
              className="flex flex-row gap-2 text-customBlue bg-white p-2 rounded-lg shadow-sm hover:shadow-lg border"
              key={position.id}
            >
              <IconList />
              {position.name}
            </Card>
          ))}
      </Container>
      <Container className="flex flex-row justify-center items-center gap-2 mt-5">
        <Button
          className="bg-customBlue text-white"
          onClick={() => setPage(Math.max(data?.pagination.prevPage ?? 0, 0))}
          disabled={data?.pagination.prevPage === null}
        >
          <IconArrowLeft />
        </Button>
        <Button
          className="bg-customBlue text-white"
          onClick={() => setPage(data?.pagination.nextPage ?? 0)}
          disabled={data?.pagination.nextPage === null}
        >
          <IconArrowRight />
        </Button>
      </Container>
    </Container>
  );
};

export default ListPositions;
