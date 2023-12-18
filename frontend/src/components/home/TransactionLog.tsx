import React, { useEffect, useState } from "react";
import Loader from "../sub/Loader";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Transaction from "../sub/Transaction";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";

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
  const [openDialog, setOpenDialog] = useState(false);

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

  const onDialogOpen = (): void => {
    setOpenDialog(true);
  };

  const onTransDelete = async (transId: any): Promise<any> => {
    try {
      const response = await fetch(
        `http://localhost:8000/log?l_id=` + transId,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => res.json());
      if (response === 0) {
        console.log("success");
      } else {
        console.log("Error deleting transaction log");
      }
    } catch (error) {
      console.log("Error deleting transaction log", error);
    }
    window.location.reload();
  };

  const ColorButton = styled(Button)({
    height: "32px",
    backgroundColor: "#5d50c7",
    color: "#fff",
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
    <div className="home-transactions">
      <Box className="transactions-header">
        <ColorButton variant="contained" onClick={onDialogOpen}>
          Add Transaction
        </ColorButton>
      </Box>
      <Box className="transactions-body">
        {loading ? (
          <CustomBox>
            <Loader />
          </CustomBox>
        ) : transactions[0] ? (
          transactions.map((transaction, i) => (
            <Card key={transaction.l_id} className="trans-card">
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
              <IconButton onClick={() => onTransDelete(transaction.l_id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))
        ) : (
          <CustomBox sx={{ color: "#b5bac5" }}>
            <ListAltIcon sx={{ fontSize: "48px" }} />
            <Typography variant="h5">No Data</Typography>
          </CustomBox>
        )}
      </Box>
      {openDialog && (
        <Transaction open={openDialog} onClose={() => setOpenDialog(false)} />
      )}
    </div>
  );
}

export default React.memo(TransactionLog);
