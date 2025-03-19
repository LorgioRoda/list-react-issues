import React from "react"
import { useService } from "./share/useService";
import { getIssues } from "./core/Issue/infrastructure/interceptors/getIssues";
import { Column, StatusTable } from "./UI/components/molecule/TableComponent";
import { TextFieldComponent } from "./UI/components/atoms/TextFieldComponent";
import { CheckComponent } from "./UI/components/atoms/CheckComponent";


const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "state", label: "State" },
];

export const IssuesList = () => {
  const {data, loading} = useService(getIssues)
  if (loading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No issues found</p>;
  
  return (
    <>
    <TextFieldComponent label={'Looking for you issue'}/><CheckComponent checked={false} handleChange={() => {}}/>
    <StatusTable columns={columns} row={data}/>
    </>
    
  );
};


export const App = () => {
  return <>
  <IssuesList/>
  </> 
}
