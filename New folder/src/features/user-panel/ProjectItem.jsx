/*eslint-disable */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { FaMoneyCheckAlt } from "react-icons/fa";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineMyLocation } from "react-icons/md";

import Button from "../../ui/Button";
import Tag from "../../ui/Tag";

const StyledProjectItem = styled.div`
  /* height: 20rem; */
  background-color: var(--color-grey-200);
  margin: 5rem 0;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: minmax(10rem, 1fr) 2fr;
`;

const Title = styled.div`
  grid-column: 1/2;
  padding: 3rem 4rem;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  .name {
    font-size: 2rem;
    font-weight: 800;
  }

  .description {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const Details = styled.div`
  grid-column: 2/3;

  background-color: var(--color-grey-0);
  border-radius: 1rem;
  padding: 3rem 5rem;
  box-shadow: 0.7rem 0 1rem rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2rem;

  button {
    align-self: center;
    justify-self: center;
    grid-column: 3/4;
    grid-row: 1/2;
  }
`;

const DetailItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 1rem;

  .value {
    grid-column: 1/3;
    font-size: 1.4rem;
    font-weight: 300;
  }
`;

function ProjectItem({ project }) {
  const navigate = useNavigate();

  let statusToTag = {
    unconfirmed: "yellow",
    active: "blue",
  };

  return (
    <StyledProjectItem>
      <Title>
        <div className="name">{project.name}</div>
        <Tag color={statusToTag[project.status]}>
          {project.status === "active" ? "فعال" : "تایید نشده"}
        </Tag>
        <div className="description">{project.description}</div>
      </Title>

      <Details>
        <DetailItem>
          <FaMoneyCheckAlt />
          <span>مجموع هزینه ها</span>
          <span className="value">۰ تومان</span>
        </DetailItem>

        <DetailItem>
          <TbTriangleSquareCircleFilled />
          <span>تعداد سفارشات</span>
          <span className="value">۰ عدد</span>
        </DetailItem>

        <DetailItem>
          <CiCalendar />
          <span>تاریخ آغاز</span>
          <span className="value">{project.start_date}</span>
        </DetailItem>

        <DetailItem>
          <MdOutlineMyLocation />
          <span>مکان پروژه</span>
          <span className="value">{project.location}</span>
        </DetailItem>

        <Button
          size="small"
          onClick={() => navigate(`/user-panel/projects/${project.id}`)}
        >
          مشاهده جزئیات پروژه
        </Button>
      </Details>
    </StyledProjectItem>
  );
}

export default ProjectItem;
