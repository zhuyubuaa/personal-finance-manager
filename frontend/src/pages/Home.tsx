import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Budget from "../components/sub/Budget";
import Header from "../components/Header";
import { useUserContext } from "../context/UserContext";
import "../styles/pages/home.css";

//dummy data
const dummyLedgers = [
  {
    id: 666,
    ab_name: "Daily records",
  },
  {
    id: 777,
    ab_name: "My travel",
  },
];

const dummyTransactions = [
  {
    l_id: 7001,
    l_amount: 10,
    type_name: "Shopping",
    remark: "",
    time: "2023-11-28",
  },
  {
    l_id: 7002,
    l_amount: 20,
    type_name: "Salary",
    remark: "",
    time: "2023-11-28",
  },
  {
    l_id: 7003,
    l_amount: 50,
    type_name: "Shopping",
    remark: "",
    time: "2023-11-28",
  },
];

//types used
interface LedgerType {
  ab_id: number;
  ab_name: string;
}

interface BudgetType {
  b_id: number;
  type_name: string;
  b_amount: number;
}

interface TransactionType {
  l_id: number;
  l_amount: number;
  type_name: string;
  remark: string;
  time: string;
}

export default function Home(): JSX.Element {
  const [ledgers, setLedgers] = useState<LedgerType[]>([]);
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [selectedLedger, setSelectedLedger] = useState<number | null>(null); //ledger id
  const [budgetDialog, setBudgetDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const { currentUser } = useUserContext();

  useEffect(() => {
    getLedgers();
  }, [currentUser]);

  useEffect(() => {
    getTransactions();
    getBudgets();
  }, [selectedLedger]);

  const getLedgers = async (): Promise<void> => {
    try {
      setLoading(true);
      if (currentUser) {
        const response = await fetch(
          `http://localhost:8000/accountbook?u_id=` + currentUser?.userId,
          {
            method: "get",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response?.status === 200) {
          const ledgersData = (await response.json()) as any;
          setLedgers(ledgersData);
          setSelectedLedger(ledgersData[0]["ab_id"]);
        } else {
          console.log("Error response");
        }
      }
    } catch (error) {
      console.log("Error fetching ledgers", error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async (): Promise<void> => {
    setLogLoading(true);
    try {
      if (selectedLedger) {
        const response = await fetch(
          `http://localhost:8000/log?ab_id=` + selectedLedger,
          {
            method: "get",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          const transData = (await response.json()) as any;
          setTransactions(transData);
        } else {
          console.log("Error trans response");
        }
      }
    } catch (error) {
      console.log("Error fetching transactions");
    } finally {
      setLogLoading(false);
    }
  };

  const getBudgets = async (): Promise<any> => {
    try {
      if (selectedLedger) {
        const response = await fetch(
          `http://localhost:8000/budget?ab_id=` + selectedLedger,
          {
            method: "get",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          const budgetData = (await response.json()) as any;
          setBudgets(budgetData);
        } else {
          console.log("Error budget response");
        }
      }
    } catch (error) {
      console.log("Error fetching budgets");
    }
  };

  const handleLedgerChange = (ledgerID: number) => {
    console.log("ledgerID", ledgerID);
    setSelectedLedger(ledgerID);
  };

  const onClickBudget = (): void => {
    setBudgetDialog(true);
  };

  return (
    <>
      <Box className="">
        <Header />
        <div className="home">
          <div className="home-ledgers">
            {loading ? (
              <CircularProgress />
            ) : (
              ledgers.map((ledger, i) => (
                <div
                  key={ledger.ab_id}
                  className="ledger-card"
                  onClick={() => handleLedgerChange(ledger.ab_id)}
                >
                  {ledger.ab_name}
                </div>
              ))
            )}
          </div>
          <div className="home-logs">
            <div className="home-overview">
              <Button variant="contained" onClick={onClickBudget}>
                Add Budget
              </Button>
              <div className="home-budgets">
                {budgets[0] &&
                  budgets.map((budget: BudgetType) => (
                    <div key={budget.b_id} className="budget-field">
                      {budget.type_name}
                      <br />
                      <h4> {budget.b_amount}</h4>
                    </div>
                  ))}
              </div>
            </div>
            <div className="home-transactions">
              {logLoading ? (
                <CircularProgress />
              ) : (
                transactions.map((transaction, i) => (
                  <div key={transaction.l_id} className="trans-card">
                    <div className="trans-card-left">
                      <h4> {transaction.type_name}</h4>
                      <div>
                        {transaction.time} {transaction.remark}
                      </div>
                    </div>
                    <div
                      className={`${
                        transaction.l_amount > 0 ? "income" : "outcome"
                      }`}
                    >
                      {transaction.l_amount > 0 ? "+" : ""}
                      {transaction.l_amount}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Box>
      {budgetDialog && (
        <Budget
          open={budgetDialog}
          onClose={() => setBudgetDialog(false)}
          ledger={selectedLedger}
        />
      )}
    </>
  );
}
