"use client";
import { useGetPositionsQuery } from "@/app/redux/slices/positionSlice";
import PositionDetail from "./components/positionDetail";
import PositionTree from "./components/position-tree";

const ViewPositionHierarchy = () => {
  const { data: positions, isLoading, error } = useGetPositionsQuery(undefined);

  return (
    <div className="flex flex-row mx-5 mt-5 gap-2 items-start">
      <PositionTree
        positions={positions || []}
        isLoading={isLoading}
        // error={error.data.message || "Error"}
      />
      <PositionDetail />
    </div>
  );
};

export default ViewPositionHierarchy;
