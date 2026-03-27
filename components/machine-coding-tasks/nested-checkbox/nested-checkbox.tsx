// NESTEDCHECKBOX.tsx (Combined logic/rendering file)
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BsCheck2All, BsCheckLg, BsDash, BsDatabase } from "react-icons/bs";
import { LuListTree } from "react-icons/lu";

export interface NestedItem {
  id: string;
  label: string;
  children?: NestedItem[];
  checked?: boolean;
}

export const NESTED_DATA: NestedItem[] = [
  {
    id: "sports",

    label: "Sports",

    children: [
      {
        id: "team_sports",

        label: "Team Sports",

        children: [
          { id: "football", label: "Football" },

          { id: "basketball", label: "Basketball" },
        ],
      },

      {
        id: "individual_sports",

        label: "Individual Sports",

        children: [
          { id: "tennis", label: "Tennis" },

          { id: "athletics", label: "Athletics" },
        ],
      },
    ],
  },

  {
    id: "technology",

    label: "Technology",

    children: [
      {
        id: "programming",

        label: "Programming",

        children: [
          { id: "javascript", label: "JavaScript" },

          { id: "python", label: "Python" },

          { id: "java", label: "Java" },
        ],
      },
    ],
  },

  {
    id: "hobbies",

    label: "Hobbies",

    children: [
      { id: "painting", label: "Painting" },

      { id: "reading", label: "Reading" },
    ],
  },
];

