"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import PositionDetail from "./components/positionDetail";
import PositionTree from "./components/position-tree";
import { useRouter } from "next/navigation";
import checkAdmin from "@/app/utils/checkAdmin";
import positionApi from "@/app/api/api";

const ViewPositionHierarchy = () => {
  const router = useRouter();

  useEffect(() => {
    if (!checkAdmin()) {
      router.push("/admin/signup");
    }
  }, []);

  const { data: positions, isLoading } = useQuery({
    queryKey: ["positions"],
    queryFn: positionApi.getPositions,
  });

  const [selectedNodeId, onSelectedNode] = useState<string | null>(null);

  const { data: selectedPosition } = useQuery({
    queryKey: selectedNodeId ? ["position", selectedNodeId] : [],
    queryFn: () => positionApi.getPositionById(selectedNodeId),
    enabled: !!selectedNodeId,
  });

  const handleSelectNode = (id: string | null) => {
    onSelectedNode(id);
  };

  const handlePositionDeleted = () => {
    onSelectedNode(null);
  };

  return (
    <div className="flex flex-row mx-5 mt-5 gap-2 items-start mb-4">
      <PositionTree
        positions={positions || []}
        isLoading={isLoading}
        onSelectNode={handleSelectNode}
      />
      <PositionDetail
        position={selectedPosition || null}
        onPositionDeleted={handlePositionDeleted}
      />
    </div>
  );
};

export default ViewPositionHierarchy;
