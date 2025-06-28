import React from "react";
import AIMLBG from "../assets/img/AIML_IMG.webp";
import AIML from "./AIML";

const Faculty = () => {
  const tabs = ["Certificates", "Hackathons", "Sports"];
  const apiMap = {
    Certificates: "http://localhost:8080/api/aiml/certificates",
    Hackathons: "http://localhost:8080/api/aiml/hackathons",
    Sports: "http://localhost:8080/api/aiml/sports",
  };

  return <AIML tabs={tabs} apiMap={apiMap} bgImage={AIMLBG} />;
};

export default Faculty;
