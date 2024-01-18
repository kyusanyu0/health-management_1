import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import React, { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import GlobalContext from "./../context/GlobalContext";
import { Link , useNavigate  } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth,provider } from "../firebase";
import Home from "./Home";
import './Calendar.css';

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
  const Home =()=>{
    navigate(`/Home`);
  }
  
  return (
    <header className="header">
      <h2 className="day">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY年MMMM")}
      </h2>
      <button onClick={handleReset} className="today">
        現在の日付
      </button>
      <button onClick={handlePrevMonth}className ="month">
          <MdChevronLeft />
      </button>
      <button onClick={handelNextMonth}className="month">
          <MdChevronRight />
      </button>
      

      <button onClick={handelHealthRegister} className="health">
        
        健康記録
       
      </button>
      <button onClick={handelHealthRegister} className="health">
        
        カロリー計算機能
       
      </button>
      <button onClick={Home} className="out">
        
        ログアウト
       
      </button>

      
    </header>
  );
};
