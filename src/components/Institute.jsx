import React from "react";
import DepartmentTemplate from "../components/DepartmentTemplate";
import AIMLBG from "../assets/img/AIML_IMG.webp";

const Institute = () => {
  const tabs = ["Certificates", "Hackathons", "Sports"];

  const apiMap = {
    Certificates: "http://localhost:8080/api/certificates",
    Hackathons: "http://localhost:8080/api/hackathons",
    Sports: "http://localhost:8080/api/sports",
  };

  return <DepartmentTemplate tabs={tabs} apiMap={apiMap} bgImage={AIMLBG} />;
};

export default Institute;
