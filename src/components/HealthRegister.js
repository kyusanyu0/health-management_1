import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import dayjs from "dayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, firebase, auth } from "../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
//   グラフコード
const chartSetting = {
  yAxis: [
    {
      label: "健康グラフ",
    },
  ],
  width: 700,
  height: 500,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];
const valueFormatter = (value) => `${value}mm`;

const HealthRegister = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState();
  const [healths, setHealths] = useState([]);
  const [date, setDate] = React.useState(dayjs().format("YYYY年MM月DD日"));
  const [weight, setWeight] = React.useState("");
  const [sleep, setSleep] = React.useState("");
  const [bloodPressure_l, setBloodPressure_l] = React.useState("");
  const [bloodPressure_h, setBloodPressure_h] = React.useState("");
  const getAuthData = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      }
    });
  };

  const fetchData = async () => {
    try {
      const fetchHealthDataQuery = await db
        .collection("health-info")
        .where("user_email", "==", user.email)
        .onSnapshot((querySnapshot) => {
          const data = [];
          querySnapshot.docs.map((doc) => {
            let item = doc.data();
            item.id = doc.id;
            data.push(item);
          });
          console.log(data);
          setHealths(data);
        });
      return fetchHealthDataQuery;
    } catch (error) {}
  };

  useEffect(() => {
    getAuthData();
    fetchData();
  }, [userInfo]);

  const navigate = useNavigate();
  const calendarBack = () => {
    navigate(`/calendar`);
  };

  const handleDateChange = (newValue) => {
    // Format the date and update the state
    const formattedDate = newValue ? newValue.format("YYYY年MM月DD日") : "";
    setDate(formattedDate);
  };
  const sentData = () => {
    var data = {
      user_display_name: auth.currentUser.displayName,
      user_email: auth.currentUser.email,
      dayTime: date,
      weight: weight,
      sleep: sleep,
      bloodPressure_l: bloodPressure_l,
      bloodPressure_h: bloodPressure_h,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const query = db
      .collection("health-info")
      .add(data)
      .then((docRef) => {
        openSuccesSendMethod();
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    return query;
  };
  //Open success meessage log
  const [openSuccesSend, setOpenSuccesSend] = React.useState(false);
  const openSuccesSendMethod = () => {
    setOpenSuccesSend(true);
  };
  const handleCloseSuccesSend = () => {
    setOpenSuccesSend(false);
  };

  // テキスト取得
  function handleWeight(event) {
    setWeight(event.target.value);
  }
  const handleSleep = (event) => {
    setSleep(event.target.value);
  };
  const handleBloodPressure_l = (event) => {
    setBloodPressure_l(event.target.value);
  };
  const handleBloodPressure_h = (event) => {
    setBloodPressure_h(event.target.value);
  };

  return (
    <>
      <header className="px-4 py-2 flex items-center">
        <h1 className="mr-10 text-xl text-gray-500 fond-bold">健康記録機能</h1>
        <button
          onClick={calendarBack}
          className="border rounded py-2 px-4 mr-5"
        >
          ホーム
        </button>
        <button
          onClick={calendarBack}
          className="border rounded py-2 px-4 mr-5"
        >
          体型管理機能
        </button>
        <button
          onClick={calendarBack}
          className="border rounded py-2 px-4 mr-5"
        >
          診断機能
        </button>
      </header>
      <div
        className="border-2 border-indigo-600 flex items-center h-56"
        style={{ overflow: "scroll", height: "300px" }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: 600 }} aria-label="sticky table">
            <TableHead className="sticky">
              <TableRow>
                <TableCell align="right">年月日</TableCell>
                <TableCell align="right">体重&nbsp;(g)</TableCell>
                <TableCell align="right">睡眠&nbsp;()</TableCell>
                <TableCell align="right">低血圧&nbsp;()</TableCell>
                <TableCell align="right">高血圧&nbsp;()</TableCell>
              </TableRow>
            </TableHead>
            {healths?.map((item) => {
              return (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">{item.dayTime}</TableCell>
                  <TableCell align="right">{item.weight}</TableCell>
                  <TableCell align="right">{item.sleep}</TableCell>
                  <TableCell align="right">{item.bloodPressure_l}</TableCell>
                  <TableCell align="right">{item.bloodPressure_h}</TableCell>
                </TableRow>
              );
            })}
          </Table>
        </TableContainer>
      </div>

      <div className="border-2 border-indigo-600 flex items-center justify-around">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(date, "YYYY年MM月DD日")} // Convert the string back to a dayjs object
            format="YYYY年MM月DD日"
            onChange={handleDateChange}
            defaultValue={dayjs("2023-04-17")}
          />
        </LocalizationProvider>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="体重"
            variant="outlined"
            value={weight}
            onChange={handleWeight}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="睡眠"
            variant="outlined"
            value={sleep}
            onChange={handleSleep}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="低血圧"
            variant="outlined"
            value={bloodPressure_l}
            onChange={handleBloodPressure_l}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="高血圧"
            variant="outlined"
            value={bloodPressure_h}
            onChange={handleBloodPressure_h}
          />
        </Box>
        <Box>
          {" "}
          <AddCircleIcon
            className="cursor-pointer"
            sx={{ fontSize: 40 }}
            color="primary"
            onClick={sentData}
          />
        </Box>
      </div>
      <div className="border-2 border-indigo-600 flex items-center justify-around h-4/5">
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "london", label: "体重", valueFormatter },
            { dataKey: "paris", label: "睡眠", valueFormatter },
            { dataKey: "newYork", label: "低血圧", valueFormatter },
            { dataKey: "seoul", label: "高血圧", valueFormatter },
          ]}
          {...chartSetting}
        />
      </div>
      <Dialog
        open={openSuccesSend}
        onClose={handleCloseSuccesSend}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"成功！！"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            データが無事送信されました。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccesSend} autoFocus>
            終了
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HealthRegister;
