import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useUserContext } from "../context/UserContext";
import "../styles/pages/home.css";
import "../styles/components/transactions.css";
import "../styles/components/budgets.css";
import styled from "@emotion/styled";
import TransactionLog from "../components/home/TransactionLog";
import BudgetsLog from "../components/home/BudgetsLog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

  const onLedgerDelete = async (ledgerId: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/accountbook?ab_id=` + ledgerId,
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
      // onMenuClose();
    }
  };

  const onLedgerEdit = async (ledgerId: any) => {
    // try {
    //   const newAccBook = {
    //     ab_name: ledgerName,
    //     u_id: curUser?.userId,
    //   };
    //   const response = await fetch("http://localhost:8000/accountbook", {
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newAccBook),
    //   });
    //   if (response === 0) {
    //     //Reload component
    //     console.log("success");
    //   } else {
    //     console.log("Error deleting budget");
    //   }
    // } catch (error) {
    //   console.log("Error deleting budget");
    // } finally {
    //   // onMenuClose();
    // }
  };

  const handleLedgerChange = (ledgerID: number) => {
    setSelectedLedger(ledgerID);
  };

  const CustomBox = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <>
      <div className="home">
        <Box className="home-ledgers">
          {loading ? (
            <CustomBox>
              <CircularProgress />
            </CustomBox>
          ) : (
            ledgers.map((ledger, i) => {
              const color = cardColors[i % 4];
              return (
                <Card
                  style={{ background: `${color}` }}
                  key={ledger.ab_id}
                  className="ledger-card"
                  onClick={() => handleLedgerChange(ledger.ab_id)}
                  sx={{
                    position: "relative",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f3f1fb",
                    }}
                  >
                    <Typography variant="h5">{ledger.ab_name}</Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{
                      padding: 0,
                      position: "absolute",
                      bottom: "0",
                      right: "8px",
                      display: "flex",
                      flexDirection: "row-reverse",
                      width: "100%",
                      height: "32px",
                    }}
                  >
                    <IconButton
                      aria-label="ledger-delete"
                      onClick={() => {
                        onLedgerDelete(ledger.ab_id);
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px", color: "#fff" }} />
                    </IconButton>
                    <IconButton
                      aria-label="ledger-edit"
                      onClick={() => {
                        onLedgerEdit(ledger.ab_id);
                      }}
                    >
                      <EditIcon sx={{ fontSize: "16px", color: "#fff" }} />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })
          )}
        </Box>
        <div className="home-logs">
          <BudgetsLog selectedLedger={selectedLedger} />
          <TransactionLog selectedLedger={selectedLedger} />
        </div>
      </div>
    </>
  );
}
