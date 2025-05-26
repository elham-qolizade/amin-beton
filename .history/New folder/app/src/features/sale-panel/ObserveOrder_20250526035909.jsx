/* eslint-disable */
import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";

import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  usePumpList,
  useSubPumpList,
  useVibratorList,
  useSubVibratorList,
} from "../../hooks/useDropdownsData";

import Spinner from "../../ui/Spinner";

// ---------- Styled Components ----------
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

const Empty = styled.div`
  grid-column: 1/-1;
  color: var(--color-red-600);
`;

const ActionButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
`;

// ---------- PumpItem Component ----------
function PumpItem({
  pump,
  index,
  pumpList,
  subPumpList,
  isEditMode,
  onUpdate,
  onRemove,
}) {
  return (
    <Pump>
      <InfoItem>پمپ شماره {index + 1}</InfoItem>
      <InfoItem>
        نوع پمپ:
        {isEditMode ? (
          <select
            value={pump.pump?.id || ""}
            onChange={(e) => {
              const pumpId = parseInt(e.target.value);
              const selectedPump = pumpList.find((p) => p.id === pumpId);
              onUpdate(index, {
                pump: selectedPump,
                sub_pump: null,
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
        زیرمجموعه پمپ:
        {isEditMode ? (
          <select
            value={pump.sub_pump?.id || ""}
            onChange={(e) =>
              onUpdate(index, {
                sub_pump:
                  subPumpList.find(
                    (sp) => sp.id === parseInt(e.target.value)
                  ) || null,
              })
            }
          >
            <option value="">ندارد</option>
            {subPumpList.map((sp) => (
              <option key={sp.id} value={sp.id}>
                {sp.title}
              </option>
            ))}
          </select>
        ) : (
          <span>{pump.sub_pump?.title || "ندارد"}</span>
        )}
      </InfoItem>

      <InfoItem>
        تعداد:
        {isEditMode ? (
          <input
            type="number"
            value={pump.count}
            onChange={(e) =>
              onUpdate(index, {
                count: parseInt(e.target.value),
              })
            }
          />
        ) : (
          <span>{pump.count}</span>
        )}
      </InfoItem>

      {isEditMode && (
        <InfoItem>
          <button onClick={() => onRemove(index)}>حذف پمپ</button>
        </InfoItem>
      )}
    </Pump>
  );
}

// ---------- VibratorItem Component ----------
function VibratorItem({
  vibrator,
  index,
  vibratorList,
  subVibratorList,
  isEditMode,
  onUpdate,
  onRemove,
}) {
  return (
    <Pump>
      <InfoItem>ویبراتور شماره {index + 1}</InfoItem>
      <InfoItem>
        نوع ویبراتور:
        {isEditMode ? (
          <select
            value={vibrator.vibrator?.id || ""}
            onChange={(e) => {
              const vibId = parseInt(e.target.value);
              const selectedVib = vibratorList.find((v) => v.id === vibId);
              onUpdate(index, {
                vibrator: selectedVib,
                sub_vibrator: null,
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
          <span>{vibrator.vibrator?.title || "نامشخص"}</span>
        )}
      </InfoItem>

      <InfoItem>
        زیرمجموعه:
        {isEditMode ? (
          <select
            value={vibrator.sub_vibrator?.id || ""}
            onChange={(e) =>
              onUpdate(index, {
                sub_vibrator:
                  subVibratorList.find(
                    (s) => s.id === parseInt(e.target.value)
                  ) || null,
              })
            }
          >
            <option value="">ندارد</option>
            {subVibratorList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        ) : (
          <span>{vibrator.sub_vibrator?.title || "ندارد"}</span>
        )}
      </InfoItem>

      <InfoItem>
        تعداد:
        {isEditMode ? (
          <input
            type="number"
            value={vibrator.count}
            onChange={(e) =>
              onUpdate(index, { count: parseInt(e.target.value) })
            }
          />
        ) : (
          <span>{vibrator.count}</span>
        )}
      </InfoItem>

      {isEditMode && (
        <InfoItem>
          <button onClick={() => onRemove(index)}>حذف ویبراتور</button>
        </InfoItem>
      )}
    </Pump>
  );
}

// ---------- Main Component ----------
function ObserveOrder({ order }) {
  const { concreteList, isLoadingConcreteList } = useConcreteList();
  const { pumpList, isLoadingPumpList } = usePumpList("all");
  const { vibratorList, isLoadingVibratorList } = useVibratorList("all");

  const [editableOrder, setEditableOrder] = useState({
    ...order,
    pumps: order.pumps || [],
    vibrators: order.vibrators || [],
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const selectedPumpId = editableOrder.pumps?.[0]?.pump?.id || null;
  const selectedVibratorId = editableOrder.vibrators?.[0]?.vibrator?.id || null;

  const { subPumpList } = useSubPumpList(selectedPumpId);
  const { subVibratorList } = useSubVibratorList(selectedVibratorId);

  useEffect(() => {
    setEditableOrder({
      ...order,
      pumps: order.pumps || [],
      vibrators: order.vibrators || [],
    });
  }, [order]);

  if (isLoadingConcreteList || isLoadingPumpList || isLoadingVibratorList)
    return <Spinner />;

  const updatePump = (index, changes) => {
    const updated = [...editableOrder.pumps];
    updated[index] = { ...updated[index], ...changes };
    setEditableOrder((prev) => ({ ...prev, pumps: updated }));
  };

  const updateVibrator = (index, changes) => {
    const updated = [...editableOrder.vibrators];
    updated[index] = { ...updated[index], ...changes };
    setEditableOrder((prev) => ({ ...prev, vibrators: updated }));
  };

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{order?.id ?? "?"}#</span> از{" "}
        <span>{order?.project?.user_fullname ?? "?"}</span>
      </Title>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ActionButton onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? "ذخیره تغییرات" : "ویرایش"}
        </ActionButton>
      </div>

      <Info>
        <SubTitle>اطلاعات پروژه</SubTitle>

        <InfoItem>
          نام پروژه:
          {isEditMode ? (
            <input
              value={editableOrder.project?.title || ""}
              onChange={(e) =>
                setEditableOrder((prev) => ({
                  ...prev,
                  project: { ...prev.project, title: e.target.value },
                }))
              }
            />
          ) : (
            <span>{editableOrder.project?.title || "نامشخص"}</span>
          )}
        </InfoItem>

        <InfoItem>
          نام کاربری:
          <span>{editableOrder.project?.user_username || "نامشخص"}</span>
        </InfoItem>

        <InfoItem>
          شماره پروژه:
          <span>{editableOrder.project?.id || "-"}</span>
        </InfoItem>

        <InfoItem>
          تاریخ آغاز پروژه:
          <span>
            {convertGeorgianDateToJalali(
              editableOrder.project?.start_date || ""
            )}
          </span>
        </InfoItem>

        <InfoItem>
          نوع بتن:
          {isEditMode ? (
            <select
              value={editableOrder.concrete_type || ""}
              onChange={(e) =>
                setEditableOrder((prev) => ({
                  ...prev,
                  concrete_type: parseInt(e.target.value),
                }))
              }
            >
              <option value="">انتخاب کنید</option>
              {concreteList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {
                concreteList.find((c) => c.id === editableOrder.concrete_type)
                  ?.title || "نامشخص"
              }
            </span>
          )}
        </InfoItem>

        <SubTitle>اطلاعات پمپ‌ها</SubTitle>
        <Pumps>
          {Array.isArray(editableOrder.pumps) &&
          editableOrder.pumps.length > 0 ? (
            editableOrder.pumps.map((p, i) => (
              <PumpItem
                key={i}
                pump={p}
                index={i}
                pumpList={pumpList}
                subPumpList={subPumpList}
                isEditMode={isEditMode}
                onUpdate={updatePump}
                onRemove={(index) =>
                  setEditableOrder((prev) => ({
                    ...prev,
                    pumps: prev.pumps.filter((_, j) => j !== index),
                  }))
                }
              />
            ))
          ) : (
            <Empty>پمپی موجود نیست</Empty>
          )}

          {isEditMode && (
            <button
              onClick={() =>
                setEditableOrder((prev) => ({
                  ...prev,
                  pumps: [
                    ...(prev.pumps || []),
                    { pump: null, sub_pump: null, count: 1 },
                  ],
                }))
              }
            >
              + افزودن پمپ
            </button>
          )}
        </Pumps>

        <SubTitle>اطلاعات ویبراتورها</SubTitle>
        <Pumps>
          {Array.isArray(editableOrder.vibrators) &&
          editableOrder.vibrators.length > 0 ? (
            editableOrder.vibrators.map((v, i) => (
              <VibratorItem
                key={i}
                vibrator={v}
                index={i}
                vibratorList={vibratorList}
                subVibratorList={subVibratorList}
                isEditMode={isEditMode}
                onUpdate={updateVibrator}
                onRemove={(index) =>
                  setEditableOrder((prev) => ({
                    ...prev,
                    vibrators: prev.vibrators.filter((_, j) => j !== index),
                  }))
                }
              />
            ))
          ) : (
            <Empty>ویبراتوری موجود نیست</Empty>
          )}

          {isEditMode && (
            <button
              onClick={() =>
                setEditableOrder((prev) => ({
                  ...prev,
                  vibrators: [
                    ...(prev.vibrators || []),
                    { vibrator: null, sub_vibrator: null, count: 1 },
                  ],
                }))
              }
            >
              + افزودن ویبراتور
            </button>
          )}
        </Pumps>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;

export default ObserveOrder;
