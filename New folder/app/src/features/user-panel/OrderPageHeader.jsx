/*eslint-disable */
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { MdOutlineMyLocation } from "react-icons/md";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { FaMoneyCheckAlt } from "react-icons/fa";

import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useReverseGeocoding } from "./useReverseGeocoding";
import {
  convertGeorgianDateToJalali,
  formatCurrency,
} from "../../utils/helpers";
import { useProjects } from "./useProjects";

const StyledOrderPageHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 2rem;
  align-items: center;
  justify-items: center;

  // 1000px
  @media screen and (max-width: 62.5em) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(3, auto);
  }

  // 500px
  @media screen and (max-width: 31.25em) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, auto);
  }

  .item {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .project-name {
    font-size: 2.5rem;
    font-weight: 900;

    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-row: 1/2;
      grid-column: 1/3;
    }

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 1/2;
    }
  }

  .project-description {
    grid-column: 2/-2;
    width: 100%;
    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-column: 1/-1;
    }
  }

  .start-date {
    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-column: 1/3;
    }

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 1/2;
    }
  }

  .total-price {
    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-column: 3/5;
    }

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 2/3;
    }
  }

  .orders-num {
    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-column: 5/7;
    }

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 3/4;
    }
  }

  .project-location {
    grid-column: 3/5;

    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-column: 7/9;
    }
    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 1/-1;
      justify-self: start;
    }
  }

  .order-button {
    grid-column: -2/-1;
    grid-row: 1/2;
    justify-self: stretch;
    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-row: 1/2;
      grid-column: -5/-3;
    }

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 2/3;
      padding: 1rem;
    }
  }

  .history-button {
    grid-column: -2/-1;
    grid-row: 2/3;
    justify-self: stretch;
    // 1000px
    @media screen and (max-width: 62.5em) {
      grid-row: 1/2;
      grid-column: -3/-1;
    }

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 3/4;
      padding: 1rem;
    }
  }
`;

function OrderPageHeader({ orders }) {
  const navigate = useNavigate();
  const { projectId } = useParams(); // type of String
  const { isLoadingProjects, projects } = useProjects();

  // ############################################################
  let thisProject = projects?.find(
    (project) => project.id === Number(projectId)
  );
  // console.log(thisProject);
  // ############################################################

  const { address, isLoadingAddress } = useReverseGeocoding(
    thisProject?.id,
    thisProject?.latitude,
    thisProject?.longitude
  );

  if (isLoadingAddress || isLoadingProjects) return <Spinner />;

  return (
    <StyledOrderPageHeader>
      <div className="item project-name"> {thisProject?.title} </div>

      <Input
        className=" item project-description"
        value={thisProject?.description}
      />

      <div className="item start-date">
        <CiCalendar />
        {convertGeorgianDateToJalali(thisProject?.start_date)}
      </div>

      {/* <div className="item total-price">
        <FaMoneyCheckAlt />
        هزینه
      </div> */}

      <div className="item orders-num">
        <TbTriangleSquareCircleFilled />
        تعداد سفارشات فعال : {orders?.length}
      </div>

      <div className="item project-location">
        <MdOutlineMyLocation />
        {address?.formatted_address}
      </div>

      <Button
        size="small"
        className="order-button"
        onClick={() => navigate("make-order")}
      >
        خرید برای این پروژه
      </Button>

      <Button
        size="small"
        variation="tertiary"
        className="history-button"
        onClick={() => navigate("history")}
      >
        سابقه خرید این پروژه
      </Button>
    </StyledOrderPageHeader>
  );
}

export default OrderPageHeader;
