import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import "../styles/pages/profile.css";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Account from "../components/sub/Account";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface AccountType {
  a_name: string;
  a_id: number;
  remaining: number;
}

export default function Profile(): JSX.Element {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const { currentUser, handleLogout } = useUserContext();

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const getAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/account?u_id=` + currentUser?.userId,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setAccounts(data);
      }
    } catch (error) {
      console.log("Error fetching accounts");
    } finally {
      setLoading(false);
    }
  };

  const onAccountEdit = async (accountId: any) => {
    setOpenDialog(true);
  };

  const onAccountDelete = async (accountId: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/account?a_id=` + selectedAccount?.a_id,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        console.log("success");
      }
    } catch (error) {
      console.log("Error deleting account");
    }
  };

  const onUserEdit = () => {};

  const CustomBox = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  const CustomCard = styled(Card)({
    "&:hover": {
      color: "#5d50c7",
      backgroundColor: "#E6E4F6",
      borderColor: "#E6E4F6",
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px",
    },
    "&:focus": {
      color: "#5d50c7",
      backgroundColor: "#E6E4F6",
      borderColor: "#E6E4F6",
      boxShadow:
        " rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
    },
    width: "30%",
    height: "140px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <div className="profile">
      <div className="user">
        <Card className="user-card">
          <div>
            <b>UserName: </b>
            {currentUser?.userName}
          </div>
          <div>
            <b>User ID: </b>
            {currentUser?.userId}
          </div>
          <Button variant="outlined" onClick={onUserEdit}>
            Edit
          </Button>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Card>
      </div>
      <Box className="accounts">
        <Typography variant="h5" sx={{ fontColor: "#7f7f7f" }}>
          Accounts 账户
        </Typography>
        {loading ? (
          <CustomBox>
            <CircularProgress />
          </CustomBox>
        ) : (
          <div className="accounts-field">
            {accounts[0] ? (
              accounts.map((account, i) => (
                <CustomCard
                  key={i}
                  className={`account-card ${
                    selectedAccount?.a_id === account.a_id && "selected-card"
                  }`}
                  onClick={() => {
                    setSelectedAccount({
                      a_id: account.a_id,
                      a_name: account.a_name,
                      remaining: account.remaining,
                    });
                  }}
                >
                  {selectedAccount?.a_id === account.a_id ? (
                    <CardActions
                      disableSpacing
                      sx={{
                        padding: 0,
                        position: "absolute",
                        top: "0",
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
                          onAccountEdit(account.a_id);
                        }}
                      >
                        <EditIcon sx={{ fontSize: "16px", color: "#5d50c7" }} />
                      </IconButton>
                      <IconButton
                        aria-label="ledger-edit"
                        onClick={() => {
                          onAccountDelete(account.a_id);
                        }}
                      >
                        <DeleteIcon
                          sx={{ fontSize: "16px", color: "#5d50c7" }}
                        />
                      </IconButton>
                    </CardActions>
                  ) : (
                    <></>
                  )}
                  <div className="acc-name">{account.a_name}</div>
                  <div className="acc-balance">
                    <span>余额: </span>¥{account.remaining}
                  </div>
                </CustomCard>
              ))
            ) : (
              <CustomBox sx={{ color: "#b5bac5" }}>
                <ListAltIcon sx={{ fontSize: "48px" }} />
                <Typography variant="h5">No Data</Typography>
              </CustomBox>
            )}
          </div>
        )}
      </Box>
      {openDialog && (
        <Account
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          selectedAccount={selectedAccount}
        />
      )}
    </div>
  );
}
