"use client";

import React from "react";
import Datadog from "./Datadog";
import Clarity from "./Clarity";
import Google from "./Google";

const Analytics = ({
  consentGiven,
}: {
  consentGiven: boolean;
}): React.ReactElement | null => {
  if (!consentGiven) return null;
  return (
    <>
      <Datadog />
      <Clarity />
      <Google />
    </>
  );
};

export default Analytics;
