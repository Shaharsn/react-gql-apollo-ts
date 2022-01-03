import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../types/types";
import CharacterCard from "./CharacterCard";
import ReactLoading from "react-loading";
import { Col, Pagination, Row, Input } from "antd";
import {
  useGetAllCharacters,
  useGetCharacterForEpisode,
} from "../gql/episodes";

interface CharactersProps {
  compType: string;
}

const CharactersList: React.FC<CharactersProps> = (props) => {
  const { episodeId = "1" } = useParams();

  const [pageNum, setPageNum] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(1);

  const [charactersFullList, setCharactersFullList] = useState<Character[]>();
  const [characters, setCharacters] = useState<Character[]>();

  const [
    loadAllCharacters,
    { loading: loadAll, error: errAll, data: dataAll },
  ] = useGetAllCharacters(pageNum);

  const [
    loadCharactersForEpisode,
    { loading: loadByEpisode, error: errByEpisode, data: dataByEpisode },
  ] = useGetCharacterForEpisode(episodeId);

  // To run on the first time
  useEffect(() => {
    if (props.compType === "all") {
      loadAllCharacters();
    } else if (props.compType === "byEpisode") {
      loadCharactersForEpisode();
    }
  }, [loadAllCharacters, loadCharactersForEpisode, props.compType]);

  // To update the Episode list on data change
  useEffect(() => {
    if (dataAll) {
      setCharactersFullList(dataAll.characters.results);
      setCharacters(dataAll.characters.results);
      setTotalCharacters(dataAll.characters.info.count);
    } else if (dataByEpisode) {
      setCharactersFullList(dataByEpisode.episode.characters);
      setCharacters(dataByEpisode.episode.characters);
    }
  }, [dataAll, dataByEpisode]);

  // Pagination
  const moveToPage = (page: number) => {
    setPageNum(page);
    loadAllCharacters({ variables: { pageNum: page } });
  };

  // Filtering the list by the input string
  const onFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    const characterName = event.currentTarget.value;
    
    if (charactersFullList) {
      setCharacters(Object.assign([], charactersFullList));
    }

    setCharacters((currentArr) => {
      return currentArr?.filter(
        (character) => character.name.toLowerCase().includes(characterName.toLowerCase())
      );
    });
  };

  if (errAll || errByEpisode) {
    return <p>{errAll?.message}{errByEpisode?.message}</p>;
  }

  if (loadAll || loadByEpisode) {
    return <ReactLoading type="bars" color="#55555" />;
  }

  return (
    <>
      {props.compType === "all" && (
        <>
          <Pagination
            className="pagination"
            showSizeChanger={false}
            current={pageNum}
            defaultPageSize={20}
            total={totalCharacters}
            onChange={moveToPage}
          />

          <Input placeholder="Character Name" onChange={onFilterChange} style={{margin: "0 0 10px 0"}}/>
        </>
      )}

      <Row gutter={[32, 32]}>
        {characters?.map((character) => (
          <Col span={6} key={character.id}>
            <CharacterCard {...character} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default CharactersList;
