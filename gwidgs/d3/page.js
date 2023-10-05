// let's assume that it's imported in an html file
var grist;

// document.getElementById('container').append(initD3a());


//registering code to run when a document is ready
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// when a document is ready, register the calendar and subscribe to grist events
ready(async () => {
  await configureGristSettings();
});

// Data for column mapping fields in Widget GUI
function getGristOptions() {
  return [
    {
      name: "tsk1",
      title: "ID 1",
      optional: false,
      type: "Ref",
      description: "",
      allowMultiple: false
    },
    {
        name: "tsk2",
        title: "ID 2",
        optional: false,
        type: "Ref",
        description: "",
        allowMultiple: false
      }
  ];
}

// let's subscribe to all the events that we need
async function configureGristSettings() {
  // CRUD operations on records in table
  grist.onRecords(gristTableChanged);
  // When cursor (selected record) change in the table
  grist.onRecord(gristSelectedRecordChanged);
  // When options changed in the widget configuration (reaction to perspective change)
  // grist.onOptions(onGristSettingsChanged);

  // To get types, we need to know the tableId. This is a way to get it.
  grist.on('message', (e) => {
    if (e.tableId && e.mappingsChange) { colTypesFetcher.gotNewMappings(e.tableId); }
  });

  // TODO: remove optional chaining once grist-plugin-api.js includes this function.
  grist.enableKeyboardShortcuts?.();

  // bind columns mapping options to the GUI
  const columnsMappingOptions = getGristOptions();
  grist.ready({ requiredAccess: 'full', columns: columnsMappingOptions, allowSelectBy: true });

}

// When a user selects a record in the table, we want to select it on the view
async function gristSelectedRecordChanged(record, mappings) {
  const mappedRecord = grist.mapColumnNames(record, mappings);
  /*
  if (mappedRecord && calendarHandler) {
    await calendarHandler.selectRecord(mappedRecord);
  }
  */
}

/*  BIND CLICK EVENT TO CHANGE GRIST CURSOR POSITION AND FIRE LINKING TABLES WITH ONRECORD()
    this.calendar.on('clickEvent', async (info) => {
      await grist.setCursorPos({rowId: info.event.id});
    });
*/






// when some CRUD operation is performed on the table, we want to update the calendar
async function gristTableChanged(records, mappings) {
  if (mappings) { colTypesFetcher.gotMappings(mappings); }
  const mappedRecords = grist.mapColumnNames(records, mappings);
  // if any records were successfully mapped, create or update them in the view
  if (mappedRecords) {
    const colTypes = await colTypesFetcher.getColTypes();
    // const CalendarEventObjects = mappedRecords.filter(isRecordValid).map(r => buildCalendarEventObject(r, colTypes));
    // await calendarHandler.updateCalendarEvents(CalendarEventObjects);
    document.getElementById('container').append(initD3a());
  }
  dataVersion = Date.now();
}

function focusWidget() {
  window.focus();
}

function initD3b() {
  const format = d3.format(",");
  const nodeSize = 17;
  var data1 = getTreeData1();
  const root = d3.hierarchy(data1).eachBefore((i => d => d.index = i++)(0));
  const nodes = root.descendants();
  const width = 928;
  const height = (nodes.length + 1) * nodeSize;

  const columns = [
    {
      label: "Size", 
      value: d => d.value, 
      format, 
      x: 280
    },
    {
      label: "Count", 
      value: d => d.children ? 0 : 1, 
      format: (value, d) => d.children ? format(value) : "-", 
      x: 340
    }
  ];

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;");

  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#999")
    .selectAll()
    .data(root.links())
    .join("path")
      .attr("d", d => `
        M${d.source.depth * nodeSize},${d.source.index * nodeSize}
        V${d.target.index * nodeSize}
        h${nodeSize}
      `);

  const node = svg.append("g")
    .selectAll()
    .data(nodes)
    .join("g")
      .attr("transform", d => `translate(0,${d.index * nodeSize})`);

  node.append("circle")
      .attr("cx", d => d.depth * nodeSize)
      .attr("r", 2.5)
      .attr("fill", d => d.children ? null : "#999");

  node.append("text")
      .attr("dy", "0.32em")
      .attr("x", d => d.depth * nodeSize + 6)
      .text(d => d.data.name);

  node.append("title")
      .text(d => d.ancestors().reverse().map(d => d.data.name).join("/"));

  for (const {label, value, format, x} of columns) {
    svg.append("text")
        .attr("dy", "0.32em")
        .attr("y", -nodeSize)
        .attr("x", x)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(label);

    node.append("text")
        .attr("dy", "0.32em")
        .attr("x", x)
        .attr("text-anchor", "end")
        .attr("fill", d => d.children ? null : "#555")
      .data(root.copy().sum(value).descendants())
        .text(d => format(d.value, d));
  }
  return svg.node();
}


function initD3a() {
  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

  // Add the y-axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

  // Append the SVG element.
  return svg.node();

}

// We have no good way yet to get the type of a mapped column when multiple types are allowed. We
// get it via the metadata tables instead. There is no good way to know when a column's type is
// changed, so we skip that for now.
// TODO: Drop all this once the API can tell us column info.
class ColTypesFetcher {
  // Returns array of types for the array of colIds.
  static async getTypes(tableId, colIds) {
    const tables = await grist.docApi.fetchTable('_grist_Tables');
    const columns = await grist.docApi.fetchTable('_grist_Tables_column');
    const tableRef = tables.id[tables.tableId.indexOf(tableId)];
    return colIds.map(colId => {
      const index = columns.id.findIndex((id, i) => (columns.parentId[i] === tableRef && columns.colId[i] === colId));
      return columns.type[index];
    });
  }

  constructor() {
    this._tableId = null;
    this._colIds = null;
    this._colTypesPromise = Promise.resolve([null, null]);;
    this._accessLevel = 'full';
  }
  setAccessLevel(accessLevel) {
    this._accessLevel = accessLevel;
  }
  gotMappings(mappings) {
    // Can't fetch metadata when no full access.
    if (this._accessLevel !== 'full') { return; }
    if (!this._colIds || !(mappings.tsk1 === this._colIds[0] && mappings.tsk2 === this._colIds[1])) {
      this._colIds = [mappings.tsk1, mappings.tsk2];
      if (this._tableId) {
        this._colTypesPromise = ColTypesFetcher.getTypes(this._tableId, this._colIds);
      }
    }
  }
  gotNewMappings(tableId) {
    // Can't fetch metadata when no full access.
    if (this._accessLevel !== 'full') { return; }
    this._tableId = tableId;
    if (this._colIds) {
      this._colTypesPromise = ColTypesFetcher.getTypes(this._tableId, this._colIds);
    }
  }
  async getColTypes() {
    return this._colTypesPromise;
  }
}

const colTypesFetcher = new ColTypesFetcher();
