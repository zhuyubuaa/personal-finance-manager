import { Box, Button } from "@mui/material";
import Budget from "../sub/Budget";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";

interface BudgetType {
  b_id: number;
  type_name: string;
  b_amount: number;
}

function BudgetsLog({ selectedLedger }: any) {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [budgetDialog, setBudgetDialog] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getBudgets(signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLedger]);

  const getBudgets = async (signal: any): Promise<any> => {
    try {
      if (selectedLedger) {
        const response = await fetch(
          `http://localhost:8000/budget?ab_id=` + selectedLedger,
          {
            signal: signal,
            method: "get",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          const budgetData = (await response.json()) as any;
          setBudgets(budgetData);
          console.log("dsjfh", budgetData);
        } else {
          console.log("Error budget response");
        }
      }
    } catch (error) {
      console.log("Error fetching budgets");
    }
  };

  const onClickBudget = (): void => {
    setBudgetDialog(true);
  };

  const ColorButton = styled(Button)({
    color: "#5d50c7",
    "&:hover": {
      color: "#5d50c7",
      backgroundColor: "#E6E4F6",
      borderColor: "#E6E4F6",
    },
    borderColor: "#5d50c7",
  });

  return (
    <div className="home-overview">
      <div className="home-budgets">
        {budgets[0] &&
          budgets.map((budget: BudgetType) => (
            <Box key={budget.b_id} className="budget-card">
              {budget.type_name}
              <br />
              <h4> {budget.b_amount}</h4>
            </Box>
          ))}

        <ColorButton
          variant="outlined"
          onClick={onClickBudget}
          className="budget-button"
        >
          <AddIcon />
          Add Budget
        </ColorButton>
      </div>
      {budgetDialog && (
        <Budget
          open={budgetDialog}
          onClose={() => setBudgetDialog(false)}
          ledger={selectedLedger}
        />
      )}
    </div>
  );
}

export default React.memo(BudgetsLog);
