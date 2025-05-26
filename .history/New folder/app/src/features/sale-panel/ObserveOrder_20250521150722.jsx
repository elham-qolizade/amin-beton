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

const Container = styled.div`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin: 1rem 0 0.5rem;
`;

function EditableObserveOrder({ order, onSave }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, index, key, type) => {
    const updated = [...formData[type]];
    updated[index][key] = e.target.value;
    setFormData({ ...formData, [type]: updated });
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <Container>
      <h2>سفارش #{formData.id}</h2>
      <Section>
        <h3>اطلاعات پروژه</h3>
        <Label>نام پروژه:</Label>
        <Input value={formData.project.title} disabled />

        <Label>تاریخ شروع:</Label>
        <Input
          value={convertGeorgianDateToJalali(formData.project.start_date)}
          disabled
        />
      </Section>

      <Section>
        <h3>اطلاعات سفارش</h3>
        <Label>متراژ بتن:</Label>
        <Input
          name="concrete_area_size"
          value={formData.concrete_area_size}
          onChange={handleChange}
        />

        <Label>ارتفاع بتن‌ریزی:</Label>
        <Input
          name="concrete_pouring_height"
          value={formData.concrete_pouring_height}
          onChange={handleChange}
        />

        <Label>حداکثر متراژ لوله‌کشی:</Label>
        <Input
          name="piping_area_size"
          value={formData.piping_area_size}
          onChange={handleChange}
        />

        <Label>ماله پروانه:</Label>
        <Select
          name="power_trowel"
          value={formData.power_trowel}
          onChange={handleChange}
        >
          <option value={true}>بله</option>
          <option value={false}>خیر</option>
        </Select>

        <Label>نوع بتن:</Label>
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

        <Label>مقطع بتن‌ریزی:</Label>
        <Select
          name="concrete_pouring_type"
          value={formData.concrete_pouring_type}
          onChange={handleChange}
        >
          {concretePouringTypeList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </Select>

        <Label>رده مقاومت بتن:</Label>
        <Select
          name="concrete_resistance_class"
          value={formData.concrete_resistance_class}
          onChange={handleChange}
        >
          {concreteResistanceClassList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
        <h3>پمپ‌ها</h3>
        {formData.pumps.map((pump, index) => (
          <div key={index}>
            <Label>نوع پمپ:</Label>
            <Select
              value={pump.pump}
              onChange={(e) => handleNestedChange(e, index, "pump", "pumps")}
            >
              {pumpList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </Select>
            <Label>نوع زیرپمپ:</Label>
            <Select
              value={pump.sub_pump}
              onChange={(e) =>
                handleNestedChange(e, index, "sub_pump", "pumps")
              }
            >
              <option value="">ندارد</option>
              {pumpList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </Select>
            <Label>تعداد:</Label>
            <Input
              value={pump.count}
              onChange={(e) => handleNestedChange(e, index, "count", "pumps")}
            />
          </div>
        ))}
      </Section>

      <Section>
        <h3>ویبراتورها</h3>
        {formData.vibrators.map((vib, index) => (
          <div key={index}>
            <Label>نوع ویبراتور:</Label>
            <Select
              value={vib.vibrator}
              onChange={(e) =>
                handleNestedChange(e, index, "vibrator", "vibrators")
              }
            >
              {vibratorList.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </Select>
            <Label>نوع زیرمجموعه:</Label>
            <Select
              value={vib.sub_vibrator}
              onChange={(e) =>
                handleNestedChange(e, index, "sub_vibrator", "vibrators")
              }
            >
              <option value="">ندارد</option>
              {vibratorList.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </Select>
            <Label>تعداد:</Label>
            <Input
              value={vib.count}
              onChange={(e) =>
                handleNestedChange(e, index, "count", "vibrators")
              }
            />
          </div>
        ))}
      </Section>

      <Section>
        <Label>اجرا و نظارت آب‌بندی:</Label>
        <Input
          name="sealing_implementation"
          value={formData.sealing_implementation}
          onChange={handleChange}
        />

        <Label>تاریخ و ساعت:</Label>
        <Input
          name="delivery_datetime"
          value={formData.delivery_datetime}
          onChange={handleChange}
        />

        <Label>تسویه:</Label>
        <Input
          name="settlement_type"
          value={formData.settlement_type}
          onChange={handleChange}
        />

        <Label>توضیحات:</Label>
        <TextArea
          name="additional_description"
          value={formData.additional_description}
          onChange={handleChange}
        />
      </Section>

      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave}>ذخیره</button>
            <button onClick={() => setIsEditing(false)}>لغو</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>ویرایش</button>
        )}
      </div>
    </Container>
  );
}

export default EditableObserveOrder;
