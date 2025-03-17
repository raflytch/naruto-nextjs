"use client";

import QueryProvider from "@/providers/query-provider";

import React from "react";

const Providers = ({ children }) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default Providers;
