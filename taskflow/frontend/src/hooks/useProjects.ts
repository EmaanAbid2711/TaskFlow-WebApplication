import { useEffect, useState } from "react";

import { getProjectsApi } from "@/api/project.api";
import { getProjectTasksApi } from "@/api/task.api";
import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";
import { mapTasks } from "@/mappers/task.mapper";

export function useProjects() {

  const [projects,setProjects] =
    useState<Project[]>([]);

  const [selectedProject,setSelectedProject] =
    useState<Project | null>(null);

  const [tasks,setTasks] =
    useState<Task[]>([]);

  const [loading,setLoading] =
    useState(true);

  const loadProjects = async()=>{
    try{
      const response =
        await getProjectsApi();

      setProjects(
        response.data
      );

      if(response.data.length){

        setSelectedProject(
          response.data[0]
        );

      }
    }
    finally{
      setLoading(false);

    }
  };

  const loadTasks = async(
    projectId:string
  )=>{

    const response =
      await getProjectTasksApi(
        projectId
      );

    setTasks(
      mapTasks(
        response.data
      )
    );
  };

  useEffect(()=>{
    loadProjects();
  },[]);

  useEffect(()=>{
    if(selectedProject){
      loadTasks(
        selectedProject.id
      );
    }

  },[selectedProject]);

  return {
    loading,
    projects,
    selectedProject,
    setSelectedProject,
    tasks,
    setTasks,
    loadTasks,
    loadProjects,
  };

}