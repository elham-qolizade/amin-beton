/*eslint-disable */
import styled from "styled-components";
import { ImLab } from "react-icons/im";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import { useOrderLabResults } from "./useOrderLabResults";
import FilmRow from "./FilmRow";

const StyledOrderDetailLab = styled.div`
  margin-bottom: 15rem;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
`;

function OrderDetailLab() {
  const { isLoading, getOrderLabResults, labResults } = useOrderLabResults();

  useEffect(() => {
    getOrderLabResults();
  }, [getOrderLabResults]);

  if (isLoading) return <Spinner />;

  console.log(labResults);
  return (
    <StyledOrderDetailLab>
      <Title>
        <ImLab />
        آزمایشگاه
      </Title>

      {labResults?.length > 0 ? (
        labResults.map((film) => <FilmRow key={film.video} film={film} />)
      ) : (
        <div>آزمایشی برای این سفارش ثبت نشده‌است.</div>
      )}
    </StyledOrderDetailLab>
  );
}

export default OrderDetailLab;
