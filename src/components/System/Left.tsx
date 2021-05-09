import React, {PureComponent} from 'react';
import type {StaveOptions} from './constants';

type Props = {
    staves: StaveOptions[]
};

class Left extends PureComponent<Props> {
    render() {
        const {staves} = this.props;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'stretch',
                justifyContent: 'space-between',
                padding: '40px 10px',
                textAlign: 'right',
            }}>
                {staves.map(({name}, i) => <p key={i}>{name}</p>)}
            </div>
        );
    }
}

export default Left;
