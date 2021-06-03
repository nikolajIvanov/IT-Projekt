import React from 'react';
import theme from '../../../theme'

export default function SectionLerngruppe(props) {
    return (
        <div>
            <p style={theme.h1.bold}>{props.text}</p>
        </div>
    );
}
