import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { useGetCharacterForEpisode } from "../gql/episodes";
import CharactersList from "./CharactersList";

const CharactersByEpisode = () => {
  const { episodeId = "1" } = useParams();
  const { loading, error, data } = useGetCharacterForEpisode(episodeId);
  const characters = data?.episode.characters ? data?.episode.characters : [];

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return <ReactLoading type="bars" color="#55555" />;
  }

  return <CharactersList characters={characters} />;
};

export default CharactersByEpisode;
