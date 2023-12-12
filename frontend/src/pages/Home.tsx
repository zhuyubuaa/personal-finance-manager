import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Budget from "../components/sub/Budget";
import Header from "../components/Header";

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
  id: number;
  ab_name: string;
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
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [selectedLedger, setSelectedLedger] = useState<number | null>(null); //ledger id
  const [budgetDialog, setBudgetDialog] = useState<boolean>(false);

  useEffect(() => {
    getLedgers();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [selectedLedger]);

  const getLedgers = async (): Promise<void> => {
    try {
      // const response = await fetch(
      //   `http://localhost:8000/accountbook/?u_id=21373074`,
      //   {
      //     method: "get",
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // console.log("get ledgers", response);
      // if (response?.status === 200) {
      //   const ledgersData = response.json();
      //   console.log("ledgersData", ledgersData);
      //  //setLedgers(ledgersData)
      // } else {
      //   console.log("Error response");
      // }
      setLedgers(dummyLedgers);
      setSelectedLedger(dummyLedgers[0].id);
    } catch (error) {
      console.log("Error fetching ledgers", error);
    }
  };

  const getTransactions = async (): Promise<void> => {
    try {
      // const response = await fetch(`http://localhost:8000/log/?`, {
      //   method: "get",
      //   headers: { "Content-Type": "application/json" },
      // });
      // console.log("Trans fetch response", response);
      // if (response.status === 200) {
      //   const transData = response.json();
      //   console.log("transData", transData);
      // } else {
      //   console.log("Error trans response");
      // }
      setTransactions(dummyTransactions);
    } catch (error) {
      console.log("Error fetching transactions");
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
            {ledgers.map((ledger, i) => (
              <div
                key={ledger.id}
                className="ledger-card"
                onClick={() => handleLedgerChange(ledger.id)}
              >
                {ledger.ab_name}
              </div>
            ))}
          </div>
          <div className="home-logs">
            <div className="home-overview">
              <Button variant="contained" onClick={onClickBudget}>
                Add Budget
              </Button>
            </div>
            <div className="home-transactions">
              {transactions.map((transaction, i) => (
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
              ))}
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
