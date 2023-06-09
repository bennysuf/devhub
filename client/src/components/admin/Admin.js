import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";

export const AdminContext = createContext(null);

export default function Admin({ admin }) {
  const [projects, setProjects] = useState([]);
  const [reload, setReload] = useState("");

  useEffect(() => {
    fetch(`/projects/${admin.id}`)
      .then((r) => r.json())
      .then((d) => setProjects(d));
  }, [reload]);

  return (
    <AdminContext.Provider
      value={{
        projects,
        setProjects,
        setReload,
      }}
    >
      <div className="hide-on-mobile">
        <AdminNavBar />
      </div>
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="projects-page/*" element={<ProjectsPage />} />
        {/* <Route path="projects-page/*" element={<ProjectsPage projects={projects} setProjects={setProjects}/>} /> */}
      </Routes>
    </AdminContext.Provider>
  );
}
