import {
  IconAlertCircle,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

import { Loader, Tree, Container, Text } from "@mantine/core";
import { TreeNode, OrganizationNode } from "@/app/interfaces/interface";

interface PositionTreeProps {
  positions: OrganizationNode[];
  isLoading: boolean;
  onSelectNode: (id: string | null) => void;
}

const PositionTree: React.FC<PositionTreeProps> = ({
  positions,
  isLoading,
  onSelectNode,
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
    <Container
      size="responsive"
      className="w-2/3 bg-white p-6 rounded-lg shadow-lg mt-28"
    >
      <Text
        size="xl"
        className="text-2xl font-bold text-center text-customBlue"
      >
        Organization Chart
      </Text>
      <Container className="mt-2">
        {isLoading && (
          <Container className="flex flex-row justify-center items-center mt-10">
            <Loader />
          </Container>
        )}
        {!positions && !isLoading && (
          <Container className="flex flex-col items-center align-middle mt-10">
            <IconAlertCircle size={40} className="text-customBlue" />
            <Text className="text-customBlue">Positions not found</Text>
          </Container>
        )}

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
            <Container
              {...elementProps}
              className="flex items-center hover:bg-gray-100 py-1 w-full cursor-pointer rounded-lg "
              style={{ paddingLeft: `${level * 35}px` }}
            >
              {hasChildren && (
                <span className="cursor-pointer" onClick={elementProps.onClick}>
                  {expanded ? (
                    <IconChevronDown size={16} />
                  ) : (
                    <IconChevronRight size={16} />
                  )}
                </span>
              )}

              <Container
                className="flex items-center justify-between w-full"
                onClick={() => onSelectNode(node.value)}
              >
                <span
                  className={`text-lg flex-1 ${
                    expanded ? "font-bold text-customBlue" : ""
                  }`}
                >
                  {node.label}
                </span>
              </Container>
            </Container>
          )}
        />
      </Container>
    </Container>
  );
};

export default PositionTree;
