import { useState } from "react";
import styled from "styled-components";
import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  useConcreteResistanceClassList,
  usePumpList,
  useVibratorList,
} from "../../hooks/useDropdownsData";
import Spinner from "../../ui/Spinner";

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  font-size: 1.4rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  width: 100%;
  font-size: 1.4rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  width: 100%;
  font-size: 1.4rem;
  resize: vertical;
`;

function ObserveOrder({ order, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(order);

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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    onSave(formData);
    setIsEditing(false);
  }

  return (
    <div>
      <h2>
        مشاهده سفارش {order.id} از {order.project.user_fullname}
      </h2>

      <div>
        <h3>اطلاعات سفارش</h3>

        <div>
          <label>متراژ بتن:</label>
          {isEditing ? (
            <Input
              type="number"
              name="concrete_area_size"
              value={formData.concrete_area_size}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.concrete_area_size} مترمکعب</span>
          )}
        </div>

        <div>
          <label>نوع بتن:</label>
          {isEditing ? (
            <Select
              name="concrete_type"
              value={formData.concrete_type}
              onChange={handleChange}
            >
              {concreteList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </Select>
          ) : (
            <span>
              {concreteList.find((c) => c.id === formData.concrete_type)?.title}
            </span>
          )}
        </div>

        <div>
          <label>توضیحات:</label>
          {isEditing ? (
            <TextArea
              name="additional_description"
              value={formData.additional_description}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.additional_description}</span>
          )}
        </div>

        <div style={{ marginTop: "2rem" }}>
          {isEditing ? (
            <>
              <button onClick={handleSave}>ذخیره</button>
              <button onClick={() => setIsEditing(false)}>لغو</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>ویرایش</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ObserveOrder;
