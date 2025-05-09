import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { useState } from "react";

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useState();

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        <Outlet context={{ searchQuery }} />
      </main>
    </div>
  );
};
