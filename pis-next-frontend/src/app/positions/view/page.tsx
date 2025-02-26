"use client";

import { useEffect, useState } from "react";
import {
  IconAlertCircle,
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import { GetPositions } from "@/app/redux/slices/positionSlice";
import { Loader } from "@mantine/core";

type OrgNode = {
  id: string;
  name: string;
  description: string;
  children?: OrgNode[];
};

const OrgNodeComponent = ({ node }: { node: OrgNode }) => {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
        {hasChildren && (
          <span className="mr-2">
            {isOpen ? (
              <IconChevronDown size={16} onClick={() => setIsOpen(!isOpen)} />
            ) : (
              <IconChevronRight size={16} onClick={() => setIsOpen(!isOpen)} />
            )}
          </span>
        )}
        <div
          className={`flex items-center justify-between w-full ${
            isOpen ? "font-bold text-customBlue" : ""
          }`}
        >
          <span className="text-lg" onClick={() => setIsOpen(!isOpen)}>
            {node.name}
          </span>
          <IconPlus
            size={15}
            onClick={() => route.push(`/positions/view/${node.id}`)}
          />
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="ml-4 border-l-2 border-gray-400 pl-3">
          {node.children &&
            node.children.map((child, index) => (
              <OrgNodeComponent key={index} node={child} />
            ))}
        </div>
      )}
    </div>
  );
};

const OrgChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, positions, message } = useSelector(
    (state: RootState) => state.position
  );

  useEffect(() => {
    dispatch(GetPositions());
  }, []);

  return (
    <div className="min-h-screen">
      <div className="md:max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-28">
        <h2 className="text-2xl font-bold text-center text-customBlue">
          Organization Chart
        </h2>
        <div className="mt-2">
          {loading && <Loader />}
          {!positions && !loading && (
            <div
              className="flex flex-col items-center align-middle mt-10
          "
            >
              <IconAlertCircle size={40} className="text-customBlue" />
              <h1 className="text-customBlue">{message}</h1>
            </div>
          )}
          {positions &&
            positions.map((position: OrgNode, index: number) => (
              <OrgNodeComponent key={index} node={position} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
