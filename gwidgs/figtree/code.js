// import forkMe from 'fork-me-github'

import { Tree } from './tree-master/src/tree.js' 

function test() {
    
    // get html query params
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
    tree.addEventListener('click', treeClicked);
    // tree.expandAll()
}

function treeClicked(e) {
    console.log('treeClicked');
}

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}