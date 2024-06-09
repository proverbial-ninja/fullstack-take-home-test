"use client";
import Image from "next/image";
import styles from "../app/globals.css";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import BasicTabs from "./components/tabs";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../app/theme";

import PropTypes from "prop-types";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <img src="/logoEllo.svg" />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <BasicTabs />
        </Container>
      </ThemeProvider>
    </main>
  );
}
