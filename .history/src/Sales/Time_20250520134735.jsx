import * as React from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { faIR } from "date-fns/locale";
import TextField from "@mui/material/TextField";

function zeroTimeDate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function CustomTimePicker({ value, onChange }) {
  // اگر value نال بود، مقدار 00:00 قرار میدیم
  const displayValue =
    value === null || value === undefined ? zeroTimeDate() : value;

  // تابع داخلی برای هندل کردن تغییر
  const handleChange = (newValue) => {
    // اگر newValue نال بود، به onChange نال میدیم
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={faIR}>
      <TimePicker
        label="انتخاب ساعت"
        value={displayValue}
        onChange={handleChange}
        ampm={false}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            className="custom-timepicker-textfield"
            inputProps={{
              ...params.inputProps,
              className: "custom-timepicker-input",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
