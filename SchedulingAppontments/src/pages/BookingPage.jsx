import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function BookingPage() {
  const today = dayjs();
  const bookedSlot = new Date("2024-03-21T13:36.000Z").toISOString();
  console.log(today.toISOString() === bookedSlot, today.toISOString(), bookedSlot);
  const maxDate = today.add(21, "day");

  const nineAM = dayjs().set("hour", 9).startOf("hour");
  const fourPM = dayjs().set("hour", 16).startOf("hour");

  const handleDisableDates = (date) => {
    const day = date.day();
    return day === 5 || day === 6; // disable Israel weekends
  };
  const handleDisableTime = () => {};

  const handelAccept = () => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        ampm={false}
        minutesStep={15}
        disablePast
        defaultValue={today}
        maxDate={maxDate}
        shouldDisableDate={handleDisableDates}
        disableIgnoringDatePartForTimeValidation={false}
        minTime={nineAM}
        maxTime={fourPM}
        shouldDisableTime={handleDisableDates}
        onAccept={handelAccept}
      />
    </LocalizationProvider>
  );
}
