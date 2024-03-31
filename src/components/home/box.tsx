import React, { Component } from 'react';
import '../../styles/box.css';

interface BoxProps {
    title: string;
    imgSrc: string;
    tags: string[];
    link: string;
}

class Box extends Component<BoxProps> {
    handleClick = () => {
        window.location.href = this.props.link;
    };

    render() {
        const { title, imgSrc, tags } = this.props;

        return (
            <div className='box_main' onClick={this.handleClick}>
                <div className='box_title'>{title}</div>
                <img className='box_image' src={imgSrc} alt="box_image" />
                <div className='box_tagParent'>
                    {tags.map((tag, index) => (
                        <span className='box_tag' key={index}>{tag}</span>
                    ))}
                </div>
            </div>
        );
    }
}

export default Box;
