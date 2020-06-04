import React, { Component } from 'react';
import './SectionTag.css'

class SectionTag extends Component {
    render() {
        const section = this.props.section.toUpperCase();
        let backgroundColor = '#6F757B';
        let fontColor = '#FFFFFF';
        switch (section) {
            case 'WORLD':
                backgroundColor = '#7550F6';
                fontColor = '#FFFFFF';
                break;
            case 'POLITICS':
                backgroundColor = '#579288';
                fontColor = '#FFFFFF';
                break;
            case 'BUSINESS':
                backgroundColor = '#5B94E5';
                fontColor = '#FFFFFF';
                break;
            case 'TECHNOLOGY':
                backgroundColor = '#D1DC59';
                fontColor = '#000000';
                break;
            case 'SPORTS':
                backgroundColor = '#EEC45C';
                fontColor = '#000000';
                break;
            case 'SPORT':
                backgroundColor = '#EEC45C';
                fontColor = '#000000';
                break;
            case 'GUARDIAN':
                backgroundColor = '#192748';
                fontColor = '#FFFFFF';
                break;
            case 'NYTIMES':
                backgroundColor = '#DDDDDD';
                fontColor = '#000000';
                break;
        }
        return (
            <span id='section_tag' style={{backgroundColor: backgroundColor, color: fontColor}}>
                {section}
            </span>
        );
    }
}

export default SectionTag;