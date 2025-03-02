import {
  IconAlertCircle,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

import { Loader, Tree, Notification } from "@mantine/core";
import { TreeNode, OrganizationNode } from "@/app/interfaces/interface";

interface PositionTreeProps {
  positions: OrganizationNode[];
  isLoading: boolean;
  //   error: string | null;
}

const PositionTree: React.FC<PositionTreeProps> = ({
  positions,
  isLoading,
  //   error,
}) => {
  const transformNodes = (nodes: OrganizationNode[]): TreeNode[] => {
    return (
      nodes &&
      nodes.map((node) => ({
        value: node.id,
        label: node.name,
        children:
          node.children && node.children.length > 0
            ? transformNodes(node.children)
            : [],
      }))
    );
  };
  return (
    <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg mt-28">
      <h2 className="text-2xl font-bold text-center text-customBlue">
        Organization Chart
      </h2>
      <div className="mt-2">
        {isLoading && (
          <div className="flex flex-row justify-center items-center mt-10">
            <Loader />
          </div>
        )}
        {!positions && !isLoading && (
          <div
            className="flex flex-col items-center align-middle mt-10
          "
          >
            <IconAlertCircle size={40} className="text-customBlue" />
            <h1 className="text-customBlue">Positions not found</h1>
          </div>
        )}

        {/* {error && <Notification>Error fetching positions</Notification>} */}
        <Tree
          data={positions ? transformNodes(positions) : []}
          levelOffset={35}
          renderNode={({
            node,
            expanded,
            hasChildren,
            elementProps,
            level,
          }) => (
            <div
              {...elementProps}
              className="flex items-center hover:bg-gray-100 py-1 w-full cursor-pointer rounded-lg "
              style={{ paddingLeft: `${level * 35}px` }}
            >
              {hasChildren && (
                <span
                  className="mr-2 cursor-pointer"
                  onClick={elementProps.onClick}
                >
                  {expanded ? (
                    <IconChevronDown size={16} />
                  ) : (
                    <IconChevronRight size={16} />
                  )}
                </span>
              )}

              <div className="flex items-center justify-between w-full ">
                <span
                  className={`text-lg flex-1 ${
                    expanded ? "font-bold text-customBlue" : ""
                  }`}
                  onClick={elementProps.onClick}
                >
                  {node.label}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PositionTree;
