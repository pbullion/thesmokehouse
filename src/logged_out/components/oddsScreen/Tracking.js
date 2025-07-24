import React from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Loading from "react-loading";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SessionTable = (props) => {
  const { selectTracking } = props;
  React.useEffect(() => {
    selectTracking();
  }, [selectTracking]);
  const [sessions, setSessions] = React.useState([]);
  const [updatedTime, setUpdatedTime] = React.useState(null);

  const getSessions = async (email) => {
    const url = `https://sheline-art-website-api.herokuapp.com/odds-screen/tracking`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSessions(data.sessions);
        setSessions(data.sessions.filter((x) => x.email !== "pbullion@gmail.com"));
        setUpdatedTime(new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      });
  };
  React.useEffect(() => {
    getSessions();
    console.log(window);
  }, []);

  React.useEffect(() => {
    const getUpdate = () => {
      getSessions();
    };
    const intervalId = setInterval(getUpdate, 185000);
    return () => clearInterval(intervalId);
  }, []);

  const fontOptions = {
    family: "'Baloo Bhaijaan', cursive", // Font family
    color: "white",
    size: "12rem",
  };
  const dayOfWeekCount = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };
  sessions.reduce((acc, session) => {
    const day = new Date(session.start_date_time).getUTCDay();
    const dayLabel = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
    acc[dayLabel] = (acc[dayLabel] || 0) + (session.number_of_refreshes * 15) / 60;
    return acc;
  }, dayOfWeekCount);

  const chartData = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [
      {
        label: "Sessions",
        data: Object.values(dayOfWeekCount),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const getOptions = (title) => {
    const options = {
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            suggestedMin: 0,
            beginAtZero: true,
            padding: 10,
            font: fontOptions,
            color: "#fff",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: fontOptions,
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: fontOptions,
          },
          display: false,
          position: "top",
        },
        title: {
          display: true,
          text: title,
          font: fontOptions,
          color: "white",
        },
      },
    };
    return options;
  };

  const aggregateDataByHour = (sessions) => {
    const minutesPerHourData = {};
    sessions.forEach((session) => {
      const startTime = new Date(session.start_date_time);
      const endTime = new Date(
        startTime.getTime() + session.number_of_refreshes * 15 * 1000 // Each refresh is 15 seconds
      );
      while (startTime < endTime) {
        const hour = startTime.getHours();
        const minutes = startTime.getMinutes();
        if (!minutesPerHourData[hour]) {
          minutesPerHourData[hour] = 0;
        }
        minutesPerHourData[hour] += 1;
        startTime.setMinutes(minutes + 1);
      }
    });
    console.log("🚀 ~ sessions.forEach ~ minutesPerHourData:", minutesPerHourData);
    return Object.entries(minutesPerHourData).map(([hour, minutes]) => ({
      hour,
      minutes,
    }));
  };
  const chartDataByHour = {
    labels: aggregateDataByHour(sessions).map((item) => (item.hour === "0" ? "12" : item.hour > 12 ? `${item.hour - 12}` : `${item.hour}`)),
    datasets: [
      {
        label: "Total Number of Minutes",
        data: aggregateDataByHour(sessions).map((item) => item.minutes),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };

  const aggregateDataByBrowser = (sessions) => {
    const refreshesByBrowser = {};
    sessions.forEach((session) => {
      if (refreshesByBrowser[session.browser]) {
        refreshesByBrowser[session.browser] += 1;
      } else {
        refreshesByBrowser[session.browser] = 1;
      }
    });
    return Object.entries(refreshesByBrowser).map(([browser, totalCount]) => ({
      browser,
      totalCount,
    }));
  };
  const aggregateDataByOS = (sessions) => {
    const refreshesByOS = {};
    sessions.forEach((session) => {
      if (refreshesByOS[session.os]) {
        refreshesByOS[session.os] += 1;
      } else {
        refreshesByOS[session.os] = 1;
      }
    });
    return Object.entries(refreshesByOS).map(([os, totalCount]) => ({
      os,
      totalCount,
    }));
  };
  const aggregateDataByFetches = (sessions) => {
    const fetchesByEmail = {};
    sessions.forEach((session) => {
      if (fetchesByEmail[session.email]) {
        fetchesByEmail[session.email] += session.fetch_games_count;
      } else {
        fetchesByEmail[session.email] = session.fetch_games_count;
      }
    });
    return Object.entries(fetchesByEmail).map(([email, totalFetches]) => ({
      email,
      totalFetches: totalFetches * 6,
    }));
  };
  const aggregateDataByEmail = (sessions) => {
    const refreshesByEmail = {};
    sessions.forEach((session) => {
      if (refreshesByEmail[session.email]) {
        refreshesByEmail[session.email] += session.number_of_refreshes;
      } else {
        refreshesByEmail[session.email] = session.number_of_refreshes;
      }
    });
    return Object.entries(refreshesByEmail).map(([email, totalRefreshes]) => ({
      email,
      totalRefreshes: (totalRefreshes * 15) / 60,
    }));
  };
  function getMonthKey(date) {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return shortMonths[date.getMonth()]; // Only Month Abbreviation
  }
  const aggregateDataByMonth = (sessions) => {
    const refreshesByMonth = {};

    sessions.forEach((session) => {
      const date = new Date(session.start_date_time);
      const monthYearKey = getMonthKey(date);

      if (!refreshesByMonth[monthYearKey]) {
        refreshesByMonth[monthYearKey] = 0;
      }

      refreshesByMonth[monthYearKey] += session.number_of_refreshes;
    });

    return Object.entries(refreshesByMonth).map(([date, totalRefreshes]) => ({
      date,
      totalRefreshes: (totalRefreshes * 15) / 60,
    }));
  };
  const aggregateDataByDate = (sessions) => {
    const refreshesByDate = {};
    sessions.forEach((session) => {
      const date = session.start_date_time.split("T")[0];
      if (!refreshesByDate[date]) {
        refreshesByDate[date] = 0;
      }
      refreshesByDate[date] += session.number_of_refreshes;
    });
    return Object.entries(refreshesByDate).map(([date, totalRefreshes]) => ({
      date,
      totalRefreshes: (totalRefreshes * 15) / 60,
    }));
  };
  const chartDataByMonth = {
    labels: aggregateDataByMonth(sessions).map((item) => item.date),
    datasets: [
      {
        label: "Total Number of Minutes",
        data: aggregateDataByMonth(sessions).map((item) => item.totalRefreshes),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const chartDataByDate = {
    labels: aggregateDataByDate(sessions).map((item) => new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })),
    datasets: [
      {
        label: "Total Number of Minutes",
        data: aggregateDataByDate(sessions).map((item) => item.totalRefreshes),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const chartDataByUser = {
    labels: aggregateDataByEmail(sessions).map((item) => item.email.split("@")[0]),
    datasets: [
      {
        label: "Total Number of Minutes",
        data: aggregateDataByEmail(sessions).map((item) => item.totalRefreshes),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const chartDataByFetches = {
    labels: aggregateDataByFetches(sessions).map((item) => item.email.split("@")[0]),
    datasets: [
      {
        label: "Total Number of Fetches",
        data: aggregateDataByFetches(sessions).map((item) => item.totalFetches),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const chartDataByBrowser = {
    labels: aggregateDataByBrowser(sessions).map((item) => item.browser),
    datasets: [
      {
        label: "Total Number of Browsers",
        data: aggregateDataByBrowser(sessions).map((item) => item.totalCount),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const chartDataByOS = {
    labels: aggregateDataByOS(sessions).map((item) => item.os),
    datasets: [
      {
        label: "Total Number of OSs",
        data: aggregateDataByOS(sessions).map((item) => item.totalCount),
        color: "white",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        maxBarThickness: 6,
      },
    ],
  };
  const getIsCurrentlyRunning = (session) => {
    const startDate = new Date(session.start_date_time);
    const utcOffset = 6 * 60 * 60 * 1000;
    const startDateUtc = new Date(startDate.getTime() + utcOffset);
    const sessionDuration = (session.number_of_refreshes * 2 + 5) * 15000;
    const endDateUtc = new Date(startDateUtc.getTime() + sessionDuration);
    const currentDateUtc = new Date();
    return currentDateUtc < endDateUtc;
  };

  const colors = [
    "rgb(0, 181, 204)", // Cyan: Bright and inviting
    "rgb(220, 53, 69)", // Red: Bold and attention-grabbing
    "rgb(40, 167, 69)", // Green: Nature-inspired, easy on thef
    "rgb(255, 87, 34)", // Deep Orange: Warm and energetic
    "rgb(102, 16, 242)", // Purple: Rich and elegant
    "rgb(253, 126, 20)", // Bright Orange: Lively and playful
    "rgb(255, 193, 7)", // Yellow: Cheerful and bright
    "rgb(52, 58, 64)", // Charcoal: Sophisticated and versatile
    "rgb(25, 25, 25)", // Dark Gray: Strong contrast, modern
  ];

  if (sessions.length === 0) {
    return <Loading type="bars" color="#000000" height={100} width={100} />;
  } else
    return (
      <div style={{ paddingTop: 10, backgroundColor: "black" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          <div style={{ backgroundColor: colors[0], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartData}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Minutes by Day of the Week")}
            />
          </div>
          <div style={{ backgroundColor: colors[1], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByUser}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Minutes by User")}
            />
          </div>
          <div style={{ backgroundColor: colors[2], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByBrowser}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Number of Browsers")}
            />
          </div>
          <div style={{ backgroundColor: colors[3], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByOS}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Number of Operating Systems")}
            />
          </div>
          <div style={{ backgroundColor: colors[4], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByDate}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Min by Day")}
            />
          </div>
          <div style={{ backgroundColor: colors[5], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByMonth}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Min by Month")}
            />
          </div>
          <div style={{ backgroundColor: colors[6], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByHour}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Min by Hour")}
            />
          </div>
          <div style={{ backgroundColor: colors[6], borderRadius: "1rem", margin: 15 }}>
            <Bar
              data={chartDataByFetches}
              style={{ padding: "0.1rem", height: window.innerWidth > 850 ? "14rem" : null }}
              options={getOptions("Fetches by User")}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          <Typography
            variant={"h3"}
            style={{
              fontFamily: "'Baloo Bhaijaan', cursive",
              fontWeight: 400,
              fontSize: "1rem",
            }}
            color={"white"}>
            Updated at {updatedTime}
          </Typography>
        </div>
        <TableContainer component={Paper} style={{ marginTop: 30, backgroundColor: "black" }}>
          <Table sx={{ color: "white" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }} align="left">
                  Email
                </TableCell>
                <TableCell sx={{ color: "white" }} align="left">
                  Run Time
                </TableCell>
                <TableCell sx={{ color: "white" }} align="left">
                  Refreshes
                </TableCell>
                <TableCell sx={{ color: "white" }} align="left">
                  Fetches
                </TableCell>
                <TableCell sx={{ color: "white" }} align="left">
                  Currently Running
                </TableCell>
                <TableCell sx={{ color: "white" }} align="left">
                  Start Date & Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions
                .sort((a, b) => b.id - a.id)
                .sort((a, b) => getIsCurrentlyRunning(b) - getIsCurrentlyRunning(a))
                .map((session, idx) => (
                  <TableRow
                    key={session.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ backgroundColor: getIsCurrentlyRunning(session) && "green" }}>
                    <TableCell sx={{ color: "white" }} align="left">
                      {session.email}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {Math.floor((session.number_of_refreshes * 2 * 15) / 3600) > 0 &&
                        Math.floor((session.number_of_refreshes * 2 * 15) / 3600) + "hrs"}{" "}
                      {(((session.number_of_refreshes * 2 * 15) % 3600) / 60).toFixed(0)} min
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {session.number_of_refreshes}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {session.fetch_games_count}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {idx === 0 && console.log(session)}
                      {getIsCurrentlyRunning(session) ? "Running" : "Not Running"}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                      {new Date(session.start_date_time.replace("Z", "")).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
};

export default SessionTable;
