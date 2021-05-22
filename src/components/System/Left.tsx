import React, {PureComponent} from 'react';
import type {Stave} from '../../constants';

type Props = {
    staves: Stave[]
};

class Left extends PureComponent<Props> {
    render() {
        const {staves} = this.props;
        return (
            <div
                aria-label='instrument overview'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: 'stretch',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    margin: '42px 0',
                    textAlign: 'right',
                    borderRight: '4px solid black',
                }}
            >
                {staves.map(({name}, i) => (
                    <p
                        style={{margin: '10px 0 12px'}}
                        key={i}
                    >
                        {name}
                    </p>
                ))}
            </div>
        );
    }
}

export default Left;
