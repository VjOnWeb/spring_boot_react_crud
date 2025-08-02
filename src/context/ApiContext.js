// src/context/ApiContext.js
import React, { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [env, setEnv] = useState("default"); // 'default', 'dev', 'prod'

  const getBaseUrl = () => {
    switch (env) {
      case "dev":
        return process.env.REACT_APP_DEV_URL || "http://localhost:9899";
      case "prod":
        return process.env.REACT_APP_PROD_URL || "http://localhost:9900";
      default:
        return process.env.REACT_APP_DEFAULT_URL || "http://localhost:9898";
    }
  };

  return (
    <ApiContext.Provider value={{ env, setEnv, getBaseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
