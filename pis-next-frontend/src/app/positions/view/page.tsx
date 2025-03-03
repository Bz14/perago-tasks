"use client";
import { useEffect, useState } from "react";
import {
  useGetPositionsQuery,
  useGetPositionByIdQuery,
} from "@/app/redux/slices/positionSlice";
import PositionDetail from "./components/positionDetail";
import PositionTree from "./components/position-tree";
import { useRouter } from "next/navigation";
import checkAdmin from "@/app/utils/checkAdmin";

const ViewPositionHierarchy = () => {
  const router = useRouter();

  // useEffect(() => {
  //   if (!checkAdmin()) {
  //     router.push("/admin/login");
  //   }
  // }, []);

  const { data: positions, isLoading } = useGetPositionsQuery(undefined);
  const [selectedNodeId, onSelectedNode] = useState<string | null>(null);

  const { data: selectedPosition } = useGetPositionByIdQuery(selectedNodeId, {
    skip: !selectedNodeId,
  });

  const handleSelectNode = (id: string | null) => {
    onSelectedNode(id);
  };

  return (
    <div className="flex flex-row mx-5 mt-5 gap-2 items-start mb-4">
      <PositionTree
        positions={positions || []}
        isLoading={isLoading}
        onSelectNode={handleSelectNode}
      />
      <PositionDetail position={selectedPosition || null} />
    </div>
  );
};

export default ViewPositionHierarchy;
