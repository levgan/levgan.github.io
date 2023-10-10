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
        // const tree = new Tree(data2, { parent: document.body })
        // console.log(tree);
        const jsonTree2 = loadTreeTable();
        console.log("*******************************************");
        console.log(jsonTree2);
        // const tree = new Tree(jsonTree2, { parent: document.body })
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
    console.log("********************** Clicked: " + e.srcElement.id);
};

window.onload = function () {
    test()
    // forkMe('https://github.com/davidfig/tree')
}


async function loadTreeTable (d) {
    var treeTable = await grist.fetchSelectedTable();
    // var treeTableMapped = grist.mapColumnNames(treeTable, mappings);
    console.log("************************************ load");
    console.log(treeTable);
    var jsonTree = await composeJsonTreeTable(treeTable);
    return jsonTree;
}


async function composeJsonTreeTable(table) {
    console.log("************************************ compose");
    console.log(table);
    // add root nodes
    var jsonStr = "{name: root, children[";
    for (var i = 0; i < table.id.length; i++) {
        jsonStr += "{name: " + table.name[i] + ",  id: " + table.id[i] + ", ";
        // add child nodes
        await addJsonNodeChildren(table, i);
        jsonStr += "}"        
    }
    jsonStr += "]}";
    return jsonStr;
}

async function addJsonNodeChildren(table, parentid) {
    jsonStr = jsonStr + "children["
    for (var i = 0; i < table.id.length; i++) {
        if (table.tmp_parent[i] == parentid) {
            jsonStr += "{name: " + table.name[i] + ",  id: " + table.id[i] + ", ";
            // add child nodes
            await addJsonNodeChildren(table, i);
            jsonStr += "],"
        }
    };
}
