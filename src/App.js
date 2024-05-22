import React, { useState } from 'react';
import Calendar from './component/Calendar';
import Datepicker from './component/Datepicker.jsx';
import './index.css';

const App = () => {
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [date, setDate] = useState(new Date());

    return (<div className="main">
        <Calendar date={calendarDate} onSelect={setCalendarDate} />
        <br />
        <Datepicker date={date} onSelect={setDate}/>
    </div>);
};
export default App;
