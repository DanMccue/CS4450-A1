"use client";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  setModules,
  addModule,
  updateModule,
  editModule,
} from "./reducer";
import * as client from "../../client";

type Lesson = { _id: string; name: string };
type Module = {
  _id: string;
  name: string;
  description?: string;
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
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { role?: string } | null };
  const canManageModules = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    if (!courseId) {
      dispatch(setModules([]));
      return;
    }
    client
      .findModulesForCourse(courseId)
      .then((modulesFromServer) => {
        dispatch(setModules(modulesFromServer));
      })
      .catch(() => {
        dispatch(setModules([]));
      });
  }, [courseId, dispatch]);

  const onCreateModuleForCourse = async () => {
    const trimmedName = moduleName.trim();
    if (!trimmedName) {
      return;
    }
    const newModule = await client.createModuleForCourse(courseId, {
      name: trimmedName,
      description: "",
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((module) => module._id !== moduleId)));
  };

  const onUpdateModule = async (module: Module) => {
    const moduleToSave = { ...module };
    delete moduleToSave.editing;
    await client.updateModule(moduleToSave);
    dispatch(
      setModules(
        modules.map((existingModule) =>
          existingModule._id === module._id ? module : existingModule
        )
      )
    );
  };

  return (
    <div>
      {canManageModules && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module) => {
            const isEditing = canManageModules && Boolean(module.editing);
            return (
              <ListGroupItem
                key={module._id}
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!isEditing && module.name}
                {isEditing && (
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
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                {canManageModules && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId: string) => onRemoveModule(moduleId)}
                    editModule={(moduleId: string) =>
                      dispatch(editModule(moduleId))
                    }
                  />
                )}
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
            );
          })}
      </ListGroup>
    </div>
  );
}