/*eslint-disable */
import styled from "styled-components";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
// import { useUpdateTransport } from "./useUpdateTransport";
import { useState } from "react";
import FileDownload from "../../ui/FileDownload";
import Modal from "../../ui/Modal";
// import AddEditTruck from "./AddEditTruck";

const StyledTruck = styled.div`
  background-color: var(--color-grey-0);
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1.3rem;

  /* input[type="file"] {
    grid-row: 1/5;
    grid-column: 2/4;
    padding: 1rem 2rem;
    border-radius: 1.5rem;
    background-color: var(--color-grey-100);
  } */

  .file-preview {
    position: relative;
    overflow: hidden;
    background-color: var(--color-grey-100);

    grid-row: 1/5;
    grid-column: 2/4;

    padding: 1rem 2rem;
    border-radius: 1.5rem;

    width: 100%;
    height: 100%;

    input {
      width: 40%;
      height: auto;
    }

    button {
      position: absolute;
      bottom: 1.2rem;
    }

    img {
      margin: 1rem;
      border-radius: 1rem;
      position: absolute;
      width: 50%;
      height: 90%;
      top: 0;
      left: 0;
      object-fit: cover;
      display: block;
    }
  }

  /* button[variation="secondary"] {
    grid-column: -2/-1;
    grid-row: 2/3;
  }

  button[variation="primary"],
  [variation="danger"] {
    grid-column: -2/-1;
    grid-row: 3/4;
  }

  button[variation="danger"] {
    background-color: var(--color-red-500);
    &:hover {
      background-color: var(--color-red-700);
    }
  } */
`;

const Field = styled.div`
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;

  &:hover {
    cursor: not-allowed;
  }
`;

function Truck({ truck }) {
  const [filePreview, setFilePreview] = useState(null);

  const handlePreviewFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log(filePreview);
    }
  };
  console.log(truck);

  let status;
  if (truck.status === "stationary") {
    status = "راه نیافتاده";
  } else if (truck.status === "on route") {
    status = "راه افتاده";
  }
  return (
    <StyledTruck>
      <Field style={{ gridColumn: "1/2", gridRow: "1/2" }}>
        نام : {truck.driver_name}
      </Field>

      <Field style={{ gridColumn: "1/2", gridRow: "2/3" }}>
        شماره تماس : {truck.driver_phone}
      </Field>

      <Field style={{ gridColumn: "1/2", gridRow: "3/4" }}>
        پلاک : {truck.plate}
      </Field>

      <Field style={{ gridColumn: "1/2", gridRow: "4/5" }}>
        سریال جی پی اس : {truck.gps_serial}
      </Field>

      <Field
        style={{
          gridColumn: "1/2",
          gridRow: "5/6",
          backgroundColor:
            truck.status === "stationary"
              ? "var(--color-red-100)"
              : "var(--color-green-100)",
        }}
      >
        وضعیت : {status}
      </Field>

      <Field style={{ gridColumn: "2/3", gridRow: "-2/-1" }}>
        حجم بتن : {truck.concrete_volume} متر مکعب
      </Field>

      <Field style={{ gridColumn: "3/4", gridRow: "-2/-1" }}>
        دارای پمپ : {truck.pomp === "yes" ? "بله" : "خیر"}
      </Field>

      <Field className="file-preview">
        <FileInput onChange={handlePreviewFile} disabled />
        <FileDownload fileDataUrl={filePreview} disabled={!filePreview} />
        {filePreview && <img src={filePreview} alt="File Preview" />}
      </Field>

      <Modal>
        <Modal.Open opens="editModal">
          <Button variation="secondary">ویرایش</Button>
        </Modal.Open>
      </Modal>

      <Button variation={truck.status === "stationary" ? "primary" : "danger"}>
        {truck.status === "stationary" ? "راه افتاد" : "راه نیوفتاد"}
      </Button>

      {truck.status !== "arrived" && <Button variation="tertiary">رسید</Button>}
    </StyledTruck>
  );
}

export default Truck;
