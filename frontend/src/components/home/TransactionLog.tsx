import React, { useEffect, useState } from "react";
import Loader from "../sub/Loader";

interface TransactionType {
  l_id: number;
  l_amount: number;
  type_name: string;
  remark: string;
  time: string;
}

function TransactionLog({ selectedLedger }: any): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getTransactions(signal);

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLedger]);

  const getTransactions = async (signal: any): Promise<void> => {
    setLoading(true);
    try {
      if (selectedLedger) {
        const response = await fetch(
          `http://localhost:8000/log?ab_id=` + selectedLedger,
          {
            signal: signal,
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
      setLoading(false);
    }
  };
  return (
    <div className="home-transactions">
      {loading ? (
        <Loader />
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
              className={`${transaction.l_amount > 0 ? "income" : "expense"}`}
            >
              {transaction.l_amount > 0 ? "+" : ""}
              {transaction.l_amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default React.memo(TransactionLog);
