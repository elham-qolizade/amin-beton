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

function ObserveOrder({ order }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState({ ...order });

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

  const toggleEdit = () => {
    // در اینجا ممکن است بخواهید تغییرات را به سرور ارسال کنید
    if (isEditing) {
      console.log("ذخیره تغییرات:", editedOrder);
      // مثلا: فراخوانی API برای ذخیره تغییرات
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (field, value) =>
    setEditedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  const addPump = () => {
    const newPump = {
      pump: null,
      sub_pump: null,
      count: 1,
    };
    setEditedOrder((prev) => ({
      ...prev,
      pumps: [...prev.pumps, newPump],
    }));
  };

  const addVibrator = () => {
    const newVibrator = {
      vibrator: null,
      sub_vibrator: null,
      count: 1,
    };
    setEditedOrder((prev) => ({
      ...prev,
      vibrators: [...prev.vibrators, newVibrator],
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

      <Info>
        {/* اطلاعات سفارش */}
        <SubTitle>اطلاعات سفارش</SubTitle>

        <InfoItem>
          شماره سفارش :{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedOrder.order_id}
              onChange={(e) => handleChange("order_id", e.target.value)}
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
              value={editedOrder.concrete_area_size}
              onChange={(e) =>
                handleChange("concrete_area_size", e.target.value)
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
              value={editedOrder.concrete_pouring_height}
              onChange={(e) =>
                handleChange("concrete_pouring_height", e.target.value)
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
              value={editedOrder.piping_area_size}
              onChange={(e) => handleChange("piping_area_size", e.target.value)}
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
          نوع بتن :{" "}
          {isEditing ? (
            <select
              value={editedOrder.concrete_type}
              onChange={(e) => handleChange("concrete_type", e.target.value)}
            >
              {concreteList.map((concrete) => (
                <option key={concrete.id} value={concrete.id}>
                  {concrete.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concreteList.find(
                (concrete) => concrete.id === order.concrete_type
              )?.title || "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          مقطع بتن ریزی :{" "}
          {isEditing ? (
            <select
              value={editedOrder.concrete_pouring_type}
              onChange={(e) =>
                handleChange("concrete_pouring_type", e.target.value)
              }
            >
              {concretePouringTypeList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concretePouringTypeList.find(
                (item) => item.id === order.concrete_pouring_type
              )?.title || "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          رده مقاومت بتن :{" "}
          {isEditing ? (
            <select
              value={editedOrder.concrete_resistance_class}
              onChange={(e) =>
                handleChange("concrete_resistance_class", e.target.value)
              }
            >
              {concreteResistanceClassList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concreteResistanceClassList.find(
                (item) => item.id === order.concrete_resistance_class
              )?.title || "نامشخص"}
            </span>
          )}
        </InfoItem>

        {/* اطلاعات پمپ‌ها */}
        <SubTitle>اطلاعات پمپ ها</SubTitle>
        <Pumps>
          {order.pumps.length === 0 ? (
            <Empty> پمپی در این سفارش وجود ندارد!</Empty>
          ) : (
            order.pumps.map((pump, index) => (
              <Pump key={index}>
                <InfoItem>پمپ شماره {index + 1} </InfoItem>

                <InfoItem>
                  نوع پمپ :{" "}
                  {isEditing ? (
                    <select
                      value={editedOrder.pumps[index].pump?.id || ""}
                      onChange={(e) => {
                        const updatedPumps = [...editedOrder.pumps];
                        updatedPumps[index].pump = {
                          id: e.target.value,
                          title: pumpList.find((p) => p.id === e.target.value)
                            ?.title,
                        };
                        setEditedOrder({
                          ...editedOrder,
                          pumps: updatedPumps,
                        });
                      }}
                    >
                      <option value="">انتخاب کنید</option>
                      {pumpList.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{pump.pump?.title || "نامشخص"}</span>
                  )}
                </InfoItem>

                <InfoItem>
                  نوع پمپ زیرمجموعه :{" "}
                  {isEditing ? (
                    <select
                      value={editedOrder.pumps[index].sub_pump?.id || ""}
                      onChange={(e) => {
                        const updatedPumps = [...editedOrder.pumps];
                        // فرض می‌کنیم که اگر کاربر انتخاب نکند، مقدار خالی یعنی ندارد
                        updatedPumps[index].sub_pump = e.target.value
                          ? {
                              id: e.target.value,
                              title: pumpList.find(
                                (p) => p.id === e.target.value
                              )?.title,
                            }
                          : null;
                        setEditedOrder({
                          ...editedOrder,
                          pumps: updatedPumps,
                        });
                      }}
                    >
                      <option value="">ندارد</option>
                      {pumpList.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{pump.sub_pump?.title || "ندارد"}</span>
                  )}
                </InfoItem>

                <InfoItem>
                  تعداد :{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedOrder.pumps[index].count}
                      onChange={(e) => {
                        const updatedPumps = [...editedOrder.pumps];
                        updatedPumps[index].count = e.target.value;
                        setEditedOrder({
                          ...editedOrder,
                          pumps: updatedPumps,
                        });
                      }}
                    />
                  ) : (
                    <span>{pump.count}</span>
                  )}
                </InfoItem>
              </Pump>
            ))
          )}
          {isEditing && (
            <EditButton onClick={addPump}>افزودن پمپ جدید</EditButton>
          )}
        </Pumps>

        {/* اطلاعات ویبراتورها */}
        <SubTitle>اطلاعات ویبراتور ها</SubTitle>
        <Vibrators>
          {order.vibrators.length === 0 ? (
            <Empty> ویبراتوری در این سفارش وجود ندارد!</Empty>
          ) : (
            order.vibrators.map((vibrator, index) => (
              <Vibrator key={index}>
                <InfoItem>ویبراتور شماره {index + 1} </InfoItem>
                <InfoItem>
                  نوع ویبراتور :{" "}
                  {isEditing ? (
                    <select
                      value={editedOrder.vibrators[index].vibrator?.id || ""}
                      onChange={(e) => {
                        const updatedVibrators = [...editedOrder.vibrators];
                        updatedVibrators[index].vibrator = {
                          id: e.target.value,
                          title: vibratorList.find(
                            (v) => v.id === e.target.value
                          )?.title,
                        };
                        setEditedOrder({
                          ...editedOrder,
                          vibrators: updatedVibrators,
                        });
                      }}
                    >
                      <option value="">انتخاب کنید</option>
                      {vibratorList.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>
                      {vibratorList.find((v) => v.id === vibrator.vibrator.id)
                        ?.title || "نامشخص"}
                    </span>
                  )}
                </InfoItem>
                <InfoItem>
                  نوع ویبراتور زیرمجموعه :{" "}
                  {isEditing ? (
                    <select
                      value={
                        editedOrder.vibrators[index].sub_vibrator?.id || ""
                      }
                      onChange={(e) => {
                        const updatedVibrators = [...editedOrder.vibrators];
                        updatedVibrators[index].sub_vibrator = e.target.value
                          ? {
                              id: e.target.value,
                              title: vibratorList.find(
                                (v) => v.id === e.target.value
                              )?.title,
                            }
                          : null;
                        setEditedOrder({
                          ...editedOrder,
                          vibrators: updatedVibrators,
                        });
                      }}
                    >
                      <option value="">ندارد</option>
                      {vibratorList.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{vibrator.sub_vibrator?.title || "ندارد"}</span>
                  )}
                </InfoItem>
                <InfoItem>
                  تعداد :{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedOrder.vibrators[index].count}
                      onChange={(e) => {
                        const updatedVibrators = [...editedOrder.vibrators];
                        updatedVibrators[index].count = e.target.value;
                        setEditedOrder({
                          ...editedOrder,
                          vibrators: updatedVibrators,
                        });
                      }}
                    />
                  ) : (
                    <span>{vibrator.count}</span>
                  )}
                </InfoItem>
              </Vibrator>
            ))
            {isEditing && (
              <EditButton onClick={addVibrator}>افزودن ویبراتور جدید</EditButton>
            )}
            
          )}
        </Vibrators>

        {/* اطلاعات تکمیلی */}
        <SubTitle>اطلاعات تکمیلی</SubTitle>

        <InfoItem className="half-row-1">
          اجرا و نظارت آبندی:{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedOrder.sealing_implementation}
              onChange={(e) =>
                handleChange("sealing_implementation", e.target.value)
              }
            />
          ) : (
            <span>{order.sealing_implementation}</span>
          )}
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:{" "}
          {isEditing ? (
            <>
              <input
                type="date"
                value={editedOrder.delivery_datetime.split(" ")[0]}
                onChange={(e) =>
                  handleChange(
                    "delivery_datetime",
                    e.target.value +
                      " " +
                      editedOrder.delivery_datetime.split(" ")[1]
                  )
                }
              />
              <input
                type="time"
                value={editedOrder.delivery_datetime.split(" ")[1]}
                onChange={(e) =>
                  handleChange(
                    "delivery_datetime",
                    editedOrder.delivery_datetime.split(" ")[0] +
                      " " +
                      e.target.value
                  )
                }
              />
            </>
          ) : (
            <span>
              {convertGeorgianDateToJalali(
                order.delivery_datetime.split(" ").at(0)
              )}{" "}
              - {order.delivery_datetime.split(" ").at(1)}
            </span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه :{" "}
          {isEditing ? (
            <input
              type="text"
              value={editedOrder.settlement_type}
              onChange={(e) => handleChange("settlement_type", e.target.value)}
            />
          ) : (
            <span>{order.settlement_type}</span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی:{" "}
          {isEditing ? (
            <textarea
              value={editedOrder.additional_description}
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
