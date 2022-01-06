import {Row, Col, Button} from "antd";
import {Link} from "react-router-dom";
import {Episode} from "../types/types";

const EpisodeInfo = (props: Episode) => {
    const {id, name, air_date, episode, created} = props;

    return (
        <Row>
            <Col span={21}>
                <p>
                    The {name} episode is episode #{episode.slice(4, 6)} from series #
                    {episode.slice(1, 3)}
                </p>
                <p>
                    Created on {created.slice(0, 10)} and went on air on {air_date}
                </p>
            </Col>

            <Col span={3}>

                {/* Route to the Characters list page, passing the Episode Id */}
                <Button type="primary">
                    <Link to={`${id}/characters-list`}>Characters List</Link>
                </Button>
            </Col>
        </Row>
    );
};
export default EpisodeInfo;
