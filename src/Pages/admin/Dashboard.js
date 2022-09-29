import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import "../../css/App.css";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

import { Heading, Container } from "@chakra-ui/react";
import { Grid, GridItem, Text, Flex, Box, Spacer } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { textTransform } from "@mui/system";

function RenderPage() {
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
  useEffect(() => {
    /*   const content = document.getElementById("myChart");
    const myChart = new Chart(content, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    }); */
  }, []);

  return (
    <div>
      {/*   <canvas id="myChart"></canvas> */}
      <Container mt={10} maxW="2xxl">
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={3} className="DashboardCards">
            <Flex>
              <Box>
                <Text className="DashboardTitle">10</Text>
                <Text className="DashboardNumber">DEPARTMENTS</Text>
              </Box>
              <Spacer />
              <Box>
                <i className="fas fa-building DashboardICon"></i>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
}

function Dashboard(props) {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar selected={props.selected} />}
        Page_Contents={<RenderPage />}
        Page_title="DASHBOARD"
      />
    </>
  );
}

export default Dashboard;
