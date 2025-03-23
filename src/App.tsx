import { ReactNode, useState } from "react";
import { useService } from "./share/useService";
import { TableComponent } from "./UI/components/molecule/TableComponent";
import { Issue, State } from "./core/Issue/domain/Issue";
import { StatusTableSkeleton } from "./UI/components/molecule/SkeletonTableComponent";
import { useDebouncedValue } from "./share/useDebouncedValue";
import { getIssues } from "./core/Issue/infrastructure/interceptors/getIssues";
import { CommentsList } from "./core/comment/UI/CommentsList/CommentsList"
import { ModalComponent } from "./UI/components/molecule/Modal";
import { IssueFilters } from "./core/Issue/UI/IssueFilters/IssueFilters";
import { ErrorPage } from "./core/error/UI/ErrorPage";


export type StateFilterUI = State | null;

export const IssuesList = (): ReactNode => {
  const [stateFilter, setStateFilter] = useState<StateFilterUI>(null);
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

    {error ? (
      <ErrorPage code={error.code} message={error.message} />
    ) : loading ? (
      <StatusTableSkeleton data-testid="skeleton-table" />
    ) : data?.length === 0 ? (
      <h3>¡Ups! We don't found Issues</h3>
    ) : (
      <TableComponent
        row={data ?? []}
        onRowClick={(issue) => setSelectedIssue(issue)}
      />
    )}

      <ModalComponent open={!!selectedIssue} handleClose={() => setSelectedIssue(null)}>
        {selectedIssue && <CommentsList issue={selectedIssue}  />}
      </ModalComponent>
    </>
  );
};

export const App = () => {
  return <IssuesList />;
};
