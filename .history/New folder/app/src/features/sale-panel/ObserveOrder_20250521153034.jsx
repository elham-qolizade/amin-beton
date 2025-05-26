/*eslint-disable */
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

  span,
  input,
  select,
  textarea {
    color: var(--color-brand-800);
    font-family: inherit;
    font-size: 1.4rem;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-grey-300);
    background: white;
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

const Pumps = styled.div`
  grid-column: 1/-1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
`;

const Pump = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`;

const Vibrators = styled.div`
  grid-column: 1/-1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
`;

const Vibrator = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`;

const Empty = styled.div`
  grid-column: 1/-1;
  color: var(--color-red-600);
`;

function ObserveOrder({ order, onSave }) {
  const [editableOrder, setEditableOrder] = useState(order);
  const handleChange = (key, value) => {
    setEditableOrder((prev) => ({ ...prev, [key]: value }));
  };

  const { concreteList, isLoadingConcreteList } = useConcreteList();
  const { concretePouringTypeList, isLoadingConcretePouringTypeList } =
    useConcretePouringTypeList();
  const { concreteResistanceClassList, isLoadingConcreteResistanceClassList } =
    useConcreteResistanceClassList();
  const { isLoadingPumpList, pumpList } = usePumpList("all");
  const { isLoadingVibratorList, vibratorList } = useVibratorList("all");

  if (
    isLoadingConcreteList ||
    isLoadingConcretePouringTypeList ||
    isLoadingConcreteResistanceClassList ||
    isLoadingPumpList ||
    isLoadingVibratorList
  )
    return <Spinner />;

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{editableOrder.id}#</span> از
        <span> {editableOrder.project.user_fullname} </span>
      </Title>

      <Info>
        <SubTitle>اطلاعات پروژه</SubTitle>

        <InfoItem>
          نام پروژه : <span>{editableOrder.project.title}</span>
        </InfoItem>
        <InfoItem>
          نام کاربری : <span>{editableOrder.project.user_username}</span>
        </InfoItem>
        <InfoItem>
          شماره پروژه : <span>{editableOrder.project.id}</span>
        </InfoItem>
        <InfoItem>
          تاریخ آغاز پروژه :
          <span>
            {convertGeorgianDateToJalali(editableOrder.project.start_date)}
          </span>
        </InfoItem>

        <SubTitle>اطلاعات سفارش</SubTitle>

        <InfoItem>
          شماره سفارش : <span>{editableOrder.order_id}</span>
        </InfoItem>
        <InfoItem>
          متراژ بتن :
          <input
            type="number"
            value={editableOrder.concrete_area_size}
            onChange={(e) => handleChange("concrete_area_size", e.target.value)}
          />
        </InfoItem>

        <InfoItem>
          ارتفاع بتن ریزی :
          <input
            type="number"
            value={editableOrder.concrete_pouring_height}
            onChange={(e) =>
              handleChange("concrete_pouring_height", e.target.value)
            }
          />
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله کشی :
          <input
            type="number"
            value={editableOrder.piping_area_size}
            onChange={(e) => handleChange("piping_area_size", e.target.value)}
          />
        </InfoItem>

        <InfoItem>
          ماله پروانه :
          <select
            value={editableOrder.power_trowel ? "true" : "false"}
            onChange={(e) =>
              handleChange("power_trowel", e.target.value === "true")
            }
          >
            <option value="true">بله</option>
            <option value="false">خیر</option>
          </select>
        </InfoItem>

        <InfoItem>
          نوع بتن :
          <select
            value={editableOrder.concrete_type}
            onChange={(e) => handleChange("concrete_type", +e.target.value)}
          >
            {concreteList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </InfoItem>

        <InfoItem>
          مقطع بتن ریزی :
          <select
            value={editableOrder.concrete_pouring_type}
            onChange={(e) =>
              handleChange("concrete_pouring_type", +e.target.value)
            }
          >
            {concretePouringTypeList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </InfoItem>

        <InfoItem>
          رده مقاومت بتن :
          <select
            value={editableOrder.concrete_resistance_class}
            onChange={(e) =>
              handleChange("concrete_resistance_class", +e.target.value)
            }
          >
            {concreteResistanceClassList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </InfoItem>

        <SubTitle>اطلاعات تکمیلی</SubTitle>

        <InfoItem className="half-row-1">
          اجرا و نظارت آبندی:
          <input
            value={editableOrder.sealing_implementation}
            onChange={(e) =>
              handleChange("sealing_implementation", e.target.value)
            }
          />
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:
          <input
            value={editableOrder.delivery_datetime}
            onChange={(e) => handleChange("delivery_datetime", e.target.value)}
          />
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه :
          <input
            value={editableOrder.settlement_type}
            onChange={(e) => handleChange("settlement_type", e.target.value)}
          />
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی:
          <textarea
            rows="3"
            value={editableOrder.additional_description}
            onChange={(e) =>
              handleChange("additional_description", e.target.value)
            }
          />
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;
