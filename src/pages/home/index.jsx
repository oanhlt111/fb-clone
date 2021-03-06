import Feeds from "./feeds";
import Sidebar from "components/sidebar";
import Widgets from "components/widgets";

import React from "react";
import "./home.css";
import withAuth from "hoc/withAuth";

function Home() {
  return (
    <div className="app__body">
      <Sidebar />
      <Feeds />
      <Widgets />
    </div>
  );
}

export default withAuth(Home);
