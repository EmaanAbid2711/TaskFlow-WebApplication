import {createContext, useContext, type ReactNode} from "react";

import { useProjects } from "@/hooks/useProjects";

type ProjectsContextType =
  ReturnType<typeof useProjects>;

const ProjectsContext =
  createContext<ProjectsContextType | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function ProjectsProvider({
  children,
}: Props) {
  const projects =
    useProjects();

  return (
    <ProjectsContext.Provider
      value={projects}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  const context =
    useContext(ProjectsContext);

  if (!context) {
    throw new Error(
      "useProjectsContext must be used inside ProjectsProvider."
    );
  }

  return context;
}