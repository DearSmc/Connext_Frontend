import React from "react";
import { Link, Typography } from "@mui/material";
import { Container } from "@mui/system";

type Props = {};

function index({}: Props) {
  return (
    <Container className="text-align: center">
      <Typography variant="h3">Create New Account</Typography>
      <Typography variant="body2">
        {"Have an account?"}{" "}
        <Link href="/login" variant="body2" underline="hover">
          {"Login"}
        </Link>
      </Typography>
    </Container>
  );
}

export default index;
