/*eslint-disable */
import { useRef, useEffect } from "react";

import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import Input from "./Input";

function PersianDatePicker({ field, ...props }) {
  // Input reference
  const datePickerInputRef = useRef(null);

  // Initialize the Jalali date picker
  useEffect(() => {
    // Start watching all inputs with data-jdp attribute for the date picker
    window.jalaliDatepicker.startWatch({
      minDate: "attr",
      time: true,
      hasSecond: false,
    });

    // Attach a change event listener to update React Hook Form's state
    const handleDateChange = (event) => {
      // Update React Hook Form's state with the new value
      field.onChange(event.target.value);
    };

    const inputEl = datePickerInputRef.current;
    inputEl.addEventListener("change", handleDateChange);

    // Cleanup the event listener
    return () => {
      inputEl.removeEventListener("change", handleDateChange);
    };
  }, [field]);

  // Function to show the date picker
  const handleFocus = () => {
    window.jalaliDatepicker.show(datePickerInputRef.current);
  };

  return (
    <Input
      {...field}
      placeholder="تاریخ و ساعت درخواستی"
      //   ref={datePickerInputRef}
      ref={(e) => {
        datePickerInputRef.current = e; // Assign the ref to the input element
        if (typeof field.ref === "function") {
          field.ref(e); // Also, pass the ref to React Hook Form if it's a function
        }
      }}
      onFocus={handleFocus}
      data-jdp
      data-jdp-min-date="today"
      {...props}
    />
  );
}

export default PersianDatePicker;
