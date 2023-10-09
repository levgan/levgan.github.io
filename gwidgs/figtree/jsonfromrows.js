json = ''

findTopLevels() {
    for each row where parent is null {
        json += "{name: " + row.id + ", "
        findChildren(row.id);
        json += "}"        
    }
}

// json = json + "{name: " + row.id + ", children["

findChildren(parent) {
    json = json + "children["
    for each row {
        if (row.parent.id == parent.id) {
            json += "{name: " + row.id + ", "
            findChildren(row);
            json += "],"
        }
    }
}