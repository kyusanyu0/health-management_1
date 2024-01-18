import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export const Day = (props) => {
  const { day, rowIdx } = props;
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);

  // 今日の日付を色付けする
  const getCurrentDayClass = () => {
    console.log(day.format("DD-MM-YY"));
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-green-500 text-white rounded-full w-7"
      : "";
  };

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const isSunday = (day) => {
    return day.day() === 0; // 0 represents Sunday
  };

  const isSaturday = (day) => {
    return day.day() === 6; // 6 represents Saturday
  };

  return (
    <div className="border border-black-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="text-lg mt-1">{day.format("ddd")}</p>}
        <p
          className={`text-2x-1 p-1 my-1 text-center ${getCurrentDayClass()} ${
            isSaturday(day) ? "text-blue-500" : ""
          } ${isSunday(day) ? "text-red-500" : ""}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer overflow-y-auto"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-neutral-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};
