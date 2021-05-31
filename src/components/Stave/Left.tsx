import React from 'react';

type Props = {
    name?: string,
};

function Left(props: Props) {
    return (
        <div
            style={{
                display: 'flex',
                padding: '0 12px 0 0',
                margin: '42px 0',
            }}
        >
            <p style={{margin: '10px 0 12px'}}>
                {props.name}
            </p>
        </div>
    );
}

export default Left;
