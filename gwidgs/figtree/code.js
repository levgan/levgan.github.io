// import forkMe from 'fork-me-github'

import { Tree } from 'tree-master/src/tree'

const data = {
    children: [
        { name: 'furity', children: [
            { name: 'apples', children: [] },
            { name: 'oranges', children: [
                { name: 'tangerines', children: [] },
                { name: 'mandarins', children: [] },
                { name: 'pomelo', children: [] },
                { name: 'blood orange', children: [] },
            ] }
        ]},
        { name: 'vegetabley', children: [
            { name: 'brocolli', children: [] },
        ] },
    ]
}

function test() {
    const tree = new Tree(data, { parent: document.body })
    tree.expandAll()
}

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}