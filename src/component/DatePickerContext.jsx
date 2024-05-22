import { createContext, useEffect, useState } from "react";


export const DatepickerCtx = createContext({
    date: new Date(),
    visible: {
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    },
    view: "day",
    nextMonth: () => {},
    prevMonth: () => {},
    nextYear: () => {},
    prevYear: () => {},
    nextDecade: () => {},
    prevDecade: () => {},
    selectMonth: (m) => {},
    selectYear: (y) => {},
    selectDate: (d) => {},
    viewMonths: () => {},
    viewYears: () => {},
    isVisible: false,
    showCalendar: () => {},
    toggleCalendar: () => {},
    isSelectedDate: (d) => false
});

export function useDatepickerCtx (
    date,
    onSelect,
    ref,
) {
    const [monthYear, setMonthYear] = useState({
        month: date?.getMonth() ?? new Date().getMonth(),
        year: date?.getFullYear() ?? new Date().getFullYear(),
        day: date?.getDate() ?? new Date().getDate()
    });

    const [view, setView] = useState("day");

    const [isVisible, setVisible] = useState(false);

    const selectDate = (d) => {
        onSelect(new Date(monthYear.year, monthYear.month, d));
        setVisible(false);
    };

    const isSelectedDate = (d) => {
        if (
            d === date.getDate() &&
      monthYear.month === date.getMonth() &&
      monthYear.year === date.getFullYear()
        ) {
            return true;
        }
        return false;
    };

    const selectMonth = (m) => {
        setMonthYear((state) => ({ ...state, month: m }));
        setView('day');
    };

    const selectYear = (y) => {
        setMonthYear((state) => ({ ...state, year: y }));
        setView('month');
    };

    useEffect(() => {
        function mouseDownListener (e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setVisible(false);
            }
        }

        if (isVisible) {
            setMonthYear({ month: date.getMonth(), year: date.getFullYear() });
            document.addEventListener('mousedown', mouseDownListener);
        }

        return () => {
            document.removeEventListener('mousedown', mouseDownListener);
        };
    }, [isVisible]);

    return {
        date,
        visible: monthYear,
        view,
        nextMonth: () =>
            setMonthYear((state) =>
                state.month >= 11 ?
                    { month: 0, year: state.year + 1 } :
                    { month: state.month + 1, year: state.year }
            ),
        prevMonth: () =>
            setMonthYear((state) =>
                state.month <= 0 ?
                    { month: 11, year: state.year - 1 } :
                    { month: state.month - 1, year: state.year }
            ),
        nextYear: () =>
            setMonthYear((state) => ({ ...state, year: state.year + 1 })),
        prevYear: () =>
            setMonthYear((state) => ({ ...state, year: state.year - 1 })),
        nextDecade: () =>
            setMonthYear((state) => ({ ...state, year: state.year + 10 })),
        prevDecade: () =>
            setMonthYear((state) => ({ ...state, year: state.year - 10 })),
        selectMonth,
        selectYear,
        selectDate,
        viewMonths: () => setView('month'),
        viewYears: () => setView('year'),
        isVisible,
        showCalendar: () => setVisible(true),
        toggleCalendar: () => setVisible((state) => !state),
        isSelectedDate
    };
}
