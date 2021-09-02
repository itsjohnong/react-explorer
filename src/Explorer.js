import * as React from 'react';

const Node = ({label, contents}) => {
    const [isShown, setIsShown] = React.useState(true)
    const hasContents = !!contents

    return (
        <li>
            <span 
                onClick={() => {
                    if (hasContents) {
                        setIsShown((currentState) => {
                            return !currentState
                        })
                    }
                }}
            >
                {label}
            </span>
            {hasContents && isShown && (
                <ul>
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
            <ul>
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

const filterTree = ({tree, search}) => {
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
        <>
            <input 
                type="text"
                value={search}
                placeholder="index.js"
                onChange={handleChange}
            />
            <DropdownMenu data={filteredData} />
        </>
    )
};

export default Explorer;