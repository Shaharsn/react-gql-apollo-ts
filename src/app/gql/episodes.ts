import { gql, useQuery } from "@apollo/client";
import { Characters, Episode, Episodes } from "../types/types";

// GQL QUERIES
export const GET_ALL_EPISODES = gql`
  query GetAllEpisodes($pageNum: Int!) {
    episodes(page: $pageNum) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacter($pageNum: Int!) {
    characters(page: $pageNum) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        created
      }
    }
  }
`;

export const GET_CHARACTERS_FOR_EPISODE = gql`
  query GetCharacterForEpisode($episodeId: ID!) {
    episode(id: $episodeId) {
      id
      characters {
        id
        name
        status
        species
        type
        gender
        image
        created
      }
    }
  }
`;

// INTERFACES
// Input
export interface PageInput {
  pageNum: number;
}

export interface CharactersForEpisodeInput {
  episodeId: string;
}

// Response
export interface EpisodesResponse {
  episodes: Episodes;
}

export interface CharactersResponse {
  characters: Characters;
}

export interface CharactersForEpisodeResponse {
  episode: Episode;
}

// GQL QUERIES METHODS
export const useGetAllEpisodes = (pageNum: number) => {
  return useQuery<EpisodesResponse, PageInput>(GET_ALL_EPISODES, {
    variables: { pageNum },
  });
};

export const useGetAllCharacters = (pageNum: number) => {
  return useQuery<CharactersResponse, PageInput>(GET_ALL_CHARACTERS, {
    variables: { pageNum },
  });
};

export const useGetCharacterForEpisode = (episodeId: string) => {
  return useQuery<CharactersForEpisodeResponse, CharactersForEpisodeInput>(
    GET_CHARACTERS_FOR_EPISODE,
    {
      variables: { episodeId },
    }
  );
};