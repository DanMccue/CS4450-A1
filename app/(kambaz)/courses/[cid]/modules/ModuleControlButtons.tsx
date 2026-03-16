import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
      />
      <FaTrash
        className="text-danger me-2"
        onClick={() => deleteModule(moduleId)}
        style={{ cursor: "pointer" }}
      />
      <GreenCheckmark />
      <FaPlus className="fs-4 mx-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}