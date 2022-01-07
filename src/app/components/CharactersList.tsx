import { useEffect, useState } from "react";
import { Character } from "../types/types";
import CharacterCard from "./CharacterCard";
import { Col, Pagination, Row, Input } from "antd";

interface CharactersListProps {
  characters: Character[];
  count?: number;
  pageNum?: number;
  moveToPage?: (pageNum: number) => void;
}
const CharactersList = (props: CharactersListProps) => {
  const {characters, count, pageNum, moveToPage} = props;
  
  const [charactersFilteredList, setCharactersFilteredList] = useState(
    characters
  );

  useEffect(() => {
    setCharactersFilteredList(characters)
  }, [characters])

  // Filtering the list by the input string
  const onFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    const characterName = event.currentTarget.value;

    setCharactersFilteredList(characters.filter((character) =>
      character.name.toLowerCase().includes(characterName.toLowerCase())
    ));
  };

  return (
    <>
      {count && pageNum && moveToPage && (
        <>
          <Pagination
            className="pagination"
            showSizeChanger={false}
            current={pageNum}
            defaultPageSize={20}
            total={count}
            onChange={moveToPage}
          />

          <Input
            placeholder="Character Name"
            onChange={onFilterChange}
            style={{ margin: "0 0 10px 0" }}
          />
        </>
      )}

      <Row gutter={[32, 32]}>
        {charactersFilteredList?.map((character) => (
          <Col span={6} key={character.id}>
            <CharacterCard {...character} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default CharactersList;
