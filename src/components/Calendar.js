import React from 'react';
import { useState, useEffect, useContext } from "react";
import { getMonth } from "./../util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import { EventModal } from "./EventModal";
import GlobalContext from "./../context/GlobalContext";
import ContextWrapper from "./../context/ContextWrapper";
const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
    return (
        <>
            
                {showEventModal && <EventModal />}
                <div className="h-screen flex flex-col">
                    <CalendarHeader />
                    <div className="flex flex-1">
                        <Month month={currentMonth} />
                    </div>
                </div>
           
        </>
    );
};

export default Calendar;
