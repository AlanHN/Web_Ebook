import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom'

const {Meta} = Card;

export class Book extends React.Component {
    render() {
        const {info} = this.props;
        return (
            <Link to={{
                pathname: '/book',
                search: '?id=' + info.bookId
            }}
            >
                <Card
                    hoverable
                      style={{width: 240}}
                      cover={<img alt="bookFace" src={info.image}/>}>
                    <Meta title={info.title}
                          description={'¥' + info.price}/>
                </Card>
            </Link>
        );
    }
}

