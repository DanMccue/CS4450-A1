"use client";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  addModule,
  deleteModule,
  updateModule,
  editModule,
} from "./reducer";

type Lesson = { _id: string; name: string };
type Module = {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
};

export default function Modules() {
  const { cid } = useParams();
  const courseId = (Array.isArray(cid) ? cid[0] : cid) ?? "";
  const { modules } = useSelector(
    (state: RootState) => state.modulesReducer
  ) as { modules: Module[] };
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");

  const handleAddModule = () => {
    const trimmedName = moduleName.trim();
    if (!trimmedName) {
      return;
    }
    dispatch(addModule({ name: trimmedName, course: courseId }));
    setModuleName("");
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module) => module.course === courseId)
          .map((module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({
                          ...module,
                          name: e.target.value,
                        })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateModule({ ...module, editing: false })
                        );
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId: string) =>
                    dispatch(deleteModule(moduleId))
                  }
                  editModule={(moduleId: string) =>
                    dispatch(editModule(moduleId))
                  }
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}