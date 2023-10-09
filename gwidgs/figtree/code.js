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

    // tree.expandAll()

    var elements = document.getElementsByClassName("yy-tree");

    var myFunction = function() {
        // var attribute = this.getAttribute("data-myattribute");
        // alert(attribute);
        console.log(this);
    };
    
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', myFunction, false);
    }

}

function treeClicked(e) {
    console.log('treeClicked');
}

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}