import React from "react";
import { List, Header } from "semantic-ui-react";

export const People = ({ people }) => {
    return (
        <List>
            {people.map(human => {
                return (
                    <List.Item key={human.fname}>
                        <Header>
                            {human.fname} {human.lname}
                        </Header>
                        {human.timestamp}
                    </List.Item>
                )
            })}
        </List>
    );
};