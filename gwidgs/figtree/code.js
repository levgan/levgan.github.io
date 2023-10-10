// import forkMe from 'fork-me-github'

import { Tree } from './tree-master/src/tree.js' 

var jsonStr = "";
var stopatlevel = 0;

async function test() {
    
    // get html query params
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let data = params.q; 
    // console.log(data);

    if (data=='1') {
        const tree = new Tree(data4, { parent: document.body })
        // console.log(tree);
    } else {
        // const tree = new Tree(data2, { parent: document.body })
        // console.log(tree);
        var jsontree2 = await loadTreeTable();
        console.log("******************************************* jsontree");
        console.log(jsontree2);
        const tree = new Tree(await loadTreeTable(), { parent: document.body })
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
    test();
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
    var jsonStr = '{"name": "flare", "children": [';
    for (var i = 0; i < table.id.length; i++) {
        jsonStr += '{"name": "' + table.name[i] + '",  "id": "' + table.id[i] + '", ';
        // add child nodes
        // await addJsonNodeChildren(table, i);
        jsonStr = jsonStr.slice(0,-2);
        jsonStr += "},";        
    }
    jsonStr = jsonStr.slice(0,-1);
    jsonStr += "]}";
    return jsonStr;
}

async function addJsonNodeChildren(table, parentid) {
    stopatlevel+=1;
    if (stopatlevel>3) {
        return; 
    }
    jsonStr = jsonStr + "children: ["
    for (var i = 0; i < table.id.length; i++) {
        if (table.parent_tmp[i] == parentid) {
            jsonStr += '{"name": "' + table.name[i] + '",  "id": "' + table.id[i] + '", ';
            // add child nodes
            await addJsonNodeChildren(table, i);
            jsonStr += "],"
        }
    };
}
