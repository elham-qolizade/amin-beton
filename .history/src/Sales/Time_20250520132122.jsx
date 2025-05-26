// src/ui/CustomTimePicker.jsx

import * as React from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { faIR } from "date-fns/locale";
import TextField from "@mui/material/TextField";

export default function CustomTimePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={faIR}>
      <TimePicker
        label="انتخاب ساعت"
        value={value}
        onChange={onChange}
        ampm={false} // 24 ساعته
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            sx={{
              width: "100%",
              direction: "rtl",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
