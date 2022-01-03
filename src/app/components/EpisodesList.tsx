import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

import { Collapse, Pagination } from "antd";
import { Episodes } from "../types/types";
import { useGetAllEpisodes } from "../gql/episodes";
import EpisodeInfo from "./EpisodeInfo";

const EpisodesList = () => {
  const { Panel } = Collapse;
  const [pageNum, setPageNum] = useState(1);

  const [episodes, setEpisodes] = useState<Episodes>();

  const [loadEpisodes, { loading, error, data }] = useGetAllEpisodes(1);

  // To run the Episode Query on load
  useEffect(() => {
    loadEpisodes();
  }, [loadEpisodes]);

  // To update the Episode list on data change
  useEffect(() => {
    if (data) setEpisodes(data.episodes);
  }, [data]);

  // Pagination
  const moveToPage = (page: number) => {
    setPageNum(page);
    loadEpisodes({ variables: { pageNum: page } });
  };

  if (error) {
    console.log(JSON.stringify(error));

    return <p>ERROR: {error.message}</p>;
  }

  if (loading) {
    return <ReactLoading type="bars" color="#55555" />;
  }

  return (
    <>
      <Pagination
        className="pagination"
        showSizeChanger={false}
        current={pageNum}
        defaultPageSize={20}
        total={episodes?.info.count ? episodes?.info.count : 0}
        onChange={moveToPage}
      />

      <Collapse>
        {episodes?.results.map((episode) => (
          <Panel
            header={`${episode.episode} | ${episode.name}`}
            key={episode.id}
          >
            <EpisodeInfo {...episode} />
          </Panel>
        ))}
      </Collapse>
    </>
  );
};
export default EpisodesList;
