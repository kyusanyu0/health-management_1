import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import React, { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import GlobalContext from "./../context/GlobalContext";
import { Link , useNavigate  } from "react-router-dom";

dayjs.locale(ja);

export const CalendarHeader = () => {
  const navigate = useNavigate();
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handelNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    // 現在の月を取得
    setMonthIndex(dayjs().month());
  };
  const handelHealthRegister =()=>{
    navigate(`/health-register`);
  };
  const calendarBack = () => {
    navigate(`/calendar`);
  };
  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronLeft />
        </span>
      </button>
      <button onClick={handelNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
      <h2 className="ml-4 mr-20 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

      <button onClick={handelHealthRegister} className="border rounded py-2 px-4 mr-5">
        
        健康記録
       
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
  );
};