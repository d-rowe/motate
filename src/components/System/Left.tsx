import React, {PureComponent} from 'react';
import type {Stave} from '../../constants';

type Props = {
    staves: Stave[],
    showInstrumentLabels: boolean,
};

class Left extends PureComponent<Props> {
    render() {
        const {
            staves,
            showInstrumentLabels,
        } = this.props;
        return (
            <div
                aria-label='instrument overview'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: 'stretch',
                    justifyContent: 'space-between',
                    padding: '0 12px 0 0',
                    margin: '42px 0',
                    textAlign: 'right',
                    borderRight: '4px solid black',
                }}
            >
                {showInstrumentLabels && staves.map(({name}, i) => (
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
