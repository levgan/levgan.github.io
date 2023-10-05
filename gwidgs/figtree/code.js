// import forkMe from 'fork-me-github'

import { Tree } from './tree-master/src/tree.js' 

// const data = {
//     children: [
//         { name: 'furity', children: [
//             { name: 'apples', children: [] },
//             { name: 'oranges', children: [
//                 { name: 'tangerines', children: [] },
//                 { name: 'mandarins', children: [] },
//                 { name: 'pomelo', children: [] },
//                 { name: 'blood orange', children: [] },
//             ] }
//         ]},
//         { name: 'vegetabley', children: [
//             { name: 'brocolli', children: [] },
//         ] },
//     ]
// }

function test() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let data = params.q; // "some_value"
    console.log(data);
    if (data=='1') {
        const tree = new Tree(data1, { parent: document.body })
    } else {
        const tree = new Tree(data2, { parent: document.body })
    }
    // tree.expandAll()
}

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}