/*eslint-disable */
import styled from "styled-components";
import DownloadButton from "../../ui/DownloadButton";

const StyledFilmRow = styled.div`
  background-color: var(--color-grey-200);
  padding: 3rem 4rem;
  border: 1px solid transparent;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .buttons {
    & > * {
      margin-left: 2rem;
    }
  }

  &:hover {
    border: 1px solid var(--color-grey-500);
  }
`;

function FilmRow({ film }) {
  const bucketUrl = `https://amin-beton-back.chbk.run${film.video}`;

  return (
    <StyledFilmRow>
      <div className="buttons">
        <DownloadButton fileDataUrl={bucketUrl} buttonText="باز کردن" />
      </div>
      <div className="category"> دسته بندی : {film?.category?.title}</div>
      <div className="title">{film?.title}</div>
    </StyledFilmRow>
  );
}

export default FilmRow;
