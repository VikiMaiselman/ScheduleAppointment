import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import axios from "axios";
import { url, headers } from "../util/configs";

export default function CreateReservation() {
  const { state } = useLocation();
  const { price, duration, name } = state;

  const { procedureId } = useParams();

  const [timeSlots, setTimeSlots] = React.useState();

  console.log(state);

  const handleClick = async (e) => {
    console.log(e.target, new Date(+e.target.dataset.timestamp));
    const day = new Date(+e.target.dataset.timestamp);
    console.log(day);

    const response = await axios.get(`${url}/workday-slots/${procedureId}?workdayDate=${+e.target.dataset.timestamp}`);
    const x = response.data
      .filter((timeSlot) => timeSlot !== null)
      .map((timeSlot) => new Date(timeSlot).toLocaleTimeString());
    console.log(x);
    setTimeSlots(x);
  };
  return (
    <>
      <h1>{name}</h1>
      <p>{duration} min</p>

      <h2>Choose day and time:</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onClick={handleClick} />
      </LocalizationProvider>

      <div>
        {timeSlots &&
          React.Children.toArray(
            timeSlots.map((slot) => {
              return <p>{slot}</p>;
            })
          )}
      </div>
    </>
  );
}
