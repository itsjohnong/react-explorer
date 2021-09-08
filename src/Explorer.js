import * as React from 'react';
import s from "./Explorer.module.css";

const Caret = ({isOpen}) => {
    let className = s.caret;
    if (isOpen) {
        className += ` ${s.caretOpen}`
    }
    return <span className={className}/>
}

const Node = ({label, contents}) => {
    const [isShown, setIsShown] = React.useState(true)
    const hasContents = !!contents

    return (
        <li className={s.listItem}>
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
                    <Caret isOpen={isShown}/>
                )}
                {label}
            </span>
            {hasContents && isShown && (
                <ul className={s.list}>
                    {contents.map((child, index) => {
                        return (
                            <Node 
                                label={child.label} 
                                contents={child.contents} 
                                key={index} 
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
                                label={node.label} 
                                contents={node.contents} 
                                key={index}
                            />
                })}
            </ul>
    )
}

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

const Explorer = ({tree}) => {

    const [search, setSearch] = React.useState("");

    const handleChange = (event) => {
        let newState = event.target.value
        setSearch(newState)
    }

    const filteredData = filterTree({search, tree})

    return (
        <div className={s.container}>
            <input 
                type="text"
                value={search}
                placeholder="index.js"
                onChange={handleChange}
            />
            <DropdownMenu data={filteredData} />
        </div>
    )
};

export default Explorer;