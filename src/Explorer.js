import * as React from 'react';
import s from "./Explorer.module.css";
import cn from 'classnames';

const Caret = ({isOpen, className, style}) => {
    return <span className={cn(s.caret, className, {
        [s.caretOpen]: isOpen
    })} style={style}/>
}

const Node = ({label, contents, classNames, guidelineStyle, customStyles}) => {
    const [isShown, setIsShown] = React.useState(true)
    const hasContents = !!contents

    return (
        <li className={cn(s.listItem, classNames.listItem)} style={customStyles.listItem}>
            <span 
                onClick={() => {
                    if (hasContents) {
                        setIsShown((currentState) => {
                            return !currentState
                        })
                    }
                }}
            >
                {hasContents && (
                    <Caret isOpen={isShown} className={classNames.caret} style={customStyles.caret}/>
                )}
                {label}
            </span>
            {hasContents && isShown && (
                <ul className={cn(s.list, classNames.list)} style={{borderColor: guidelineStyle.color, borderStyle: guidelineStyle.style, ...customStyles.list}}>
                    {contents.map((child, index) => {
                        return (
                            <Node 
                                label={child.label} 
                                contents={child.contents} 
                                key={index}
                                classNames={classNames}
                                guidelineStyle={guidelineStyle}
                                customStyles={customStyles}

                            />
                        )
                    })}
                </ul>
            )}
        </li>
    )
}

const DropdownMenu = (props) => {
    return (
            <ul style={{padding:0}}>
                {props.data.map((node,index) => {
                    return <Node 
                                {...props}
                                label={node.label} 
                                contents={node.contents} 
                                key={index}
                            />
                })}
            </ul>
    )
}

// Add parameter to tree to be case sensitive or not
export const filterTree = ({tree, search, caseSensitive = true}) => {
    return tree.reduce((currentTree, child) => {
        const isLeafNode = !child.contents
        if (child.label.startsWith(search)) {
            currentTree.push(child)
        } else if (!isLeafNode) {
            const filtered = filterTree({tree: child.contents, search})
            if (filtered.length) {
                currentTree.push({
                    label: child.label,
                    contents: filtered
                })
            }
        }
        return  currentTree
    },[])
}

const styleNames = [
    "container",
    "list",
    "listItem",
    "highlightedListItem",
    "searchbox",
    "caret"
]
const defaultClassNames = styleNames.reduce((acc, c) => {
    return {...acc, [c]: ""}
},{})

const defaultStyles = styleNames.reduce((acc, c) => {
    return {...acc, [c]: {}}
},{})

const defaultGuidelineStyle = {
    color: "currentColor",
    style: "dashed"
}

const Explorer = ({tree, classNames = {}, guideline = {}, styles={}}) => {
    const customClassNames = {...defaultClassNames, ...classNames}

    const customStyles = {...defaultStyles, ...styles}

    const guidelineStyle = {...defaultGuidelineStyle, ...guideline}

    const [search, setSearch] = React.useState("");

    const handleChange = (event) => {
        let newState = event.target.value
        setSearch(newState)
    }

    const filteredData = filterTree({search, tree})

    return (
        <div className={cn(s.container, customClassNames.container)} style={customStyles.container}>
            <input 
                type="text"
                value={search}
                placeholder="index.js"
                onChange={handleChange}
                className={customClassNames.searchbox}
                style={customStyles.searchbox}
            />
            {/* short hand for classNames={classNames}, guideLineColor={guidelineColor} */}
            <DropdownMenu data={filteredData} classNames={customClassNames} {...{guidelineStyle, customStyles}}/>
        </div>
    )
};

export default Explorer;