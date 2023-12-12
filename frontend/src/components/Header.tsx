import "../styles/components/header.css";
import { useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Book,
  Receipt,
  AccountBalanceWallet,
} from "@mui/icons-material";
import Account from "./sub/Account";
import Ledger from "./sub/Ledger";
import Transaction from "./sub/Transaction";
import ProfileMenu from "./ProfileMenu";

export default function Header(): JSX.Element {
  const [accountDialog, setAccountDialog] = useState<boolean>(false);
  const [transDialog, setTransDialog] = useState<boolean>(false);
  const [ledgerDialog, setLedgertDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const HeaderButtons = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  });

  const headerIcons = [
    {
      id: "account",
      name: "加账户",
      icon: <AccountBalanceWallet />,
      handleDialog: (action: boolean) => setAccountDialog(action),
    },
    {
      id: "ledger",
      name: "加账本",
      icon: <Book />,
      handleDialog: (action: boolean) => setLedgertDialog(action),
    },
    {
      id: "trans",
      name: "加日志",
      icon: <Receipt />,
      handleDialog: (action: boolean) => setTransDialog(action),
    },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="header">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Icon
              </Typography>
              {/* change position later */}
              {headerIcons.map((iconObj) => {
                return (
                  <Button
                    key={iconObj.id}
                    onClick={() => iconObj.handleDialog(true)}
                  >
                    <HeaderButtons>
                      {iconObj.icon}
                      {iconObj.name}
                    </HeaderButtons>
                  </Button>
                );
              })}
              <Button onClick={handleMenuOpen}>
                <HeaderButtons>
                  <AccountCircle />
                  用户
                </HeaderButtons>
              </Button>
            </Toolbar>
            <ProfileMenu
              openMenu={openMenu}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
            />
          </Container>
        </AppBar>
      </Box>
      {accountDialog && (
        <Account open={accountDialog} onClose={() => setAccountDialog(false)} />
      )}
      {ledgerDialog && (
        <Ledger open={ledgerDialog} onClose={() => setLedgertDialog(false)} />
      )}
      {transDialog && (
        <Transaction open={transDialog} onClose={() => setTransDialog(false)} />
      )}
    </>
  );
}
