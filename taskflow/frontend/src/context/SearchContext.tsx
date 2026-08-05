import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import { getTeamMembersService } from "@/services/team.service";
import { useDashboard } from "./DashboardContext";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  type: "project" | "member";
  route: string;
}

interface SearchContextType {
  results: SearchItem[];
  search: (query: string) => SearchItem[];
  loading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const { stats } = useDashboard();
  const [members, setMembers] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getTeamMembersService();
        const formatted = data.map((item: any) => ({
          id: item.member.id,
          title: item.member.name,
          subtitle: item.member.email,
          type: "member" as const,
          route: `/team/${item.member.id}`,
        }));

        setMembers(formatted);
      } catch (error) {
        console.error("Search members loading failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const projects: SearchItem[] = stats.projectProgress.map((project) => ({
    id: project.id,
    title: project.name,
    subtitle: "Project",
    type: "project" as const,
    route: `/projects?project=${project.id}`,
  }));

  const results = [...projects, ...members];

  const search = (query: string) => {
    if (!query.trim()) {
      return [];
    }

    return results.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <SearchContext.Provider
      value={{
        results,
        search,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }

  return context;
}