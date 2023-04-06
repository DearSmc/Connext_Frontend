import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

function index({}: Props) {
  const navigate = useNavigate();

  return localStorage.getItem("accessToken") ? (
    <div style={{ color: "blue", textAlign: "center" }}>HOME</div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default index;
