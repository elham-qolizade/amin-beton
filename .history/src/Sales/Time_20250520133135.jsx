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
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={faIR}>
      <TimePicker
        label="انتخاب ساعت"
        value={value || zeroTimeDate()}
        onChange={onChange}
        ampm={false}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            sx={{
              width: 120,
              direction: "rtl",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
            inputProps={{
              ...params.inputProps,
              style: {
                textAlign: "center",
                fontSize: "0.9rem",
                padding: "6px 8px",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
