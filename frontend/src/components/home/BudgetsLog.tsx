import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Budget from "../sub/Budget";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";

interface BudgetType {
  b_id: number;
  type_name: string;
  b_amount: number;
}

function BudgetsLog({ selectedLedger }: any) {
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [budgetDialog, setBudgetDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openCardMenu = Boolean(anchorEl);

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
    setLoading(true);
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
          // console.log("budget data", budgetData);
        } else {
          console.log("Error budget response");
        }
      }
    } catch (error) {
      console.log("Error fetching budgets");
    } finally {
      setLoading(false);
    }
  };

  const onClickBudget = (): void => {
    setBudgetDialog(true);
  };

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onBudgetDelete = async (budgetId: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/budget?b_id=` + budgetId,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => res.json());
      if (response === 0) {
        //Reload component
        console.log("success");
      } else {
        console.log("Error deleting budget");
      }
    } catch (error) {
      console.log("Error deleting budget");
    } finally {
      onMenuClose();
    }
    window.location.reload();
  };

  //Upcoming feature
  // const onBudgetReset = async (budgetId: any) => {
  //   console.log("delete budgetId", budgetId);
  // };

  const ColorButton = styled(Button)({
    color: "#5d50c7",
    "&:hover": {
      color: "#5d50c7",
      backgroundColor: "#E6E4F6",
      borderColor: "#E6E4F6",
    },
    borderColor: "#5d50c7",
  });

  const CustomBox = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <div className="home-overview">
      <div className="home-budgets">
        {loading ? (
          <CustomBox>
            <CircularProgress />
          </CustomBox>
        ) : (
          budgets[0] &&
          budgets.map((budget: BudgetType) => (
            <Card
              key={budget.b_id}
              className="budget-card"
              sx={{
                position: "relative",
                ":hover": {
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                },
              }}
            >
              <CardHeader
                sx={{
                  padding: 0,
                  position: "absolute",
                  top: "0",
                  display: "flex",
                  width: "100%",
                  height: "32px",
                }}
                action={
                  <IconButton
                    aria-label="budget-more"
                    onClick={onMenuClick}
                    aria-controls={openCardMenu ? "card-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openCardMenu ? "true" : undefined}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent
                sx={{
                  marginTop: "32px",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {budget.type_name}
                <br />
                <h4>{budget.b_amount}¥</h4>
              </CardContent>
              {
                <Menu
                  id="card-menu"
                  anchorEl={anchorEl}
                  open={openCardMenu}
                  onClose={onMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => onBudgetDelete(budget.b_id)}>
                    Delete
                  </MenuItem>
                </Menu>
              }
            </Card>
          ))
        )}
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
          currentBudgets={budgets}
          open={budgetDialog}
          onClose={() => setBudgetDialog(false)}
          ledger={selectedLedger}
        />
      )}
    </div>
  );
}

export default React.memo(BudgetsLog);
