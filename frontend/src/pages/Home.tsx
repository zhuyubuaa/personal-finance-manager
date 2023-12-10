import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

//dummy data
const accountbooks = [
  {
    id: 666,
    ab_name: "Daily records",
  },
  {
    id: 777,
    ab_name: "My travel",
  },
];

export default function Home(): JSX.Element {
  const [tabValue, setTabValue] = useState<any>(0);

  const handleTabChange = (e: any, nevVal: number): void => {
    setTabValue(nevVal);
  };

  return (
    <Box className="home">
      <div className="home-logs">
        1. Transaction logs, tabular choice ledger
        <Tabs value={tabValue} onChange={handleTabChange}>
          {accountbooks.map((book, i) => (
            <Tab
              key={i}
              label={book.ab_name}
              value={i}
              // ariaControls={`simple-tabpanel-${i}`}
            />
          ))}
        </Tabs>
      </div>
      <div className="home-chart">2. Budget, pie chart</div>
    </Box>
  );
}
