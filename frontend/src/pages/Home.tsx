import React from "react";
// import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function Home(): JSX.Element {
  return (
    <Box className="home">
      {/* <ul>
        <Link to="/login">
          <li>登录</li>
        </Link>
        <Link to="/register">
          <li>注册</li>
        </Link>
      </ul> */}
      <div>Home + dashboard</div>
    </Box>
  );
}
