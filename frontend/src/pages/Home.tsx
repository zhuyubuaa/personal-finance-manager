import React from "react";
import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <ul>
        <Link to="/login">
          <li>登录</li>
        </Link>
        <Link to="/register">
          <li>注册</li>
        </Link>
      </ul>
    </div>
  );
}
