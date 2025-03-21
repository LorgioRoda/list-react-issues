import React, { ReactNode, useState } from "react";
import { useService } from "./share/useService";
import { Column, StatusTable } from "./UI/components/molecule/TableComponent";
import { Issue, State } from "./core/Issue/domain/Issue";
import { StatusTableSkeleton } from "./UI/components/molecule/SkeletonTableComponent";
import { useDebouncedValue } from "./share/useDebouncedValue";
import { getIssues } from "./core/Issue/infrastructure/interceptors/getIssues";
import { CommentsList } from "./core/comment/UI/CommentsList/CommentsList"
import { ModalComponent } from "./UI/components/molecule/Modal/Modal";
import { IssueFilters } from "./core/Issue/UI/IssueFilters/IssueFilters";


const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "state", label: "State" },
];

export const IssuesList = (): ReactNode => {
  const [stateFilter, setStateFilter] = useState<State | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const debouncedSearchTerm = useDebouncedValue(searchTerm);
  const { data, loading } = useService(
    () => getIssues({ search: debouncedSearchTerm, state: stateFilter }),
    { dependencies: [debouncedSearchTerm, stateFilter] }
  );
  
  return (
    <>
      <IssueFilters
        search={searchTerm}
        onSearchChange={setSearchTerm}
        stateFilter={stateFilter}
        onStateChange={setStateFilter}
      />

      {loading ? (
        <StatusTableSkeleton />
      ) : (
        <StatusTable
          columns={columns}
          row={data || []}
          onRowClick={(issue) => setSelectedIssue(issue)}
        />
      )}

      <ModalComponent open={selectedIssue} handleClose={() => setSelectedIssue(null)}>
        <CommentsList issue={selectedIssue}  />
      </ModalComponent>
    </>
  );
};

export const App = () => {
  return <IssuesList />;
};
