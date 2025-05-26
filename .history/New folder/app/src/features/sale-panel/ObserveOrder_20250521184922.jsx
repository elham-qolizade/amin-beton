/* eslint-disable */
import styled, { css } from "styled-components";
import { useState } from "react";
import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  useConcreteResistanceClassList,
  usePumpList,
  useVibratorList,
} from "../../hooks/useDropdownsData";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

const StyledObserveOrder = styled.div`
  width: 75vw;
  height: 70vh;
  overflow-y: scroll;
`;

const Title = styled.h4`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  span {
    color: var(--color-brand-600);
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-grey-100);
  span {
    color: var(--color-brand-800);
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }
`;

const InfoItem = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 1.5rem;
  background-color: white;
  line-height: 2;
  ${(props) =>
    props.className === "full-row" &&
    css`
      grid-column: 1/-1;
    `}
  ${(props) =>
    props.className === "half-row-1" &&
    css`
      grid-column: 1/3;
    `}
  ${(props) =>
    props.className === "half-row-2" &&
    css`
      grid-column: 3/5;
    `}
`;

const SubTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  grid-column: 1/-1;
  text-align: center;
`;

function ObserveOrder({ order }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);

  const { concreteList } = useConcreteList();
  const { concretePouringTypeList } = useConcretePouringTypeList();
  const { concreteResistanceClassList } = useConcreteResistanceClassList();
  const { pumpList } = usePumpList("all");
  const { vibratorList } = useVibratorList("all");

  const handleChange = (field, value) => {
    setEditableOrder((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const handleSave = () => {
    console.log("Updated Order:", editableOrder);
    setIsEditing(false);
  };

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{order.id}#</span> از{" "}
        <span>{order.project.user_fullname}</span>
      </Title>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Button onClick={toggleEdit}>
          {isEditing ? "لغو ویرایش" : "ویرایش"}
        </Button>
        {isEditing && <Button onClick={handleSave}>ذخیره تغییرات</Button>}
      </div>

      <Info>
        <SubTitle>اطلاعات پروژه</SubTitle>
        <InfoItem>
          نام پروژه : <span>{order.project.title}</span>
        </InfoItem>
        <InfoItem>
          نام کاربری : <span>{order.project.user_username}</span>
        </InfoItem>
        <InfoItem>
          شماره پروژه : <span>{order.project.id}</span>
        </InfoItem>
        <InfoItem>
          تاریخ آغاز :{" "}
          <span>{convertGeorgianDateToJalali(order.project.start_date)}</span>
        </InfoItem>

        <SubTitle>اطلاعات سفارش</SubTitle>
        <InfoItem>
          شماره سفارش : <span>{order.order_id}</span>
        </InfoItem>

        <InfoItem>
          متراژ بتن :
          {isEditing ? (
            <input
              type="number"
              value={editableOrder.concrete_area_size}
              onChange={(e) =>
                handleChange("concrete_area_size", e.target.value)
              }
            />
          ) : (
            <span>{order.concrete_area_size} مترمکعب</span>
          )}
        </InfoItem>

        <InfoItem>
          ارتفاع بتن ریزی:
          {isEditing ? (
            <input
              type="number"
              value={editableOrder.concrete_pouring_height}
              onChange={(e) =>
                handleChange("concrete_pouring_height", e.target.value)
              }
            />
          ) : (
            <span>{order.concrete_pouring_height} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله کشی:
          {isEditing ? (
            <input
              type="number"
              value={editableOrder.piping_area_size}
              onChange={(e) => handleChange("piping_area_size", e.target.value)}
            />
          ) : (
            <span>{order.piping_area_size} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          ماله پروانه:
          {isEditing ? (
            <select
              value={editableOrder.power_trowel}
              onChange={(e) =>
                handleChange("power_trowel", e.target.value === "true")
              }
            >
              <option value="true">بله</option>
              <option value="false">خیر</option>
            </select>
          ) : (
            <span>{order.power_trowel ? "بله" : "خیر"}</span>
          )}
        </InfoItem>

        <InfoItem>
          نوع بتن:
          {isEditing ? (
            <select
              value={editableOrder.concrete_type}
              onChange={(e) =>
                handleChange("concrete_type", parseInt(e.target.value))
              }
            >
              {concreteList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concreteList.find((c) => c.id === order.concrete_type)?.title ||
                "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          مقطع بتن ریزی:
          {isEditing ? (
            <select
              value={editableOrder.concrete_pouring_type}
              onChange={(e) =>
                handleChange("concrete_pouring_type", parseInt(e.target.value))
              }
            >
              {concretePouringTypeList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concretePouringTypeList.find(
                (c) => c.id === order.concrete_pouring_type
              )?.title || "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          رده مقاومت بتن:
          {isEditing ? (
            <select
              value={editableOrder.concrete_resistance_class}
              onChange={(e) =>
                handleChange(
                  "concrete_resistance_class",
                  parseInt(e.target.value)
                )
              }
            >
              {concreteResistanceClassList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concreteResistanceClassList.find(
                (c) => c.id === order.concrete_resistance_class
              )?.title || "نامشخص"}
            </span>
          )}
        </InfoItem>

        <SubTitle>اطلاعات تکمیلی</SubTitle>
        <InfoItem className="half-row-1">
          اجرا و نظارت آبندی:
          {isEditing ? (
            <input
              value={editableOrder.sealing_implementation}
              onChange={(e) =>
                handleChange("sealing_implementation", e.target.value)
              }
            />
          ) : (
            <span>{order.sealing_implementation}</span>
          )}
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:
          {isEditing ? (
            <input
              type="datetime-local"
              value={editableOrder.delivery_datetime}
              onChange={(e) =>
                handleChange("delivery_datetime", e.target.value)
              }
            />
          ) : (
            <span>
              {convertGeorgianDateToJalali(
                order.delivery_datetime.split(" ")[0]
              )}{" "}
              - {order.delivery_datetime.split(" ")[1]}
            </span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه:
          {isEditing ? (
            <input
              value={editableOrder.settlement_type}
              onChange={(e) => handleChange("settlement_type", e.target.value)}
            />
          ) : (
            <span>{order.settlement_type}</span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی:
          {isEditing ? (
            <textarea
              value={editableOrder.additional_description}
              onChange={(e) =>
                handleChange("additional_description", e.target.value)
              }
            />
          ) : (
            <span>{order.additional_description}</span>
          )}
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;
