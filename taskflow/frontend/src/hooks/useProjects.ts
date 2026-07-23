import { useEffect, useState } from "react";

import {getProjectsApi, getProjectApi} from "@/api/project.api";
import {getProjectTasksApi} from "@/api/task.api";
import type { Project } from "@/interfaces/project";
import type { Task } from "@/interfaces/projects";
import {mapTasks} from "@/mappers/task.mapper";

export function useProjects() {

  const [projects,setProjects] =
    useState<Project[]>([]);

  const [selectedProject,setSelectedProject] =
    useState<Project | null>(null);

  const [tasks,setTasks] =
    useState<Task[]>([]);

  const [loading,setLoading] =
    useState(true);

  /*
  |--------------------------------------------------------------------------
  | Load Projects
  |--------------------------------------------------------------------------
  */
  const loadProjects = async()=>{

    try{
      const response =
        await getProjectsApi();

      const data =
        response.data;

      setProjects(data);

      if(
        data.length > 0 &&
        !selectedProject
      ){
        setSelectedProject(
          data[0]
        );

      }
    }
    catch(error){

      console.log(error);
    }
    finally{

      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Refresh single project stats
  |--------------------------------------------------------------------------
  */
  const refreshProjectStats =
  async(
    projectId:string
  )=>{

    try{
      const response =
        await getProjectApi(
          projectId
        );
      const updatedProject =
        response.data;

      setSelectedProject(
        previous=>{

          if(!previous)
            return updatedProject;
          return {
            ...previous,
            stats:
              calculateStats(
                updatedProject.tasks
              )
          };
        }
      );

      setProjects(
        previous=>
          previous.map(project=>
            project.id===projectId
            ?
            {
              ...project,
              stats:
                calculateStats(
                  updatedProject.tasks
                )
            }
            :
            project

          )
      );
    }
    catch(error){
      console.log(
        "Project refresh failed",
        error
      );
    }
  };
  /*
  |--------------------------------------------------------------------------
  | Load Tasks
  |--------------------------------------------------------------------------
  */

  const loadTasks =
  async(
    projectId:string
  )=>{
    try{
      const response =
        await getProjectTasksApi(
          projectId
        );

      setTasks(
        mapTasks(
          response.data
        )
      );
    }
    catch(error){

      console.log(error);

    }
  };

  /*
  |--------------------------------------------------------------------------
  | Refresh Everything
  |--------------------------------------------------------------------------
  */

  const refreshCurrentProject =
  async()=>{

    if(!selectedProject)
      return;

    await loadTasks(
      selectedProject.id
    );

    await refreshProjectStats(
      selectedProject.id
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
    setProjects,
    selectedProject,
    setSelectedProject,
    tasks,
    setTasks,
    loadProjects,
    loadTasks,
    refreshCurrentProject,
    refreshProjectStats

  };

}

function calculateStats(
  tasks:any[]
){

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      task =>
      task.status==="COMPLETED"
    )
    .length;

  const progress =
    totalTasks===0
    ?
    0
    :
    Math.round(
      (
        completedTasks /
        totalTasks
      )
      *
      100
    );


  return {
    totalTasks,
    completedTasks,
    progress

  };

}