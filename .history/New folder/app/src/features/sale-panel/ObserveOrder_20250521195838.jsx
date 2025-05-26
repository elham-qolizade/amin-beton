import { useState } from "react";
import styled, { css } from "styled-components";
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
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

const EditButton = styled.button`
  background-color: var(--color-brand-600);
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
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

// ساده‌ترین نمونه پیاده‌سازی انتخابگر تاریخ جلالی
function JalaliDatePicker({ value, onChange }) {
  // فرض می‌کنیم value رشته 'YYYY-MM-DD' است
  // اینجا فقط برای نمونه است، می‌تونی کامپوننت حرفه‌ای‌تر استفاده کنی
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

function ObserveOrder({ order }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState({ ...order });
  const [error, setError] = useState(null);

  const {
    concreteList,
    isLoadingConcreteList,
    error: concreteError,
  } = useConcreteList();
  const {
    concretePouringTypeList,
    isLoadingConcretePouringTypeList,
    error: pouringTypeError,
  } = useConcretePouringTypeList();
  const {
    concreteResistanceClassList,
    isLoadingConcreteResistanceClassList,
    error: resistanceError,
  } = useConcreteResistanceClassList();

  const { isLoadingPumpList, pumpList, error: pumpError } = usePumpList("all");
  const {
    isLoadingVibratorList,
    vibratorList,
    error: vibratorError,
  } = useVibratorList("all");

  const isLoading =
    isLoadingConcreteList ||
    isLoadingConcretePouringTypeList ||
    isLoadingConcreteResistanceClassList ||
    isLoadingPumpList ||
    isLoadingVibratorList;

  const hasError =
    concreteError ||
    pouringTypeError ||
    resistanceError ||
    pumpError ||
    vibratorError;

  if (isLoading) return <Spinner />;
  if (hasError)
    return (
      <div style={{ color: "red" }}>
        خطا در بارگذاری داده‌ها. لطفا دوباره تلاش کنید.
      </div>
    );

  const toggleEdit = () => {
    if (isEditing) {
      // اعتبارسنجی ساده
      if (editedOrder.concrete_area_size <= 0) {
        setError("متراژ بتن باید عددی بزرگتر از صفر باشد");
        return;
      }
      if (editedOrder.pumps.some((p) => p.count <= 0)) {
        setError("تعداد پمپ‌ها باید عددی بزرگتر از صفر باشد");
        return;
      }
      if (editedOrder.vibrators.some((v) => v.count <= 0)) {
        setError("تعداد ویبراتورها باید عددی بزرگتر از صفر باشد");
        return;
      }
      setError(null);
      console.log("ذخیره تغییرات:", editedOrder);
      // اینجا API کال می‌تونی بزنی
    }
    setIsEditing((prev) => !prev);
  };
  const removePump = (index) => {
    setEditedOrder((prev) => {
      const newPumps = prev.pumps.filter((_, i) => i !== index);
      return { ...prev, pumps: newPumps };
    });
  };

  const removeVibrator = (index) => {
    setEditedOrder((prev) => {
      const newVibrators = prev.vibrators.filter((_, i) => i !== index);
      return { ...prev, vibrators: newVibrators };
    });
  };

  // تابع عمومی برای به‌روزرسانی پمپ یا ویبراتور
  const updateNestedItem = (type, index, field, value) => {
    setEditedOrder((prev) => {
      const list = [...prev[type]];
      const item = { ...list[index] };

      if (field === "pump" || field === "vibrator") {
        // مقدار رو به شکل آبجکت می‌خوایم
        const listSource = type === "pumps" ? pumpList : vibratorList;
        const found = listSource.find((el) => el.id === value);
        item[field] = found ? { id: found.id, title: found.title } : null;
      } else if (field === "sub_pump" || field === "sub_vibrator") {
        const listSource = type === "pumps" ? pumpList : vibratorList;
        const found = listSource.find((el) => el.id === value);
        item[field] = value
          ? found
            ? { id: found.id, title: found.title }
            : null
          : null;
      } else if (field === "count") {
        const num = Number(value);
        item[field] = isNaN(num) || num < 0 ? 0 : num;
      } else {
        item[field] = value;
      }
      list[index] = item;
      return { ...prev, [type]: list };
    });
  };

  const addPump = () => {
    setEditedOrder((prev) => ({
      ...prev,
      pumps: [...prev.pumps, { pump: null, sub_pump: null, count: 1 }],
    }));
  };

  const addVibrator = () => {
    setEditedOrder((prev) => ({
      ...prev,
      vibrators: [
        ...prev.vibrators,
        { vibrator: null, sub_vibrator: null, count: 1 },
      ],
    }));
  };

  return (
    <StyledObserveOrder>
      <Header>
        <Title>
          مشاهده سفارش <span>{order.id}#</span> از
          <span> {order.project.user_fullname} </span>
        </Title>
        <EditButton onClick={toggleEdit}>
          {isEditing ? "ذخیره تغییرات" : "ویرایش"}
        </EditButton>
      </Header>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <Info>
        <SubTitle>اطلاعات سفارش</SubTitle>
        <InfoItem>
          شماره سفارش :{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedOrder.order_id}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  order_id: e.target.value,
                }))
              }
            />
          ) : (
            <span>{order.order_id}</span>
          )}
        </InfoItem>
        <InfoItem>
          متراژ بتن :{" "}
          {isEditing ? (
            <input
              type="number"
              min={0}
              value={editedOrder.concrete_area_size}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  concrete_area_size:
                    e.target.value >= 0 ? Number(e.target.value) : 0,
                }))
              }
            />
          ) : (
            <span>{order.concrete_area_size} مترمکعب</span>
          )}
        </InfoItem>
        <InfoItem>
          ارتفاع بتن ریزی از محل استقرار پمپ : <br />
          {isEditing ? (
            <input
              type="number"
              min={0}
              value={editedOrder.concrete_pouring_height}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  concrete_pouring_height:
                    e.target.value >= 0 ? Number(e.target.value) : 0,
                }))
              }
            />
          ) : (
            <span>{order.concrete_pouring_height} متر</span>
          )}
        </InfoItem>
        <InfoItem>
          حداکثر متراژ لوله کشی :{" "}
          {isEditing ? (
            <input
              type="number"
              min={0}
              value={editedOrder.piping_area_size}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  piping_area_size:
                    e.target.value >= 0 ? Number(e.target.value) : 0,
                }))
              }
            />
          ) : (
            <span>{order.piping_area_size} متر</span>
          )}
        </InfoItem>
        <InfoItem>
          ماله پروانه :{" "}
          {isEditing ? (
            <select
              value={editedOrder.power_trowel ? "true" : "false"}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  power_trowel: e.target.value === "true",
                }))
              }
            >
              <option value="true">بله</option>
              <option value="false">خیر</option>
            </select>
          ) : (
            <span>{order.power_trowel ? "بله" : "خیر"}</span>
          )}
        </InfoItem>

        <SubTitle>پمپ‌ها</SubTitle>
        <Pumps>
          {editedOrder.pumps.map((pumpItem, index) => (
            <Pump key={index}>
              <select
                value={pumpItem.pump?.id || ""}
                onChange={(e) =>
                  updateNestedItem(
                    "pumps",
                    index,
                    "pump",
                    Number(e.target.value)
                  )
                }
              >
                <option value="">انتخاب پمپ</option>
                {pumpList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>

              <select
                value={pumpItem.sub_pump?.id || ""}
                onChange={(e) =>
                  updateNestedItem(
                    "pumps",
                    index,
                    "sub_pump",
                    Number(e.target.value)
                  )
                }
              >
                <option value="">انتخاب زیرپمپ (اختیاری)</option>
                {pumpList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={pumpItem.count}
                onChange={(e) =>
                  updateNestedItem("pumps", index, "count", e.target.value)
                }
              />
            </Pump>
          ))}
        </Pumps>
        <button onClick={addPump}>افزودن پمپ جدید</button>
        <SubTitle>ویبراتورها</SubTitle>
        <Vibrators>
          {editedOrder.vibrators.map((vibItem, index) => (
            <Vibrator key={index}>
              <select
                value={vibItem.vibrator?.id || ""}
                onChange={(e) =>
                  updateNestedItem(
                    "vibrators",
                    index,
                    "vibrator",
                    Number(e.target.value)
                  )
                }
              >
                <option value="">انتخاب ویبراتور</option>
                {vibratorList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
              </select>

              <select
                value={vibItem.sub_vibrator?.id || ""}
                onChange={(e) =>
                  updateNestedItem(
                    "vibrators",
                    index,
                    "sub_vibrator",
                    Number(e.target.value)
                  )
                }
              >
                <option value="">انتخاب زیر ویبراتور (اختیاری)</option>
                {vibratorList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={vibItem.count}
                onChange={(e) =>
                  updateNestedItem("vibrators", index, "count", e.target.value)
                }
              />
            </Vibrator>
          ))}
        </Vibrators>
        <button onClick={addVibrator}>افزودن ویبراتور جدید</button>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;
