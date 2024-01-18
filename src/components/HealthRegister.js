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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//   グラフコード
const chartSetting = {
  yAxis: [
    {
      label: "健康グラフ",
    },
  ],
  width: 1500,
  height: 500,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};


const valueFormatter = (value) => `${value}`;

const HealthRegister = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState();
  const [healths, setHealths] = useState([]);
  const [healthsCharts, setHealthsCharts] = useState([]);
  const [date, setDate] = React.useState(dayjs().format("YYYY年MM月DD日"));
  const [dateStart, setDateStart] = React.useState(dayjs().format("YYYY年MM月DD日"));
  const [dateEnd, setDateEnd] = React.useState(dayjs().format("YYYY年MM月DD日"));
  const [weight, setWeight] = React.useState("");
  const [sleep, setSleep] = React.useState("");
  const [bloodPressure_l, setBloodPressure_l] = React.useState("");
  const [bloodPressure_h, setBloodPressure_h] = React.useState("");
  const [healthSelect, setHealthSelect] = React.useState(10);
  const [period, setPeriod] = React.useState(40);
  const handleChangeHealthSelect = (event) => {
    setHealthSelect(event.target.value);
  };
  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  };

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
            // item.timestamp = convertToTimestamp(item.date);
            data.push(item);
          });
          // console.log(data);
          // data.sort((a, b) => a.timestamp - b.timestamp);
          setHealths(data);
          setHealthsCharts(data);
        });
      return fetchHealthDataQuery;
    } catch (error) { }
  };



  for (let i = 0; i < healths.length; i++) {
    var dateString = healths[i].dayTime;
    var dt1 = parseInt(dateString.substring(8, 10));
    var mon1 = parseInt(dateString.substring(5, 7));
    var yr1 = parseInt(dateString.substring(0, 4));
    var dateStringCreated = dt1 + "/" + mon1 + "/" + yr1;
    // console.log(dt1,mon1,yr1);
    // var timestamp = Date.parse(dateStringCreated);
    // var dataObject = new Date(timestamp);
    var date1 = new Date(yr1, mon1 - 1, dt1);
    healths[i].dayTimestamp = date1.getTime();

  }
  healths.sort(function (x, y) {
    return x.dayTimestamp - y.dayTimestamp;
  })
  const changeTimeStringToTimestamp = (dateString) => {
    var dt1 = parseInt(dateString.substring(8, 10));
    var mon1 = parseInt(dateString.substring(5, 7));
    var yr1 = parseInt(dateString.substring(0, 4));
    var date1 = new Date(yr1, mon1 - 1, dt1);
    return date1.getTime();;
  };

  function getArrayOfNames(arrayOfObjects) {
    return arrayOfObjects.map(obj => obj.dayTime);
  }

  var healthsObjectDate = getArrayOfNames(healths);


  useEffect(() => {
    getAuthData();
    fetchData();
  }, [userInfo]);
  // var dataFoChart = healths;

  // for(let i =0;i<dataFoChart.length;i++){
  //   console.log(typeof dataFoChart[i].dayTime);
  //   dataFoChart[i].timeStamp=Date.parse(dataFoChart[i].dayTime + " 01:01:01");
  //   console.log(dataFoChart[i].timeStamp);
  // }



  useEffect(() => {
    getAuthData();
    // console.log(healths);
  }, [healthSelect, period]);

  const navigate = useNavigate();
  const calendarBack = () => {
    navigate(`/calendar`);
  };
  function parseDate(dateString) {
    var parts = dateString.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  const handleDateChange = (newValue) => {
    // Format the date and update the state
    const formattedDate = newValue ? newValue.format("YYYY年MM月DD日") : "";
    setDate(formattedDate);
  };
  const handleDateStartChange = (newValue) => {
    const formattedDate = newValue ? newValue.format("YYYY年MM月DD日") : "";
    setDateStart(formattedDate);
  };
  const handleDateEndChange = (newValue) => {
    const formattedDate = newValue ? newValue.format("YYYY年MM月DD日") : "";
    setDateEnd(formattedDate);
  };

  console.log(healths);
  const sentData = () => {
    var sentAgainFlag = false;
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

    healths.forEach((health) => {
      if (health.dayTime === date) {
        sentAgainFlag = true;
      }
    })
    if (sentAgainFlag) {
      const collectionRef = db.collection("health-info");
      const query = collectionRef.where("dayTime", "==", date);

      // query = db
      //   .collection("health-info")
      //   .update(data)
      //   .then((docRef) => {
      //     openSuccesSendMethod();
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });
      query.get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            if (sentAgainFlag) {
              docRef.set(data)
                .then(() => {
                  openSuccesSendMethod();
                  console.log("Document updated successfully");
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
            } else {
              console.log("Update condition not met, document not updated");
            }
          } else {
            console.log("No document found matching the condition");
          }
        })
        .catch((error) => {
          console.error("Error querying documents: ", error);
        });

      return query;
    } else {
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


    }
  };

  useEffect(() => {
    console.log('Change date');
    var timeStampStart = changeTimeStringToTimestamp(dateStart);
    var timeStampEnd = changeTimeStringToTimestamp(dateEnd);
    setHealthsCharts(filterDatesInRange(healths, timeStampStart, timeStampEnd));
    console.log(healths);
    console.log(healthsCharts);

  }, [dateStart, dateEnd]);

  function filterDatesInRange(healths, startDate, endDate) {
    const filteredDates = healths.filter(health => {
      const timestamp = health.dayTimestamp;
      return timestamp >= startDate && timestamp <= endDate;
    });

    return filteredDates;
  }
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
          カロリー計算機能
        </button>
        <button
          onClick={calendarBack}
          className="border rounded py-2 px-4 mr-5"
        >
          診断機能
        </button>
      </header>
      <div
        className="border-2 border-indigo-600 flex items-center"
        style={{ overflow: "scroll" }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 210 }}>
          <Table stickyHeader sx={{ minWidth: 600 }} aria-label="sticky table">
            <TableHead className="sticky">
              <TableRow>
                <TableCell align="right">年月日</TableCell>
                <TableCell align="right">体重&nbsp;(kg)</TableCell>
                <TableCell align="right">睡眠&nbsp;(h)</TableCell>
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
      {/* <div className="border-2 border-indigo-600 flex items-center justify-around h-4/5"> */}
      <div className="border-2 border-indigo-600">
        <div className="flex items-center justify-start h-4/5 mt-3" >
          <FormControl >
            <InputLabel id="demo-simple-select-label">項目</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={healthSelect}
              label="項目"
              onChange={handleChangeHealthSelect}

            >
              <MenuItem value={10}>体重</MenuItem>
              <MenuItem value={20}>睡眠</MenuItem>
              <MenuItem value={30}>血圧</MenuItem>
              <MenuItem value={0}>すべて</MenuItem>
            </Select>
          </FormControl>

          <FormControl >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <InputLabel id="demo-simple-select-label">開始日</InputLabel> */}
              <DatePicker
                value={dayjs(date, "YYYY年MM月DD日")} // Convert the string back to a dayjs object
                format="YYYY年MM月DD日"
                onChange={handleDateStartChange}

                label="開始日"
              />
            </LocalizationProvider>
          </FormControl >
          {/* <InputLabel id="demo-simple-select-label">終了日</InputLabel> */}
          <FormControl >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(date, "YYYY年MM月DD日")} // Convert the string back to a dayjs object
                format="YYYY年MM月DD日"
                onChange={handleDateEndChange}

                label='終了日'
              />
            </LocalizationProvider>
          </FormControl>
        </div>

        <div className="flex items-center justify-around h-4/5">
          <Box>
            {healthSelect === 10 && healthsCharts.length > 0 ? (
              <BarChart
                dataset={healthsCharts}
                xAxis={[{ scaleType: "band", dataKey: "dayTime", categoryGapRatio: 0.2 }]}
                series={[
                  { dataKey: "weight", label: "体重", valueFormatter },
                  // { dataKey: "paris", label: "睡眠", valueFormatter },
                  // { dataKey: "newYork", label: "低血圧", valueFormatter },
                  // { dataKey: "seoul", label: "高血圧", valueFormatter },
                ]}
                width={1000}


                {...chartSetting}
              />
            ) : (
              <p></p>
            )}
            {healthSelect === 20 && healthsCharts && healthsCharts.length > 0 ? (
              <BarChart
                dataset={healthsCharts}
                xAxis={[{ scaleType: "band", dataKey: "dayTime" }]}
                series={[
                  { dataKey: "sleep", label: "睡眠", valueFormatter },
                  // { dataKey: "paris", label: "睡眠", valueFormatter },
                  // { dataKey: "newYork", label: "低血圧", valueFormatter },
                  // { dataKey: "seoul", label: "高血圧", valueFormatter },
                ]}
                {...chartSetting}
              />
            ) : (
              <p></p>
            )}
            {healthSelect === 0 && healthsCharts && healthsCharts.length > 0 ? (
              <BarChart
                dataset={healths}
                xAxis={[{ scaleType: "band", dataKey: "dayTime" }]}
                series={[
                  { dataKey: "weight", label: "体重", valueFormatter },
                  { dataKey: "sleep", label: "睡眠", valueFormatter },
                  { dataKey: "bloodPressure_l", label: "低血圧", valueFormatter },
                  { dataKey: "bloodPressure_h", label: "高血圧", valueFormatter },
                  // { dataKey: "newYork", label: "低血圧", valueFormatter },
                  // { dataKey: "seoul", label: "高血圧", valueFormatter },
                ]}
                {...chartSetting}
              />
            ) : (
              <p></p>
            )}
            {healthSelect === 30 && healthsCharts && healthsCharts.length > 0 ? (
              <BarChart
                dataset={healthsCharts}
                xAxis={[{ scaleType: "band", dataKey: "dayTime" }]}
                series={[
                  { dataKey: "bloodPressure_l", label: "低血圧", valueFormatter },
                  { dataKey: "bloodPressure_h", label: "高血圧", valueFormatter },
                ]}
                {...chartSetting}
              />
            ) : (
              <p></p>
            )}
          </Box>
          {/* <BarChart
            dataset={healths}
            xAxis={[{ scaleType: "band", dataKey: "dayTime" }]}
            series={[
              { dataKey: "weight", label: "体重", valueFormatter },
              // { dataKey: "paris", label: "睡眠", valueFormatter },
              // { dataKey: "newYork", label: "低血圧", valueFormatter },
              // { dataKey: "seoul", label: "高血圧", valueFormatter },
            ]}
            {...chartSetting}
          /> */}
        </div>
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
