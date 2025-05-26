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
              width: 120, // اندازه کوچکتر (مثلاً 120px)
              direction: "rtl",
              borderRadius: "8px",
              backgroundColor: "white",
              input: {
                textAlign: "center", // وسط چین کردن متن داخل فیلد
                padding: "6px 8px", // کم کردن padding برای کوچکتر شدن فیلد
                fontSize: "0.9rem", // کوچک کردن فونت
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
