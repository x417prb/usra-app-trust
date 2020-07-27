import React from "react";
import ProjectList from "./ProjectList";
import ProjectContent from "./ProjectContent";
import { RouteComponentProps, Redirect } from "react-router";

export default function ProjectView({match:{params:{id}}}: RouteComponentProps<{
  id?: string;
}>) {
  const current = id ? parseInt(id, 10) : -1;
  return <>
    {
      isFinite(current) && current !== -1
        ? <Redirect to={`/project/${current}`} />
        : <Redirect to="/project" />
    }
    <div className="row">
      <div className="col-xl-9 pl-1">
        <ProjectContent current={current} />
      </div>
      <div className="col-xl-3">
        <ProjectList current={current} />
      </div>
    </div>
  </>;
}
