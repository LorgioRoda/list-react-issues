import React, { ReactNode, useState } from "react";
import { useService } from "./share/useService";
import { Column, StatusTable } from "./UI/components/molecule/TableComponent/TableComponent";
import { Issue, State } from "./core/Issue/domain/Issue";
import { StatusTableSkeleton } from "./UI/components/molecule/TableComponent/SkeletonTableComponent";
import { useDebouncedValue } from "./share/useDebouncedValue";
import { getIssues } from "./core/Issue/infrastructure/interceptors/getIssues";
import { CommentsList } from "./core/comment/UI/CommentsList/CommentsList"
import { ModalComponent } from "./UI/components/molecule/Modal/Modal";
import { IssueFilters } from "./core/Issue/UI/IssueFilters/IssueFilters";
import { ErrorPage } from "./core/error/UI/ErrorPage";


const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "state", label: "State" },
];

export const IssuesList = (): ReactNode => {
  const [stateFilter, setStateFilter] = useState<State | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const debouncedSearchTerm = useDebouncedValue(searchTerm);
  const { data, loading, error } = useService(
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
          row={data ?? []}
          onRowClick={(issue) => setSelectedIssue(issue)}
        >
          {error && <ErrorPage code={error.code} message={error.message} />}
        </StatusTable>
      )}

      <ModalComponent open={selectedIssue} handleClose={() => setSelectedIssue(null)}>
        {selectedIssue && <CommentsList issue={selectedIssue}  />}
      </ModalComponent>
    </>
  );
};

export const App = () => {
  return <IssuesList />;
};
