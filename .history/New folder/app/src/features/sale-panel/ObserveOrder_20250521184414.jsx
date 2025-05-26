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

const Group = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
`;

const SubGroup = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
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
    setEditableOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleSave = () => {
    console.log("Updated Order:", editableOrder);
    setIsEditing(false);
  };

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{order.id}#</span> از
        <span> {order.project.user_fullname} </span>
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

        <InfoItem>پمپ‌ها :</InfoItem>
        <InfoItem>
          {isEditing ? (
            <select
              multiple
              value={editableOrder.pumps.map((p) => p.id)}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map((o) =>
                  parseInt(o.value)
                );
                const selectedObjects = pumpList.filter((p) =>
                  selected.includes(p.id)
                );
                handleChange("pumps", selectedObjects);
              }}
            >
              {pumpList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          ) : (
            order.pumps?.map((p) => <span key={p.id}>{p.title} | </span>) ||
            "ندارد"
          )}
        </InfoItem>

        <InfoItem>ویبراتورها :</InfoItem>
        <InfoItem>
          {isEditing ? (
            <select
              multiple
              value={editableOrder.vibrators.map((v) => v.id)}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map((o) =>
                  parseInt(o.value)
                );
                const selectedObjects = vibratorList.filter((v) =>
                  selected.includes(v.id)
                );
                handleChange("vibrators", selectedObjects);
              }}
            >
              {vibratorList.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          ) : (
            order.vibrators?.map((v) => <span key={v.id}>{v.title} | </span>) ||
            "ندارد"
          )}
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;
