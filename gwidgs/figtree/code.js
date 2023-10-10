// import forkMe from 'fork-me-github'

import { Tree } from './tree-master/src/tree.js' 




function test() {
    
    // get html query params
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let data = params.q; 
    // console.log(data);

    if (data=='1') {
        const tree = new Tree(data1, { parent: document.body })
        // console.log(tree);
    } else {
        const tree = new Tree(data2, { parent: document.body })
        // console.log(tree);
    }
    
    // tree.expandAll()

    var elements = document.getElementsByClassName("yy-tree-name");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mousedown', treeNameClicked, false);
        // alert('*******************event listener added');
        //elements[i].addEventListener('click', myFunction, false);
    }

}

var treeNameClicked = async function(e) {
    // var attribute = this.getAttribute("data-myattribute");
    // alert(attribute);
    // set record pointer to clicked node to fire onRecord for selectBy
    await grist.setCursorPos({rowId: e.srcElement.id});
    console.log("*****************Clicked: " + e.srcElement.id);
};

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}


async function loadTreeTable (d) {
    const treeTable = await grist.fetchSelectedTable();
    const jsonTree = composeJsonTreeTable(treeTable);
    console.log("*******************************************");
    console.log(jsonTree);
}


function composeJsonTreeTable(table) {
    // add root nodes
    var jsonStr = "{name: root, children[";
    for (var i = 0; i < table.id.length; i++) {
        table.id[i];
        jsonStr += "{name: " + table.name[i] + ",  id: " + table.id[i] + ", ";
        // add child nodes
        addJsonNodeChildren(table, i);
        jsonStr += "}"        
    }
    jsonStr += "]}";
    return jsonStr;
}

function addJsonNodeChildren(table, parentid) {
    jsonStr = jsonStr + "children["
    for (var i = 0; i < table.id.length; i++) {
        if (table.parent_tmp[i] == parentid) {
            jsonStr += "{name: " + table.id[i] + ",  id: " + table.id[i] + ", ";
            // add child nodes
            addJsonNodeChildren(table, i);
            jsonStr += "],"
        }
    };
}
