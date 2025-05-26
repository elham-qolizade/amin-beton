// /*eslint-disable */
import { useEffect } from "react";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import AddFilm from "./AddFilm";
import FilmRow from "./FilmRow";

import { useOrderLabResults } from "./useOrderLabResults";

const StyledFilms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function Films() {
  const { isLoading, getOrderLabResults, labResults } = useOrderLabResults();

  useEffect(() => {
    getOrderLabResults();
  }, [getOrderLabResults]);

  if (isLoading) return <Spinner />;

  return (
    <StyledFilms>
      <Modal>
        <Modal.Open opens="add-film">
          <Button size="large">آپلود فایل</Button>
        </Modal.Open>
        <Modal.Window name="add-film">
          <AddFilm />
        </Modal.Window>

        {labResults?.length > 0 ? (
          labResults.map((film) => <FilmRow key={film.video} film={film} />)
        ) : (
          <Empty />
        )}
      </Modal>
    </StyledFilms>
  );
}

export default Films;
