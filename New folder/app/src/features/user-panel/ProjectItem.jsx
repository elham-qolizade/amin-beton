/*eslint-disable */

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { IoIosSquareOutline } from "react-icons/io";
import { FaBriefcase } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FiType } from "react-icons/fi";

import Button from "../../ui/Button";

import { convertGeorgianDateToJalali } from "../../utils/helpers";

const StyledProjectItem = styled.div`
  /* height: 25rem; */
  background-color: var(--color-grey-200);
  margin: 5rem 0;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: 1fr 2fr;

  // 800px
  @media screen and (max-width: 50em) {
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const Title = styled.div`
  background-color: var(--color-grey-200);
  grid-column: 1/2;
  border-radius: 1rem;
  padding: 3rem 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2rem;

  // 800px
  @media screen and (max-width: 50em) {
    box-shadow: 0.2rem 0 5rem rgba(0, 0, 0, 0.1);
  }

  // 500px
  @media screen and (max-width: 31.25em) {
    grid-template-columns: repeat(2, 1fr);
  }

  button {
    align-self: center;
    justify-self: center;
    grid-column: 4/5;
    grid-row: 2/3;

    // 500px
    @media screen and (max-width: 31.25em) {
      grid-column: 1/-1;
      grid-row: 1/2;
      justify-self: stretch;
    }
  }
`;

const DetailItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 1rem;

  svg {
    color: var(--color-brand-600);
  }

  .field {
    font-weight: 600;
  }

  .value {
    grid-column: 1/3;
    font-size: 1.4rem;
    font-weight: 300;
  }
`;

function ProjectItem({ project }) {
  const navigate = useNavigate();

  return (
    <StyledProjectItem>
      <Title>
        <div className="name">{project.title}</div>
        <div className="description">{project.description}</div>
      </Title>

      <Details>
        <DetailItem>
          <IoIosSquareOutline />
          <span className="field">پلاک ثبتی</span>
          <span className="value">{project.registered_plate}</span>
        </DetailItem>

        <DetailItem>
          <FaBriefcase />
          <span className="field">شماره پرونده</span>
          <span className="value">{project.case_number}</span>
        </DetailItem>

        <DetailItem>
          <MdOutlineEngineering />
          <span className="field">مهندس ناظر</span>
          <span className="value">{project.supervising_engineer}</span>
        </DetailItem>

        <DetailItem>
          <MdOutlineEngineering />
          <span className="field">سازنده</span>
          <span className="value">{project.builder}</span>
        </DetailItem>

        <DetailItem>
          <MdOutlineEngineering />
          <span className="field">کارفرما</span>
          <span className="value">{project.employer}</span>
        </DetailItem>

        <DetailItem>
          <FiType />
          <span className="field">کاربری</span>
          <span className="value">{project.type}</span>
        </DetailItem>

        <DetailItem>
          <CiCalendar />
          <span className="field">تاریخ پایان</span>
          <span className="value">
            {convertGeorgianDateToJalali(project.end_date)}
          </span>
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
