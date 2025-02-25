"use client";

import { useState } from "react";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type OrgNode = {
  name: string;
  children?: OrgNode[];
};

const orgStructure: OrgNode = {
  name: "CEO",
  children: [
    {
      name: "CTO",
      children: [
        {
          name: "Project Manager",
          children: [
            {
              name: "Product Owner",
              children: [
                {
                  name: "Tech Lead",
                  children: [
                    {
                      name: "Frontend Developer",
                      children: [
                        {
                          name: "React Developer",
                          children: [
                            {
                              name: "React Native Developer",
                              children: [
                                {
                                  name: "Developer",
                                  children: [
                                    {
                                      name: "Developer",
                                      children: [{ name: "Dev" }],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { name: "Backend Developer" },
                    { name: "DevOps Engineer" },
                  ],
                },
                { name: "QA Engineer" },
                { name: "Scrum Master" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "CFO",
      children: [
        {
          name: "Chef Accountant",
          children: [
            { name: "Financial Analyst" },
            { name: "Account and Payable" },
          ],
        },
        { name: "Internal Audit" },
      ],
    },
    {
      name: "COO",
      children: [
        { name: "Product Manager" },
        { name: "Operation Manager" },
        { name: "Customer Relation" },
      ],
    },
    { name: "HR" },
  ],
};

const OrgNodeComponent = ({ node }: { node: OrgNode }) => {
  const route = useRouter();
  const id = 1;
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
            onClick={() => route.push(`/positions/view/${id}`)}
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
  return (
    <div className="md:max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-28">
      <h2 className="text-2xl font-bold text-center text-customBlue">
        Organization Chart
      </h2>
      <div className="mt-2">
        <OrgNodeComponent node={orgStructure} />
      </div>
    </div>
  );
};

export default OrgChart;
