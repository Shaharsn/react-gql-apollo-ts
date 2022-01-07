import { useState } from "react";
import ReactLoading from "react-loading";
import { useGetAllCharacters } from "../gql/episodes";
import CharactersList from "./CharactersList";

const CharactersAll = () => {
  const [pageNum, setPageNum] = useState(1);

  const { loading, error, data } = useGetAllCharacters(pageNum);
  const characters = data?.characters.results ? data?.characters.results : [];
  const count = data?.characters.info.count ? data?.characters.info.count : 0;

  // Pagination
  const moveToPage = (page: number) => {
    setPageNum(page);
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <ReactLoading type="bars" color="#55555" />;
  }

  return (
    <CharactersList
      characters={characters}
      count={count}
      pageNum={pageNum}
      moveToPage={moveToPage}
    />
  );
};
export default CharactersAll;
