import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Character, Characters} from "../types/types";
import CharacterCard from "./CharacterCard";
import ReactLoading from "react-loading";
import {Col, Pagination, Row, Input} from "antd";
import {
    useGetAllCharacters,
    useGetCharacterForEpisode,
} from "../gql/episodes";

// interface CharactersProps {
//   compType: string;
// }

export const CharactersListAll = () => {
    const [pageNum, setPageNum] = useState(1);
    const {loading: loadCharacters, error: errCharacters, data: dataCharacters} = useGetAllCharacters(pageNum);
    const characters = dataCharacters?.characters.results;
    const charactersCount = dataCharacters?.characters.info.count;

    if (!characters || !charactersCount) {
        // no char
        return <></>;
    }

    return <CharactersList characters={characters} totalCount={charactersCount} setPageNum={setPageNum}
                           pageNum={pageNum}/>
}

export const CharactersListForEpisode = () => {
    const {episodeId = "1"} = useParams();
    const {
        loading: loadByCharactersEpisode,
        error: errCharactersByEpisode,
        data: dataCharactersByEpisode
    } = useGetCharacterForEpisode(episodeId);

    const characters = dataCharactersByEpisode?.episode.characters;

    if (!characters) {
        // no char
        return <></>;
    }

    return <CharactersList characters={characters} />
}

interface CharactersListProps {
    characters: Character[];
    totalCount?: number;
    setPageNum?: (page: number) => void;
    pageNum?: number;
}

const CharactersList = (props: CharactersListProps) => {
    const {characters, totalCount, setPageNum, pageNum} = props;

    return (
        <>
            {totalCount && setPageNum && pageNum && (
                <>
                    <Pagination
                        className="pagination"
                        showSizeChanger={false}
                        current={pageNum}
                        defaultPageSize={20}
                        total={totalCount || 0}
                        onChange={setPageNum}
                    />
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
