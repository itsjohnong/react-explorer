import * as React from 'react';

export const TREE = [
    {
        label: "public",
        contents: [
            {label: "favicon.ico"},
            {label: "index.html"},
            {label: "robots.txt"},
            {
                label: "styles",
                contents: [
                    {label:"styles.css"}
                ]
            }
        ]
    },
    {
        label: "src",
        contents: [
            {label: "App.js"},
            {label: "hooks.js"},
            {label: "index.js"}
        ]
    },
    {
        label: "package.json"
    },
    {
        label: "README.md"
    }
]



const Node = ({label, contents}) => {
    return (
        <li>
            {label}
            {!!contents && (
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

const Explorer = () => {

    const [search, setSearch] = React.useState("");

    const handleChange = (event) => {
        let newState = event.target.value
        setSearch(newState)
    }

    const filteredData = TREE.filter((info) => (
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