const Checkboxes = ({
  data,
  checked,
  setChecked,
}: {
  data: any;
  checked: any;
  setChecked: any;
}) => {
  const handleChange = (isChecked: boolean, node: any) => {
    // ... (handleChange logic remains unchanged as it only deals with state updates)
    setChecked((prev: any) => {
      const newState = { ...prev, [node.id]: isChecked };

      // 1. Update Children
      const updateChildren = (node: any) => {
        node.children?.forEach((child: any) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);

      // 2. Update Parent
      const updateParent = (node: any, root: any) => {
        const findParent = (currentNode: any, targetId: string): any | null => {
          if (!currentNode.children) return null;
          for (let child of currentNode.children) {
            if (child.id === targetId) return currentNode;
            const found = findParent(child, targetId);
            if (found) return found;
          }
          return null;
        };

        const parent = root
          .map((currentNode: any) => findParent(currentNode, node.id))
          .filter(Boolean)[0];

        if (parent) {
          const allChecked = parent.children.every(
            (child: any) => newState[child.id]
          );
          newState[parent.id] = allChecked;
          updateParent(parent, root);
        }
      };
      updateParent(node, NESTED_DATA);

      return newState;
    });
  };

  return (
    // Updated border and margin for dark mode visibility
    <div className="flex flex-col pl-6 relative border-l border-violet-300 dark:border-violet-900/30 ml-3">
      {data &&
        data.length > 0 &&
        data.map((node: any) => (
          <div className="relative flex flex-col items-start" key={node.id}>
            {/* Horizontal Connector Line */}
            <div className="absolute -left-6 top-5 w-6 h-px bg-violet-300 dark:bg-violet-900/30"></div>

            {/* Checkbox and Label Styling */}
            <label className="group flex items-center gap-2 cursor-pointer bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-violet-100 dark:hover:border-violet-700 hover:shadow-sm p-1 pr-4 rounded-xl transition-all duration-200 w-full max-w-xs">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={checked[node.id] || false}
                  onChange={(e) => handleChange(e.target.checked, node)}
                  // Updated checkbox appearance for dark mode
                  className="peer appearance-none h-5 w-5 border-2 border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-gray-700 checked:bg-violet-600 checked:border-violet-600 transition-all duration-200 cursor-pointer"
                />
                <BsCheckLg className="absolute text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200 scale-90" />
              </div>

              <span
                className={`font-medium text-sm sm:text-base transition-colors select-none ${
                  checked[node.id]
                    ? "text-violet-700 dark:text-violet-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400"
                }`}
              >
                {node.label}
              </span>
            </label>

            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        ))}
    </div>
  );
};

function NESTEDCHECKBOX() {
  const [checked, setChecked] = useState({ id: false });
  const [submitted, setSubmitted] = useState<any>([]);
  const [open, setOpen] = useState(false);

  // 🧩 Build nested tree with isSelected flag
  const buildSelectedTree = (data: any, checked: any) => {
    return data.map((node: any) => {
      const isSelected = !!checked[node.id];
      return {
        ...node,
        isSelected,
        children: node.children
          ? buildSelectedTree(node.children, checked)
          : undefined,
      };
    });
  };

  // 🚀 Handle Submit
  const handleSubmit = () => {
    const selectedTree = buildSelectedTree(NESTED_DATA, checked);
    setSubmitted(selectedTree);
    console.log("Final Data for DB:", selectedTree);
    setOpen(true);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6 pb-10">
      {/* LEFT COLUMN: The Interactive Tree */}
      <section className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-white/60 dark:border-gray-700/60 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl shadow-xl shadow-violet-100/50 dark:shadow-violet-950/50 p-6 flex flex-col h-full min-h-[500px]">
        {/* Decorative Blob */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200/30 dark:bg-purple-900/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <LuListTree className="text-violet-600 dark:text-violet-400" />
            Category Selection
          </h2>
          <span className="text-xs font-medium text-violet-500 dark:text-violet-300 bg-violet-50 dark:bg-violet-900 px-2 py-1 rounded-full">
            Recursive Mode
          </span>
        </div>

        {/* Checkbox Renderer Container */}
        <div className="bg-white/40 dark:bg-gray-900/40 rounded-2xl border border-white/60 dark:border-gray-700/60 shadow-inner p-6 flex-grow overflow-x-auto">
          {/* Offset margin to pull the first level items back slightly */}
          <div className="-ml-6">
            <Checkboxes
              data={NESTED_DATA}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end px-2">
          <button
            onClick={handleSubmit}
            className="relative overflow-hidden bg-violet-600 dark:bg-violet-700 hover:bg-violet-700 dark:hover:bg-violet-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-violet-200 dark:shadow-violet-900 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Submit Selection</span>
            <BsDatabase className="text-sm opacity-80" />
          </button>
        </div>
      </section>

      {/* RIGHT COLUMN: Logic & Challenges */}
      <section className="lg:col-span-5 flex flex-col-reverse md:flex-col gap-6 h-full">
        {/* Challenges Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 dark:border-gray-700/60 bg-violet-50/60 dark:bg-violet-900/60 backdrop-blur-md shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
            💡 Engineering Challenges
          </h3>
          <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3 pr-2 custom-scrollbar max-h-[300px] overflow-y-auto">
            <p>
              The complexity lies in the{" "}
              <strong className="text-violet-600 dark:text-violet-400">
                bi-directional state flow
              </strong>
              :
            </p>
            <ul className="space-y-3 pl-4">
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-violet-400 before:rounded-full">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  Parent → Child:
                </span>
                <br />
                When a parent updates, `updateChildren` recursively forces all
                descendants to match the new state.
              </li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-purple-400 before:rounded-full">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  Child → Parent:
                </span>
                <br />
                The hardest part. `findParent` traverses the tree to locate the
                ancestor. We then check if <code>every()</code> sibling is
                checked to update the parent's status recursively upwards.
              </li>
            </ul>
          </div>
        </div>

        {/* State Preview Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 dark:border-gray-700/60 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-lg p-6 flex-grow flex flex-col">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            Flat State Preview
          </h3>
          <div className="flex-grow bg-slate-50/80 dark:bg-gray-900/80 rounded-xl border border-slate-200 dark:border-gray-700 p-4 relative group">
            <pre className="text-[10px] sm:text-xs leading-tight text-slate-600 dark:text-slate-300 font-mono h-full overflow-auto custom-scrollbar max-h-[200px]">
              {JSON.stringify(checked, null, 2)}
            </pre>
          </div>
        </div>
      </section>

      {/* Submitted Data Modal (Dialog content updated for dark mode) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-white/20 dark:border-gray-700/20 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-full">
                <BsCheck2All className="text-emerald-600 dark:text-emerald-400" />
              </div>
              Submission Result
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              The recursive tree structure reconstructed with `isSelected`
              flags, ready for database storage.
            </p>
            <div className="bg-slate-900 dark:bg-black rounded-xl p-5 overflow-hidden shadow-inner">
              <pre className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap overflow-auto max-h-[50vh] custom-scrollbar">
                {JSON.stringify(submitted, null, 2)}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NESTEDCHECKBOX;
