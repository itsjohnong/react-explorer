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

const filterTree = ({search, tree}) => {
    
}

const Explorer = ({tree}) => {

    const [search, setSearch] = React.useState("");

    const handleChange = (event) => {
        let newState = event.target.value
        setSearch(newState)
    }

    const filteredData = tree.filter((info) => (
        info.toString().toLowerCase().startsWith(search.toLowerCase())
    ));

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