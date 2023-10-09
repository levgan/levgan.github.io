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

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('clicked', treeClicked, false);
        alert('*******************event listener added');
        //elements[i].addEventListener('click', myFunction, false);
    }

    var elements = document.getElementsByClassName("yy-tree-name");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('clicked', treeNameClicked, false);
        // alert('*******************event listener added');
        //elements[i].addEventListener('click', myFunction, false);
    }

}

var treeClicked = function() {
    // var attribute = this.getAttribute("data-myattribute");
    // alert(attribute);
    console.log('clicked');
};

var treeNameClicked = function() {
    // var attribute = this.getAttribute("data-myattribute");
    // alert(attribute);
    console.log('name clicked');
};

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}