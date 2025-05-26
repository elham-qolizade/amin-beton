/*eslint-disable */
import { useState } from "react";
import styled from "styled-components";

import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

import RadioInput from "../../ui/RadioInput";
import {
  RadioGroup,
  RadioLabel,
  RadioButton,
  RadioHtmlInput,
} from "../../ui/RadioGroup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StyledAddEditTruck = styled.div`
  & form {
    min-width: 120rem;
    background-color: var(--color-grey-0);
    padding: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 1.3rem;
  }

  .way-bill {
    position: relative;
    overflow: hidden;
    background-color: var(--color-grey-100);

    grid-row: 1/5;
    grid-column: 2/4;

    padding: 1rem 2rem;
    border-radius: 1.5rem;

    width: 100%;
    height: 100%;

    p {
      margin: 1.5rem 2rem;
    }

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

  .pomp-radio {
    display: flex;
    grid-column: 3/4;
    grid-row: -2/-1;

    input {
      outline: none;
    }
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
  }
`;

const Field = styled.div`
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
`;

// ################################################################

function AddEditTruck({ truckToEdit = {} }) {
  const { id: editId, ...editValues } = truckToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const [filePreview, setFilePreview] = useState(null);

  const handlePreviewFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data) {
    reset();
    console.log(data);
  }

  function onError(errors) {
    console.log(errors);
    toast.error("لطفا همه ی فیلد ها را پر کنید.");
  }

  return (
    <StyledAddEditTruck>
      <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
        <Input
          placeholder="اسم راننده"
          style={{ gridColumn: "1/2", gridRow: "1/2" }}
          {...register("driver_name", {
            required: "این فیلد الزامی می باشد!",
          })}
        />

        <Input
          placeholder="تلفن راننده"
          style={{ gridColumn: "1/2", gridRow: "2/3" }}
          {...register("driver_phone", {
            required: "این فیلد الزامی می باشد!",
          })}
        />

        <Input
          placeholder="پلاک ماشین"
          style={{ gridColumn: "1/2", gridRow: "3/4" }}
          {...register("plate", {
            required: "این فیلد الزامی می باشد!",
          })}
        />

        <Input
          placeholder="سریال جی پی اس"
          style={{ gridColumn: "1/2", gridRow: "4/5" }}
          {...register("gps_serial", {
            required: "این فیلد الزامی می باشد!",
          })}
        />

        <Input
          placeholder="وضعیت مرسوله"
          disabled
          style={{ gridColumn: "1/2", gridRow: "5/6" }}
          {...register("status", {})}
        />

        <Input
          placeholder="حجم بتن (متر مکعب)"
          style={{ gridColumn: "2/3", gridRow: "-2/-1" }}
          {...register("concrete_volume", {
            required: "این فیلد الزامی می باشد!",
          })}
        />

        {/* ################################################################################ */}

        <Field className="pomp-radio">
          <p>دارای پمپ : </p>
          <RadioInput>
            <RadioGroup className="radio-group">
              <RadioHtmlInput
                className="radio-input"
                id={"with-pomp"}
                name={"pomp"}
                value={"yes"}
                {...register("pomp", {
                  required: "این فیلد الزامی می باشد!",
                })}
              />
              <RadioLabel htmlFor={"with-pomp"} className="radio-label">
                <RadioButton className="radio-button" />
                بله
              </RadioLabel>
            </RadioGroup>

            <RadioGroup className="radio-group">
              <RadioHtmlInput
                className="radio-input"
                id={"no-pomp"}
                name={"pomp"}
                value={"no"}
                {...register("pomp", {
                  required: "این فیلد الزامی می باشد!",
                })}
              />
              <RadioLabel htmlFor={"no-pomp"} className="radio-label">
                <RadioButton className="radio-button" />
                خیر
              </RadioLabel>
            </RadioGroup>
          </RadioInput>
        </Field>

        {/* ################################################################################ */}

        <Field className="way-bill">
          <p>فایل بارنامه</p>
          <FileInput
            {...register("way_bill", {
              // required: isEditSession ? false : "این فیلد الزامی می باشد!",
            })}
            onChange={handlePreviewFile}
          />
          {filePreview && <img src={filePreview} alt="File Preview" />}
        </Field>

        {/* ################################################################################ */}

        <Button>{isEditSession ? "ویرایش" : "افزودن"}</Button>
      </Form>
    </StyledAddEditTruck>
  );
}

export default AddEditTruck;
