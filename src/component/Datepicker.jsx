import React, { useState, useRef, useEffect } from "react";
import { Manager, Reference, Popper } from "react-popper";
import Calendar from "./Calendar";
import CalendarIcon from "../assets/calendar.png";

// eslint-disable-next-line react/prop-types
const DatePicker = React.forwardRef(({ date, onSelect }, ref) => {
    const [isVisible, setVisible] = useState(false);
    const popupNode = useRef();

    useEffect(() => {
        function mouseDownListener (e) {
            if (popupNode.current && !popupNode.current.contains(e.target)) {
                setVisible(false);
            }
        }

        if (isVisible) {
            document.addEventListener("mousedown", mouseDownListener);
        }

        return () => {
            document.removeEventListener("mousedown", mouseDownListener);
        };
    }, [isVisible]);
    const showCalendar = () => {
        setVisible(true);
    };
    const selectDate = (date) => {
        setVisible(false);
        onSelect(date);
    };
    return (
        <Manager>
            <Reference>
                {({ ref }) => (
                    <div className="input-icons" ref={ref}>
                        <img src={CalendarIcon} className="img-logo" onClick={() => showCalendar()} />
                        <input
                            className="input-field"
                            type="text"
                            onFocus={() => showCalendar()}
                            value={formattedDate(date)}
                            readOnly
                        />
                    </div>
                )}
            </Reference>
            <Popper placement="bottom-start" innerRef={(node) => (popupNode.current = node)}>
                {({ ref, placement }) =>
                    (isVisible ?
                        <Calendar
                            date={date}
                            data-placement={placement}
                            ref={ref}
                            onSelect={selectDate} /> : null
                    )
                }
            </Popper>
        </Manager>
    );
});

function formattedDate (date) {
    if (!date) {
        return "";
    }

    const formattedMonth = date?.getMonth() < 10 ? `0${date?.getMonth()}` : date?.getMonth();
    const formattedDay = date?.getDate() < 10 ? `0${date?.getDate()}` : date?.getDate();
    const result = `${date?.getFullYear()}-${formattedMonth}-${formattedDay}`;

    return result;
}

export default DatePicker;
