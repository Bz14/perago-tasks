"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import positionApi from "@/app/api/api";
import { Card, Container, Text, Loader, Button } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconList } from "@tabler/icons-react";
import { useState } from "react";
import checkAdmin from "@/app/utils/checkAdmin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ListPositions = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const router = useRouter();
  useEffect(() => {
    if (!checkAdmin()) {
      router.push("/admin/signup");
    }
  }, []);
  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["listOfPositions", page],
    queryFn: () => positionApi.getPositionList(page, limit),
    placeholderData: keepPreviousData,
  });

  const hasNextPage = data && data.length === limit;

  return (
    <Container className="mt-28 mx-auto w-1/2 shadow-lg  bg-white rounded-lg p-5">
      <Text className="text-center my-5 text-lg text-customBlue">
        List of Positions
      </Text>
      {isLoading && (
        <Container className="flex flex-row justify-center items-center mt-10">
          <Loader />
        </Container>
      )}
      {error && (
        <span className="text-center text-red-400 mt-28">{error.message}</span>
      )}
      <Container className="grid grid-cols-2 gap-4">
        {data &&
          data.map(
            (position: { id: string; name: string }) =>
              position &&
              position != undefined && (
                <Card
                  className="flex flex-row gap-2 text-customBlue bg-white p-2 rounded-lg shadow-sm hover:shadow-lg border"
                  key={position.id}
                >
                  <IconList size={20} />
                  {position.name}
                </Card>
              )
          )}
      </Container>
      <Container className="flex flex-row justify-center items-center gap-2 mt-5">
        <Button
          className="bg-customBlue text-white"
          onClick={() => {
            setPage(Math.max(page - 1, 1));
          }}
          disabled={page === 1}
        >
          <IconArrowLeft />
        </Button>
        <Button
          className="bg-customBlue text-white"
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !hasNextPage}
        >
          <IconArrowRight />
        </Button>
      </Container>
    </Container>
  );
};

export default ListPositions;
