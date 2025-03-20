import React, { ReactNode, useState } from "react";
import { useService } from "./share/useService";
import { Column, StatusTable } from "./UI/components/molecule/TableComponent";
import { TextFieldComponent } from "./UI/components/atoms/TextFieldComponent";
import { CheckComponent } from "./UI/components/atoms/CheckComponent";
import { State } from "./core/Issue/domain/Issue";
import { StatusTableSkeleton } from "./UI/components/molecule/SkeletonTableComponent";
import { CheckGroup, Label } from "./UI/components/molecule/CheckGroup/CheckGroup";
import { useDebouncedValue } from "./share/useDebouncedValue";
import { getAllIssues } from "./core/Issue/infrastructure/interceptors/getAllIssues";
import { getIssuesByState } from "./core/Issue/infrastructure/interceptors/getIssuesByState";
import { getIssuesByTitle } from "./core/Issue/infrastructure/interceptors/getIssuesByTitle";
import { CommentsList } from "./core/comments/UI/CommentsList/CommentsList"


const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "state", label: "State" },
];

export const IssuesList = (): ReactNode => {
  const [stateFilter, setStateFilter] = useState<State | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const fetchIssues = () => {
    if (debouncedSearchTerm) {
      return getIssuesByTitle(debouncedSearchTerm);
    }
    if (stateFilter !== null) {
      return getIssuesByState(stateFilter);
    }
    return getAllIssues();
  };

  const { data, loading } = useService(fetchIssues, { dependencies: [debouncedSearchTerm, stateFilter] });

  return (
    <>
      <TextFieldComponent
        label="Search Issues"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <CheckGroup legend="Filter Issues">
        <Label role="radio" aria-checked={stateFilter === null}>
          <CheckComponent checked={stateFilter === null} handleChange={() => setStateFilter(null)} />
          All
        </Label>
        <Label role="radio" aria-checked={stateFilter === State.open}>
          <CheckComponent checked={stateFilter === State.open} handleChange={() => setStateFilter(State.open)} />
          Open
        </Label>
        <Label role="radio" aria-checked={stateFilter === State.close}>
          <CheckComponent checked={stateFilter === State.close} handleChange={() => setStateFilter(State.close)} />
          Closed
        </Label>
      </CheckGroup>

      {loading ? <StatusTableSkeleton /> : <StatusTable columns={columns} row={data || []} onRowClick={(issue) => setSelectedIssueId(issue.id)} />}
      {selectedIssueId && <CommentsList  issueId={selectedIssueId} />}
    </>
  );
};

export const App = () => {
  return <IssuesList />;
};
