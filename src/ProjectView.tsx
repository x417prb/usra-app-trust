import React from "react";
import ProjectList from "./ProjectList";
import ProjectContent from "./ProjectContent";
import { RouteComponentProps, Redirect } from "react-router";

export default function ProjectView({
  match: {
    params: { id },
  },
}: RouteComponentProps<{
  id?: string;
}>) {
  const current = id ? parseInt(id, 10) : -1;
  return (
    <>
      {isFinite(current) && current !== -1 ? (
        <Redirect to={`/${current}`} />
      ) : (
        <Redirect to="/" />
      )}
      <div className="row">
        <ProjectContent current={current} />
        <div className="col-xl-4">
          <ProjectList current={current} />
        </div>
      </div>
    </>
  );
}
