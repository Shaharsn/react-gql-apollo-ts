import {Card} from "antd";
import React from "react";
import {Character} from "../types/types";

const {Meta} = Card;

const CharacterCard = (props: Character) => {
    const {name, status, species, gender, image, created} = props;

    const characterDescription = species + ', ' + gender + ', ' + status + ', Created on ' + created.slice(0, 10);
    return (
        <Card
            hoverable
            style={{width: '100%'}}
            cover={<img alt="example" src={image}/>}
        >
            <Meta title={name} description={characterDescription} style={{fontSize: '10vm'}}/>
        </Card>
    );
};
export default CharacterCard;
