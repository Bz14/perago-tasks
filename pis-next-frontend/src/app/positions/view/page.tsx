"use client";
import { useEffect, useState } from "react";
import { OrganizationNode } from "@/app/interfaces/interface";
import {
  useGetPositionsQuery,
  useGetPositionByIdQuery,
} from "@/app/redux/slices/positionSlice";
import PositionDetail from "./components/positionDetail";
import PositionTree from "./components/position-tree";

const ViewPositionHierarchy = () => {
  const { data: positions, isLoading, error } = useGetPositionsQuery(undefined);
  const [selectedNodeId, onSelectedNode] = useState<string | null>(null);

  const { data: selectedPosition, isLoading: isFetchingPosition } =
    useGetPositionByIdQuery(selectedNodeId, {
      skip: !selectedNodeId,
    });

  const handleSelectNode = (id: string | null) => {
    onSelectedNode(id);
  };

  return (
    <div className="flex flex-row mx-5 mt-5 gap-2 items-start">
      <PositionTree
        positions={positions || []}
        isLoading={isLoading}
        onSelectNode={handleSelectNode}
        // error={error.data.message || "Error"}
      />
      <PositionDetail position={selectedPosition} />
    </div>
  );
};

export default ViewPositionHierarchy;
