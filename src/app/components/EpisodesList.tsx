import {useState} from "react";
import ReactLoading from "react-loading";

import {Collapse, Pagination} from "antd";
import {useGetAllEpisodes} from "../gql/episodes";
import EpisodeInfo from "./EpisodeInfo";

const {Panel} = Collapse;

const EpisodesList = () => {
    const [pageNum, setPageNum] = useState(1);

    const {loading, error, data} = useGetAllEpisodes(pageNum);
    const episodes = data?.episodes;

    // Pagination
    const moveToPage = (page: number) => {
        setPageNum(page);
    };

    if (error) {
        console.log(JSON.stringify(error));
        return <p>ERROR: {error.message}</p>;
    }

    if (loading) {
        return <ReactLoading type="bars" color="#55555"/>;
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
