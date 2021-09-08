import {filterTree} from "./Explorer";

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

// Unit Test
describe("filterTree", () => {
    it("returns an empty list when no search value matches", () => {
        expect(filterTree({tree:TREE, search:"dgsdg"})).toEqual([])
    })
    it("returns the same tree when empty search provided", () => {
        expect(filterTree({tree:TREE, search:""})).toEqual(TREE)
    });
    it("properly filters top level nodes", () => {
        expect(filterTree({tree:TREE, search:"README"})).toEqual([{label:"README.md"}])
    });
    it("properly filters folder names", () => {
        expect(filterTree({tree:TREE, search:"src"})).toEqual([{
            label:"src", 
            contents: [
                {label: "App.js"},
                {label: "hooks.js"},
                {label: "index.js"}
            ]
        }])
    });
    it("properly filters deeply nested leaf nodes", () => {
        expect(filterTree({tree:TREE, search:"styles.css"})).toEqual([{
            label: "public",
            contents: [
                {
                    label: "styles",
                    contents: [
                        {label:"styles.css"}
                    ]
                }
            ]
        }])
    });
})

// Integration Test
// Ex: Selenium