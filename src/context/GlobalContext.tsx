import React, { createContext, useState } from "react";

interface GlobalContextType {
  searchQuery: string;
  pageQuery: number;
  updateQueryStringHandler: (query: string) => void;
  updatePage: (page: number) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  searchQuery: "",
  pageQuery: 1,
  updateQueryStringHandler: () => {},
  updatePage: () => {},
});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageQuery, setPageQuery] = useState(1);

  const updateQueryStringHandler = (query: string) => {
    setSearchQuery(query);
  };
  const updatePage = (pageValue: number) => {
    setPageQuery(pageValue);
  };

  const context = {
    searchQuery,
    pageQuery,
    updateQueryStringHandler,
    updatePage,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
