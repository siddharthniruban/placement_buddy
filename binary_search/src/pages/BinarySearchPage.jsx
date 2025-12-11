import React, { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import BinarySearchAnimation from "../components/BinarySearchAnimation";
import JavaExecutionSimulator from "../components/JavaExecutionSimulator";

export default function BinarySearchPage() {
  const tabs = ["Problem", "Approach", "Iterative", "Recursive", "Complexity"];
  const [activeTab, setActiveTab] = useState("Problem");

  return (
    <div className="container">
      <Header />
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Approach" && <BinarySearchAnimation />}
      {activeTab === "Iterative" && <JavaExecutionSimulator />}

      {/* Other tabs would be added similarly */}
    </div>
  );
}