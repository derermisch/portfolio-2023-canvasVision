/*
    Created by: derermisch (https://github.com/derermisch)

    This is a wrapper-component which modifies the child,
    so that it will have an image/icon if needed.
    The child could be anything for example a button, an anchor element, <Link/> from react-router, ... 

    Features:
    - It ignores all children, except the first
    - If there is text provided in the child, then it will find it and use it
    - It can carry state from its parent through the linkedState prop,
    which is passed to the new child as an attribute.

    Example:
        <MakeImgButton linkedState={passDownStateHereIfNeeded} imgSrc={provideSrcHereIfNeeded}>
            <button><p>sadasdsad</p>Texthere</button> // everything inside <button> is ignored, except "Texthere"
            <p>Test</p> // this is ignored
        </MakeImgButton>

        turns into

        <button linkedStated={hereIsTheState}>
            <img src={providedSrc}/>
            <p>Texthere</p>
        </button>
*/

import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export const MakeImgButton = ({ children, linkedState, imgSrc, icon }) => {
    if (!children) {
        return <p>No children provided!</p>
    }

    // just get the first child, if there are more, ommit them
    let child = null
    if (Array.isArray(children)) {
        child = children[0]
    } else {
        child = children
    }
    const className = (child.props.className) ? (child.props.className) : "imgBtn"

    // Get text if there is one
    let text = ""
    if (child.props.children) {
        if (typeof (child.props.children) === "string") { //if there is just text as a child
            (text = child.props.children)
        }
        else { // if there are multiple children, search for one with text
            Array.from(child.props.children).forEach(grandChild => {
                (typeof (grandChild) === "string") && (text = grandChild)
            })
        }
    }

    // new children
    const newChildren = []
    imgSrc && newChildren.push(<img className={`${className}--img`} src={imgSrc} key={uuidv4()}></img>)
    icon && newChildren.push(<div className={`${className}--icon`} key={uuidv4()}>{icon}</div>)
    text && newChildren.push(<p className={`${className}--text`} key={uuidv4()}>{text}</p>)

    if (React.isValidElement(child)) {
        return React.cloneElement(
            child,
            { linkedstate: linkedState },
            [...newChildren]
        )
    }
    return child
}