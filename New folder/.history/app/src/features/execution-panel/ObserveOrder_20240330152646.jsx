/*eslint-disable */
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

  // console.log(order);
  // console.log(pumpList);

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{order.id}#</span> از
        <span> {order.project.user_fullname} </span>
      </Title>

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
          تاریخ آغاز پروژه :{" "}
          <span>{convertGeorgianDateToJalali(order.project.start_date)}</span>
        </InfoItem>

        <SubTitle>اطلاعات سفارش</SubTitle>

        <InfoItem>
          شماره سفارش : <span>{order.order_id}</span>
        </InfoItem>

        <InfoItem>
          متراژ بتن : <span>{order.concrete_area_size} مترمکعب</span>
        </InfoItem>

        <InfoItem>
          ارتفاع بتن ریزی از محل استقرار پمپ : <br />
          <span> {order.concrete_pouring_height} متر</span>
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله کشی : <span>{order.piping_area_size} متر</span>
        </InfoItem>
        <InfoItem>
          ماله پروانه : <span>{order.power_trowel ? "بله" : "خیر"} </span>
        </InfoItem>

        <InfoItem>
          نوع بتن :{" "}
          <span>
            {
              concreteList.find(
                (concrete) => concrete.id === order.concrete_type
              ).title
            }
          </span>
        </InfoItem>

        <InfoItem>
          مقطع بتن ریزی :{" "}
          <span>
            {
              concretePouringTypeList.find(
                (concrete) => concrete.id === order.concrete_pouring_type
              ).title
            }
          </span>
        </InfoItem>

        <InfoItem>
          رده مقاومت بتن :{" "}
          <span>
            {
              concreteResistanceClassList.find(
                (concrete) => concrete.id === order.concrete_resistance_class
              ).title
            }
          </span>
        </InfoItem>

        <SubTitle>اطلاعات پمپ ها</SubTitle>
        <Pumps>
          {order.pumps.length === 0 ? (
            <Empty> پمپی در این سفارش وجود ندارد!</Empty>
          ) : (
            order?.pumps?.map((pump, index) => (
              <Pump key={index}>
                <InfoItem>پمپ شماره {index + 1} </InfoItem>
                <InfoItem>
                  نوع پمپ :
                  <span>
                    {" "}
                    {
                      pumpList.find(
                        (pumpListItem) => pumpListItem.id === pump.pump
                      ).title
                    }
                  </span>
                </InfoItem>
                <InfoItem>
                  نوع پمپ زیرمجموعه :
                  <span>
                    {" "}
                    {pumpList.find(
                      (pumpListItem) => pumpListItem.id === pump?.sub_pump
                    )?.title || "ندارد"}
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
            order?.vibrators?.map((vibrator, index) => (
              <Vibrator key={index}>
                <InfoItem>ویبراتور شماره {index + 1} </InfoItem>
                <InfoItem>
                  نوع ویبراتور :
                  <span>
                    {" "}
                    {
                      vibratorList.find(
                        (vibratorListItem) =>
                          vibratorListItem.id === vibrator.vibrator
                      ).title
                    }
                  </span>
                </InfoItem>

                <InfoItem>
                  نوع ویبراتور زیرمجموعه :
                  <span>
                    {" "}
                    {vibratorList.find(
                      (vibratorListItem) =>
                        vibratorListItem.id === vibrator?.sub_vibrator
                    )?.title || "ندارد"}
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
          اجرا و نظارت آبندی: <span>{order.sealing_implementation} </span>
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:{" "}
          <span>
            {convertGeorgianDateToJalali(
              order.delivery_datetime.split(" ").at(0)
            )}{" "}
            - {order.delivery_datetime.split(" ").at(1)}
          </span>
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه : <span>{order.settlement_type} </span>
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی: <span>{order.additional_description}</span>
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;
