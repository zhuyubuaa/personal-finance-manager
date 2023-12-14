import React, { useEffect, useState } from "react";
import { Card, CircularProgress } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import "../styles/pages/home.css";
import "../styles/components/transactions.css";
import "../styles/components/budgets.css";
import TransactionLog from "../components/home/TransactionLog";
import BudgetsLog from "../components/home/BudgetsLog";

//types used
interface LedgerType {
  ab_id: number;
  ab_name: string;
}

const cardColors = ["#5d50c7", "#ef2840", "#f8bc16", "#008F7A", "#ef7428"];

export default function Home(): JSX.Element {
  const [ledgers, setLedgers] = useState<LedgerType[]>([]);
  const [selectedLedger, setSelectedLedger] = useState<number | null>(null); //ledger id
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserContext();

  useEffect(() => {
    getLedgers();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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

  const handleLedgerChange = (ledgerID: number) => {
    setSelectedLedger(ledgerID);
  };

  return (
    <>
      <div className="home">
        <div className="home-ledgers">
          {loading ? (
            <CircularProgress />
          ) : (
            ledgers.map((ledger, i) => {
              const color = cardColors[i % 4];
              return (
                <Card
                  style={{ background: `${color}` }}
                  key={ledger.ab_id}
                  className="ledger-card"
                  onClick={() => handleLedgerChange(ledger.ab_id)}
                >
                  {ledger.ab_name}
                </Card>
              );
            })
          )}
        </div>
        <div className="home-logs">
          <BudgetsLog selectedLedger={selectedLedger} />
          <TransactionLog selectedLedger={selectedLedger} />
        </div>
      </div>
    </>
  );
}
