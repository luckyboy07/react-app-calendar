/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from "react";
import "./calendar.css";

const MONTHS_NAME = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DateSelection = ({ date, selectedYear, selectedMonth, onSelectDate }) => {
    const now = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const isSelectedDate = (d) => (d === date?.getDate() &&
        selectedMonth === date?.getMonth() && selectedYear === date?.getFullYear());

    const currentDate = (d) => (d === now?.getDate() &&
        now?.getMonth() === selectedMonth && now?.getFullYear() === selectedYear);

    const renderDays = () => {
        const getFirstDayCurrrentDate = new Date(selectedYear, selectedMonth, 1);
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(selectedYear, selectedMonth).getDay();
        const getLastDayCurrrentDate = new Date(selectedYear, selectedMonth, daysInMonth);
        const getPrevDatesBySub = getFirstDayCurrrentDate.setDate(getFirstDayCurrrentDate.getDate() - firstDayOfMonth);
        const getDayOfPrevMonth = new Date(getPrevDatesBySub).getDate();
        const weekOfDayNextMonth = new Date(getLastDayCurrrentDate).getDay();
        const visibleNumberOfDaysFromNextMonth = (weekOfDayNextMonth <= 0 ? 6 : 13) - weekOfDayNextMonth;
        const days = [];

        // Populate carried over days from previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(
                <div key={`empty-${i}`} className="empty-day">
                    {getDayOfPrevMonth + i}
                </div>
            );
        }

        // Populate days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div
                    key={`day-${i}`}
                    // eslint-disable-next-line no-nested-ternary
                    className={`day label ${isSelectedDate(i) ? "selected" : currentDate(i) ? "currentDay" : ""}`}
                    onClick={() => onSelectDate(i)}
                >
                    {i}
                </div>
            );
        }
        // Populate days for next month
        for (let i = 0; i < visibleNumberOfDaysFromNextMonth; i++) {
            days.push(
                <div key={`empty-next-${i}`} className="empty-day">
                    {i + 1}
                </div>
            );
        }
        return days;
    };

    return (
        <>
            <div className="day-labels">
                {dayNames.map((day, index) => {
                    return (
                        <div className="label" key={index}>
                            {day}
                        </div>
                    );
                })}
            </div>
            <div className="days">{renderDays()}</div>
        </>
    );
};

const MonthSelection = ({ onSelectMonth }) => {
    return (
        <div className="month-list">
            {MONTHS_NAME.map((month, index) => (
                <div className="month label" onClick={() => onSelectMonth(index)}>
                    {month}
                </div>
            ))}
        </div>
    );
};

const YearSelection = ({ selectedYear, onSelectYear }) => {
    const [yearList, setYearList] = useState([]);

    const getYearDecade = (firstYearDecade) => {
        let yearList = [];

        for (let i = 0; i < 10; i++) {
            yearList.push(firstYearDecade + i);
        }

        setYearList(yearList);

        return yearList;
    };

    useEffect(() => {
        const beginOfDecade = selectedYear - (selectedYear % 10);

        getYearDecade(beginOfDecade);
    }, [selectedYear]);

    return (
        <div className="year-decade-list">
            {yearList?.map((year) => (
                <div className="year label" key={year} onClick={() => onSelectYear(year)}>
                    {year}
                </div>
            ))}
        </div>
    );
};

const Calendar = React.forwardRef(({ date, onSelect }, ref) => {
    const now = useMemo(() => new Date(), []);
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [firstYearDecade, setFirstSelectedYearDecade] = useState();
    const [selectionTab, setSelectionTab] = useState("day");

    const selectDate = (date) => {
        const newDate = new Date(selectedYear, selectedMonth, date);

        onSelect(newDate);
    };

    const changeSelectedTab = (tab) => {
        setSelectionTab(tab);
    };

    const selectMonth = (month) => {
        setSelectedMonth(month);
        setSelectionTab("day");
    };

    const decrementDecade = () => {
        const currentYear = selectedYear - 10;

        setSelectedYear(currentYear);
    };

    const incrementDecade = () => {
        const currentYear = selectedYear + 10;

        setSelectedYear(currentYear);
    };

    const goToPrevMonth = () => {
        if (selectionTab === "month") {
            const decreaseYear = selectedYear - 1;

            setSelectedYear(decreaseYear);
        } else if (selectionTab === "year") {
            decrementDecade();
        } else {
            let decreaseMonth = selectedMonth - 1;

            if (selectedMonth === 0) {
                decreaseMonth = 11;
                const decreaseYear = selectedYear - 1;

                setSelectedYear(decreaseYear);
            }
            setSelectedMonth(decreaseMonth);
        }
    };

    const goToNextMonth = () => {
        if (selectionTab === "month") {
            const increaseYear = selectedYear + 1;

            setSelectedYear(increaseYear);
        } else if (selectionTab === "year") {
            incrementDecade();
        } else {
            let increaseMonth = selectedMonth + 1;

            if (selectedMonth === 11) {
                increaseMonth = 0;
                const increaseYear = selectedYear + 1;

                setSelectedYear(increaseYear);
            }

            setSelectedMonth(increaseMonth);
        }
    };

    const selectYear = (year) => {
        setSelectedYear(year);
        setSelectionTab("month");
    };

    useEffect(() => {
        const beginOfDecade = selectedYear - (selectedYear % 10);

        setFirstSelectedYearDecade(beginOfDecade);
    }, [selectionTab, selectedYear]);

    return (
        <div className="calendar" ref={ref}>
            <div className="header">
                <a className="navPrev round" onClick={() => goToPrevMonth()}>&#8249;</a>
                <div className="month-year">
                    {selectionTab === "day" && (
                        // eslint-disable-next-line max-len
                        <a onClick={() => changeSelectedTab("month")}>{`${MONTHS_NAME[selectedMonth]} ${selectedYear}`}</a>
                    )}
                    {selectionTab === "month" && <a onClick={() => changeSelectedTab("year")}>{selectedYear}</a>}
                    { selectionTab === "year" &&
                    <a onClick={() => changeSelectedTab("year")}>{`${firstYearDecade} - ${selectedYear}`}</a> }
                </div>
                <a className="navNext round" onClick={() => goToNextMonth()}>&#8250;</a>
            </div>
            {selectionTab === "day" && (
                // eslint-disable-next-line max-len
                <DateSelection date={date} selectedMonth={selectedMonth} selectedYear={selectedYear} onSelectDate={selectDate} />
            )}
            {selectionTab === "month" && <MonthSelection onSelectMonth={selectMonth} />}
            {selectionTab === "year" && <YearSelection onSelectYear={selectYear} selectedYear={selectedYear} />}
        </div>
    );
});

export default Calendar;
