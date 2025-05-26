/*eslint-disable */
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
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
import { toast } from "react-hot-toast";

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
    margin-top: 1rem;
    padding: 0.5rem;
    width: 80%;
    font-size: 1.4rem;
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

function ObserveOrder({ order }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);

  const { concreteList, isLoadingConcreteList } = useConcreteList();
  const { concretePouringTypeList, isLoadingConcretePouringTypeList } =
    useConcretePouringTypeList();
  const { concreteResistanceClassList, isLoadingConcreteResistanceClassList } =
    useConcreteResistanceClassList();
  const { isLoadingPumpList, pumpList } = usePumpList("all");
  const { isLoadingVibratorList, vibratorList } = useVibratorList("all");

  useEffect(() => {
    setEditableOrder(order);
  }, [order]);

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        {
          method: "PATCH",
          body: JSON.stringify(editableOrder),
          headers: {
            Authorization: `Bearer ${token.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw Error();
      toast.success("سفارش با موفقیت ذخیره شد");
      setIsEditMode(false);
    } catch (err) {
      toast.error("خطا در ذخیره‌سازی سفارش");
    }
  };

  if (
    isLoadingConcreteList ||
    isLoadingConcretePouringTypeList ||
    isLoadingConcreteResistanceClassList ||
    isLoadingPumpList ||
    isLoadingVibratorList
  )
    return <Spinner />;

  const renderInput = (field, type = "text") => (
    <input
      type={type}
      value={editableOrder[field] || ""}
      onChange={(e) =>
        setEditableOrder({ ...editableOrder, [field]: e.target.value })
      }
    />
  );

  const renderSelect = (field, options) => (
    <select
      value={editableOrder[field] || ""}
      onChange={(e) =>
        setEditableOrder({
          ...editableOrder,
          [field]: parseInt(e.target.value),
        })
      }
    >
      <option value="">انتخاب کنید</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.title}
        </option>
      ))}
    </select>
  );

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{order.id}#</span> از
        <span> {order.project.user_fullname} </span>
      </Title>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Button
          onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
        >
          {isEditMode ? "ذخیره" : "ویرایش"}
        </Button>
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
          تاریخ آغاز پروژه :
          <span>{convertGeorgianDateToJalali(order.project.start_date)}</span>
        </InfoItem>

        <SubTitle>اطلاعات سفارش</SubTitle>

        <InfoItem>
          شماره سفارش : <span>{order.order_id}</span>
        </InfoItem>

        <InfoItem>
          متراژ بتن :
          {isEditMode ? (
            renderInput("concrete_area_size", "number")
          ) : (
            <span>{order.concrete_area_size} مترمکعب</span>
          )}
        </InfoItem>

        <InfoItem>
          ارتفاع بتن‌ریزی:
          {isEditMode ? (
            renderInput("concrete_pouring_height", "number")
          ) : (
            <span>{order.concrete_pouring_height} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله کشی:
          {isEditMode ? (
            renderInput("piping_area_size", "number")
          ) : (
            <span>{order.piping_area_size} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          ماله پروانه:
          {isEditMode ? (
            <input
              type="checkbox"
              checked={editableOrder.power_trowel}
              onChange={(e) =>
                setEditableOrder({
                  ...editableOrder,
                  power_trowel: e.target.checked,
                })
              }
            />
          ) : (
            <span>{order.power_trowel ? "بله" : "خیر"}</span>
          )}
        </InfoItem>

        <InfoItem>
          نوع بتن:
          {isEditMode ? (
            renderSelect("concrete_type", concreteList)
          ) : (
            <span>
              {concreteList.find((c) => c.id === order.concrete_type)?.title ||
                "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          مقطع بتن ریزی:
          {isEditMode ? (
            renderSelect("concrete_pouring_type", concretePouringTypeList)
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
          {isEditMode ? (
            renderSelect(
              "concrete_resistance_class",
              concreteResistanceClassList
            )
          ) : (
            <span>
              {concreteResistanceClassList.find(
                (c) => c.id === order.concrete_resistance_class
              )?.title || "نامشخص"}
            </span>
          )}
        </InfoItem>

        <SubTitle>اطلاعات پمپ ها</SubTitle>
        <Pumps>
          {order.pumps.length === 0 ? (
            <Empty> پمپی در این سفارش وجود ندارد!</Empty>
          ) : (
            order.pumps.map((pump, index) => (
              <Pump key={index}>
                <InfoItem>پمپ شماره {index + 1}</InfoItem>
                <InfoItem>
                  نوع پمپ :
                  <span>
                    {pumpList.find((p) => p.id === pump.pump)?.title ||
                      "نامشخص"}
                  </span>
                </InfoItem>
                <InfoItem>
                  نوع پمپ زیرمجموعه :
                  <span>
                    {pumpList.find((p) => p.id === pump?.sub_pump)?.title ||
                      "ندارد"}
                  </span>
                </InfoItem>
                <InfoItem>
                  تعداد : <span>{pump.count}</span>
                </InfoItem>
              </Pump>
            ))
          )}
        </Pumps>

        <SubTitle>اطلاعات ویبراتور ها</SubTitle>
        <Vibrators>
          {order.vibrators.length === 0 ? (
            <Empty> ویبراتوری در این سفارش وجود ندارد!</Empty>
          ) : (
            order.vibrators.map((vibrator, index) => (
              <Vibrator key={index}>
                <InfoItem>ویبراتور شماره {index + 1}</InfoItem>
                <InfoItem>
                  نوع ویبراتور :
                  <span>
                    {vibratorList.find((v) => v.id === vibrator.vibrator)
                      ?.title || "نامشخص"}
                  </span>
                </InfoItem>
                <InfoItem>
                  نوع ویبراتور زیرمجموعه :
                  <span>
                    {vibratorList.find((v) => v.id === vibrator?.sub_vibrator)
                      ?.title || "ندارد"}
                  </span>
                </InfoItem>
                <InfoItem>
                  تعداد : <span>{vibrator.count}</span>
                </InfoItem>
              </Vibrator>
            ))
          )}
        </Vibrators>

        <SubTitle>اطلاعات تکمیلی</SubTitle>

        <InfoItem className="half-row-1">
          اجرا و نظارت آبندی:
          {isEditMode ? (
            renderInput("sealing_implementation")
          ) : (
            <span>{order.sealing_implementation}</span>
          )}
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:
          {isEditMode ? (
            <>
              {renderInput("delivery_datetime")}
              <div style={{ fontSize: "1.2rem" }}>فرمت: YYYY-MM-DD HH:MM</div>
            </>
          ) : (
            <span>
              {convertGeorgianDateToJalali(
                order.delivery_datetime.split(" ")[0]
              )}{" "}
              -{order.delivery_datetime.split(" ")[1]}
            </span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه:
          {isEditMode ? (
            renderInput("settlement_type")
          ) : (
            <span>{order.settlement_type}</span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی:
          {isEditMode ? (
            <textarea
              rows={3}
              value={editableOrder.additional_description}
              onChange={(e) =>
                setEditableOrder({
                  ...editableOrder,
                  additional_description: e.target.value,
                })
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
