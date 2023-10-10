var data1 = getTreeData1();
var data2 = getTreeData2();
var data3 = getTreeData3();
var data4 = getTreeData4();

async function updConfig (d) {
    const table2 = await grist.getTable();
    // console.log("******current table id: " + await table2.getTableId());
    // console.log("******TABLE:....");
    // console.log(table2);
    const table = await grist.getTable('Z_config');
    // console.log("******table id: " + await table.getTableId())
    const id1 = (d.length >= 5) ? 1 : 3;
    // console.log(`********d length ${d.length} id1 ${id1}`);
    const  selID =  { id: 1, "fields":{"id1":id1,"B":d,"C":d+" hello"}};
    // console.log("******selID: " + selID);
    await table.update(selID);
    // console.log("******after update");
}


function initD3c() {

    // Specify the charts’ dimensions. The height is variable, depending on the layout.
    const width = 350;
    const widthper = "100%";
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 40;

    // Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
    // (dx is a height, and dy a width). This because the tree must be viewed with the root at the
    // “bottom”, in the data domain. The width of a column is based on the tree’s height.
    const root = d3.hierarchy(data1);
    const dx = 10;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);

    // Define the tree layout and the shape for links.
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3.linkHorizontal().x(d => d.y/2).y(d => d.x);

    // Create the SVG container, a layer for the links and a layer for the nodes.
    const svg = d3.create("svg")
        .attr("width", widthper)
        .attr("height", dx)
        .attr("viewBox", [-marginLeft, -marginTop, width, dx])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    function update(event, source) {
        const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
        const nodes = root.descendants().reverse();
        const links = root.links();

        // Compute the new tree layout.
        tree(root);

        let left = root;
        let right = root;
        root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        });

        const height = right.x - left.x + marginTop + marginBottom;

        const transition = svg.transition()
            .duration(duration)
            .attr("height", height)
            .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
            .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

        // Update the nodes…
        const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node.enter().append("g")
            .attr("transform", d => `translate(${source.y0/2},${source.x0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .on("click", (event, d) => {
                d.children = d.children ? null : d._children;
                // console.log(d.data.name)
                update(event, d);
            });

        nodeEnter.append("circle")
            .attr("r", 2.5)
            .attr("fill", d => d._children ? "#555" : "#999")
            .attr("stroke-width", 10);

        nodeEnter.append("text")
            .attr("dy", "0.25em")
            .attr("x", d => d._children ? -6 : 6)
            .attr("text-anchor", d => d._children ? "end" : "start")
            .on("click", function (event, d) { 
                event.stopPropagation();
                //.lg. updconfig to set record on table that is linkable with selectby since custom widgets don't seem to be
                // console.log(d.data.name);
                updConfig(d.data.name);
            })
            // .on("click", function(d) {
            //     // d3.event.stopPropagation();
            //     console.log(d.data); 
            //   })
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .attr("stroke", "white");

        // Transition nodes to their new position.
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
            .attr("transform", d => `translate(${d.y/2},${d.x})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node.exit().transition(transition).remove()
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append("path")
            .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition(transition).remove()
            .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
            });

        // Stash the old positions for transition.
        root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
        });
    }

    // Do the first update to the initial configuration of the tree — where a number of nodes
    // are open (arbitrarily selected as the root, plus nodes with 7 letters).
    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    update(null, root);

    return svg.node();
}

function initD3b() {
    const format = d3.format(",");
    const nodeSize = 25;
    const root = d3.hierarchy(data1).eachBefore((i => d => d.index = i++)(0));
    const nodes = root.descendants();
    const width = 100;
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
  



function getTreeData1() {
    return  {
    "name": "flare",
    "children": [
     {
      "name": "analytics",
      "children": [
       {
        "name": "cluster",
        "children": [
         {"name": "AgglomerativeCluster", "id": 3938},
         {"name": "CommunityStructure", "id": 3812},
         {"name": "HierarchicalCluster", "id": 6714},
         {"name": "MergeEdge", "id": 743}
        ]
       },
       {
        "name": "graph",
        "children": [
         {"name": "BetweennessCentrality", "id": 3534},
         {"name": "LinkDistance", "id": 5731},
         {"name": "MaxFlowMinCut", "id": 7840},
         {"name": "ShortestPaths", "id": 5914},
         {"name": "SpanningTree", "id": 3416}
        ]
       },
       {
        "name": "optimization",
        "children": [
         {"name": "AspectRatioBanker", "id": 7074}
        ]
       }
      ]
     },
     {
      "name": "animate",
      "children": [
       {"name": "Easing", "id": 17010},
       {"name": "FunctionSequence", "id": 5842},
       {
        "name": "interpolate",
        "children": [
         {"name": "ArrayInterpolator", "id": 1983},
         {"name": "ColorInterpolator", "id": 2047},
         {"name": "DateInterpolator", "id": 1375},
         {"name": "Interpolator", "id": 8746},
         {"name": "MatrixInterpolator", "id": 2202},
         {"name": "NumberInterpolator", "id": 1382},
         {"name": "ObjectInterpolator", "id": 1629},
         {"name": "PointInterpolator", "id": 1675},
         {"name": "RectangleInterpolator", "id": 2042}
        ]
       },
       {"name": "ISchedulable", "id": 1041},
       {"name": "Parallel", "id": 5176},
       {"name": "Pause", "id": 449},
       {"name": "Scheduler", "id": 5593},
       {"name": "Sequence", "id": 5534},
       {"name": "Transition", "id": 9201},
       {"name": "Transitioner", "id": 19975},
       {"name": "TransitionEvent", "id": 1116},
       {"name": "Tween", "id": 6006}
      ]
     }
    ]
   };
}

function getTreeData2() {
    return {
    "name": "flare",
    "children": [
     {
      "name": "analytics", id: 22,
      "children": [
       {
        "name": "cluster",
        "children": [
         {"name": "AgglomerativeCluster", "id": 3938},
         {"name": "CommunityStructure", "id": 3812},
         {"name": "HierarchicalCluster", "id": 6714},
         {"name": "MergeEdge", "id": 743}
        ]
       },
       {
        "name": "graph",
        "children": [
         {"name": "BetweennessCentrality", "id": 3534},
         {"name": "LinkDistance", "id": 5731},
         {"name": "MaxFlowMinCut", "id": 7840},
         {"name": "ShortestPaths", "id": 5914},
         {"name": "SpanningTree", "id": 3416}
        ]
       },
       {
        "name": "optimization",
        "children": [
         {"name": "AspectRatioBanker", "id": 7074}
        ]
       }
      ]
     },
     {
      "name": "animate",
      "children": [
       {"name": "Easing", "id": 17010},
       {"name": "FunctionSequence", "id": 5842},
       {
        "name": "interpolate",
        "children": [
         {"name": "ArrayInterpolator", "id": 1983},
         {"name": "ColorInterpolator", "id": 2047},
         {"name": "DateInterpolator", "id": 1375},
         {"name": "Interpolator", "id": 8746},
         {"name": "MatrixInterpolator", "id": 2202},
         {"name": "NumberInterpolator", "id": 1382},
         {"name": "ObjectInterpolator", "id": 1629},
         {"name": "PointInterpolator", "id": 1675},
         {"name": "RectangleInterpolator", "id": 2042}
        ]
       },
       {"name": "ISchedulable", "id": 1041},
       {"name": "Parallel", "id": 5176},
       {"name": "Pause", "id": 449},
       {"name": "Scheduler", "id": 5593},
       {"name": "Sequence", "id": 5534},
       {"name": "Transition", "id": 9201},
       {"name": "Transitioner", "id": 19975},
       {"name": "TransitionEvent", "id": 1116},
       {"name": "Tween", "id": 6006}
      ]
     },
     {
      "name": "data",
      "children": [
       {
        "name": "converters",
        "children": [
         {"name": "Converters", "id": 721},
         {"name": "DelimitedTextConverter", "id": 4294},
         {"name": "GraphMLConverter", "id": 9800},
         {"name": "IDataConverter", "id": 1314},
         {"name": "JSONConverter", "id": 2220}
        ]
       },
       {"name": "DataField", "id": 1759},
       {"name": "DataSchema", "id": 2165},
       {"name": "DataSet", "id": 586},
       {"name": "DataSource", "id": 3331},
       {"name": "DataTable", "id": 772},
       {"name": "DataUtil", "id": 3322}
      ]
     },
     {
      "name": "display",
      "children": [
       {"name": "DirtySprite", "id": 8833},
       {"name": "LineSprite", "id": 1732},
       {"name": "RectSprite", "id": 3623},
       {"name": "TextSprite", "id": 10066}
      ]
     },
     {
      "name": "flex",
      "children": [
       {"name": "FlareVis", "id": 4116}
      ]
     },
     {
      "name": "physics",
      "children": [
       {"name": "DragForce", "id": 1082},
       {"name": "GravityForce", "id": 1336},
       {"name": "IForce", "id": 319},
       {"name": "NBodyForce", "id": 10498},
       {"name": "Particle", "id": 2822},
       {"name": "Simulation", "id": 9983},
       {"name": "Spring", "id": 2213},
       {"name": "SpringForce", "id": 1681}
      ]
     },
     {
      "name": "query",
      "children": [
       {"name": "AggregateExpression", "id": 1616},
       {"name": "And", "id": 1027},
       {"name": "Arithmetic", "id": 3891},
       {"name": "Average", "id": 891},
       {"name": "BinaryExpression", "id": 2893},
       {"name": "Comparison", "id": 5103},
       {"name": "CompositeExpression", "id": 3677},
       {"name": "Count", "id": 781},
       {"name": "DateUtil", "id": 4141},
       {"name": "Distinct", "id": 933},
       {"name": "Expression", "id": 5130},
       {"name": "ExpressionIterator", "id": 3617},
       {"name": "Fn", "id": 3240},
       {"name": "If", "id": 2732},
       {"name": "IsA", "id": 2039},
       {"name": "Literal", "id": 1214},
       {"name": "Match", "id": 3748},
       {"name": "Maximum", "id": 843},
       {
        "name": "methods",
        "children": [
         {"name": "add", "id": 593},
         {"name": "and", "id": 330},
         {"name": "average", "id": 287},
         {"name": "count", "id": 277},
         {"name": "distinct", "id": 292},
         {"name": "div", "id": 595},
         {"name": "eq", "id": 594},
         {"name": "fn", "id": 460},
         {"name": "gt", "id": 603},
         {"name": "gte", "id": 625},
         {"name": "iff", "id": 748},
         {"name": "isa", "id": 461},
         {"name": "lt", "id": 597},
         {"name": "lte", "id": 619},
         {"name": "max", "id": 283},
         {"name": "min", "id": 283},
         {"name": "mod", "id": 591},
         {"name": "mul", "id": 603},
         {"name": "neq", "id": 599},
         {"name": "not", "id": 386},
         {"name": "or", "id": 323},
         {"name": "orderby", "id": 307},
         {"name": "range", "id": 772},
         {"name": "select", "id": 296},
         {"name": "stddev", "id": 363},
         {"name": "sub", "id": 600},
         {"name": "sum", "id": 280},
         {"name": "update", "id": 307},
         {"name": "variance", "id": 335},
         {"name": "where", "id": 299},
         {"name": "xor", "id": 354},
         {"name": "_", "id": 264}
        ]
       },
       {"name": "Minimum", "id": 843},
       {"name": "Not", "id": 1554},
       {"name": "Or", "id": 970},
       {"name": "Query", "id": 13896},
       {"name": "Range", "id": 1594},
       {"name": "StringUtil", "id": 4130},
       {"name": "Sum", "id": 791},
       {"name": "Variable", "id": 1124},
       {"name": "Variance", "id": 1876},
       {"name": "Xor", "id": 1101}
      ]
     },
     {
      "name": "scale",
      "children": [
       {"name": "IScaleMap", "id": 2105},
       {"name": "LinearScale", "id": 1316},
       {"name": "LogScale", "id": 3151},
       {"name": "OrdinalScale", "id": 3770},
       {"name": "QuantileScale", "id": 2435},
       {"name": "QuantitativeScale", "id": 4839},
       {"name": "RootScale", "id": 1756},
       {"name": "Scale", "id": 4268},
       {"name": "ScaleType", "id": 1821},
       {"name": "TimeScale", "id": 5833}
      ]
     },
     {
      "name": "util",
      "children": [
       {"name": "Arrays", "id": 8258},
       {"name": "Colors", "id": 10001},
       {"name": "Dates", "id": 8217},
       {"name": "Displays", "id": 12555},
       {"name": "Filter", "id": 2324},
       {"name": "Geometry", "id": 10993},
       {
        "name": "heap",
        "children": [
         {"name": "FibonacciHeap", "id": 9354},
         {"name": "HeapNode", "id": 1233}
        ]
       },
       {"name": "IEvaluable", "id": 335},
       {"name": "IPredicate", "id": 383},
       {"name": "IValueProxy", "id": 874},
       {
        "name": "math",
        "children": [
         {"name": "DenseMatrix", "id": 3165},
         {"name": "IMatrix", "id": 2815},
         {"name": "SparseMatrix", "id": 3366}
        ]
       },
       {"name": "Maths", "id": 17705},
       {"name": "Orientation", "id": 1486},
       {
        "name": "palette",
        "children": [
         {"name": "ColorPalette", "id": 6367},
         {"name": "Palette", "id": 1229},
         {"name": "ShapePalette", "id": 2059},
         {"name": "SizePalette", "id": 2291}
        ]
       },
       {"name": "Property", "id": 5559},
       {"name": "Shapes", "id": 19118},
       {"name": "Sort", "id": 6887},
       {"name": "Stats", "id": 6557},
       {"name": "Strings", "id": 22026}
      ]
     },
     {
      "name": "vis",
      "children": [
       {
        "name": "axis",
        "children": [
         {"name": "Axes", "id": 1302},
         {"name": "Axis", "id": 24593},
         {"name": "AxisGridLine", "id": 652},
         {"name": "AxisLabel", "id": 636},
         {"name": "CartesianAxes", "id": 6703}
        ]
       },
       {
        "name": "controls",
        "children": [
         {"name": "AnchorControl", "id": 2138},
         {"name": "ClickControl", "id": 3824},
         {"name": "Control", "id": 1353},
         {"name": "ControlList", "id": 4665},
         {"name": "DragControl", "id": 2649},
         {"name": "ExpandControl", "id": 2832},
         {"name": "HoverControl", "id": 4896},
         {"name": "IControl", "id": 763},
         {"name": "PanZoomControl", "id": 5222},
         {"name": "SelectionControl", "id": 7862},
         {"name": "TooltipControl", "id": 8435}
        ]
       },
       {
        "name": "data",
        "children": [
         {"name": "Data", "id": 20544},
         {"name": "DataList", "id": 19788},
         {"name": "DataSprite", "id": 10349},
         {"name": "EdgeSprite", "id": 3301},
         {"name": "NodeSprite", "id": 19382},
         {
          "name": "render",
          "children": [
           {"name": "ArrowType", "id": 698},
           {"name": "EdgeRenderer", "id": 5569},
           {"name": "IRenderer", "id": 353},
           {"name": "ShapeRenderer", "id": 2247}
          ]
         },
         {"name": "ScaleBinding", "id": 11275},
         {"name": "Tree", "id": 7147},
         {"name": "TreeBuilder", "id": 9930}
        ]
       },
       {
        "name": "events",
        "children": [
         {"name": "DataEvent", "id": 2313},
         {"name": "SelectionEvent", "id": 1880},
         {"name": "TooltipEvent", "id": 1701},
         {"name": "VisualizationEvent", "id": 1117}
        ]
       },
       {
        "name": "legend",
        "children": [
         {"name": "Legend", "id": 20859},
         {"name": "LegendItem", "id": 4614},
         {"name": "LegendRange", "id": 10530}
        ]
       },
       {
        "name": "operator",
        "children": [
         {
          "name": "distortion",
          "children": [
           {"name": "BifocalDistortion", "id": 4461},
           {"name": "Distortion", "id": 6314},
           {"name": "FisheyeDistortion", "id": 3444}
          ]
         },
         {
          "name": "encoder",
          "children": [
           {"name": "ColorEncoder", "id": 3179},
           {"name": "Encoder", "id": 4060},
           {"name": "PropertyEncoder", "id": 4138},
           {"name": "ShapeEncoder", "id": 1690},
           {"name": "SizeEncoder", "id": 1830}
          ]
         },
         {
          "name": "filter",
          "children": [
           {"name": "FisheyeTreeFilter", "id": 5219},
           {"name": "GraphDistanceFilter", "id": 3165},
           {"name": "VisibilityFilter", "id": 3509}
          ]
         },
         {"name": "IOperator", "id": 1286},
         {
          "name": "label",
          "children": [
           {"name": "Labeler", "id": 9956},
           {"name": "RadialLabeler", "id": 3899},
           {"name": "StackedAreaLabeler", "id": 3202}
          ]
         },
         {
          "name": "layout",
          "children": [
           {"name": "AxisLayout", "id": 6725},
           {"name": "BundledEdgeRouter", "id": 3727},
           {"name": "CircleLayout", "id": 9317},
           {"name": "CirclePackingLayout", "id": 12003},
           {"name": "DendrogramLayout", "id": 4853},
           {"name": "ForceDirectedLayout", "id": 8411},
           {"name": "IcicleTreeLayout", "id": 4864},
           {"name": "IndentedTreeLayout", "id": 3174},
           {"name": "Layout", "id": 7881},
           {"name": "NodeLinkTreeLayout", "id": 12870},
           {"name": "PieLayout", "id": 2728},
           {"name": "RadialTreeLayout", "id": 12348},
           {"name": "RandomLayout", "id": 870},
           {"name": "StackedAreaLayout", "id": 9121},
           {"name": "TreeMapLayout", "id": 9191}
          ]
         },
         {"name": "Operator", "id": 2490},
         {"name": "OperatorList", "id": 5248},
         {"name": "OperatorSequence", "id": 4190},
         {"name": "OperatorSwitch", "id": 2581},
         {"name": "SortOperator", "id": 2023}
        ]
       },
       {"name": "Visualization", "id": 16540}
      ]
     }
    ]
   };
}

function getTreeData3() {
    return {
        name: "flare",
        children: [
            { name: 'fruits', children: [
                { name: 'apples', children: [] },
                { name: 'oranges', children: [
                    { name: 'tangerines', children: [] },
                    { name: 'mandarins', children: [] },
                    { name: 'pomelo', children: [] },
                    { name: 'blood orange', children: [] },
                ] }
            ]},
            { name: 'vegetables', children: [
                { name: 'brocolli', children: [] },
            ] },
            { "name": "analytics",
                "children": [
                 {
                  "name": "cluster",
                  "children": [
                   {"name": "AgglomerativeCluster", "id": 3938, children: [] },
                   {"name": "CommunityStructure", "id": 3812, children: [] },
                   {"name": "HierarchicalCluster", "id": 6714, children: [] },
                   {"name": "MergeEdge", "id": 743, children: [] }
                  ]
                 },
                 {
                  "name": "graph",
                  "children": [
                   {"name": "BetweennessCentrality", "id": 3534, children: [] },
                   {"name": "LinkDistance", "id": 5731, children: [] },
                   {"name": "MaxFlowMinCut", "id": 7840, children: [] },
                   {"name": "ShortestPaths", "id": 5914, children: [] },
                   {"name": "SpanningTree", "id": 3416, children: [] }
                  ]
                 },
                 {
                  "name": "optimization",
                  "children": [
                   {"name": "AspectRatioBanker", "id": 7074, children: [] }
                  ]
                 }
                ]
            },
        ]
    };
}

function getTreeData4b () {
    return {"name": "flare", "children": [
        {"name": "one",  "id": "135"},
        {"name": "tzedakah",  "id": "1"},
        {"name": "maaser",  "id": "2"},
        {"name": "tzedakah streams",  "id": "3"},
        {"name": "Deposit chks",  "id": "4"},
        {"name": "misc",  "id": "5"},
        {"name": "exercise",  "id": "7"},
        {"name": "3 men tehillim",  "id": "8"},
        {"name": "ma scan docs",  "id": "9"},
        {"name": "review",  "id": "10"},
        {"name": "Sefarim",  "id": "13"},
        {"name": "Alex Galvez",  "id": "14"},
        {"name": "Rebbe Nachman stories for Shabbos",  "id": "15"},
        {"name": "pullup bar",  "id": "16"},
        {"name": "adl",  "id": "18"},
        {"name": "purpose",  "id": "19"},
        {"name": "nonprof or llc",  "id": "22"},
        {"name": "autosuggestion",  "id": "23"},
        {"name": "wishlist",  "id": "24"},
        {"name": "GMR",  "id": "25"},
        {"name": "simcha",  "id": "26"},
        {"name": "project definition",  "id": "27"},
        {"name": "pray",  "id": "28"},
        {"name": "tehillim",  "id": "29"},
        {"name": "wash",  "id": "30"},
        {"name": "prep food",  "id": "31"},
        {"name": "eat",  "id": "32"},
        {"name": "check tefillin",  "id": "34"},
        {"name": "review notes",  "id": "35"},
        {"name": "review todos / nexts",  "id": "36"},
        {"name": "check mezuzot",  "id": "38"},
        {"name": "get sefarim",  "id": "39"},
        {"name": "Naomi",  "id": "41"},
        {"name": "team - my people",  "id": "43"},
        {"name": "Joshua L",  "id": "45"},
        {"name": "Marc D",  "id": "46"},
        {"name": "Aviva",  "id": "47"},
        {"name": "Chanita",  "id": "48"},
        {"name": "Joe T",  "id": "49"},
        {"name": "Joe T. - finders fee (how to link ppl other items w tsks)",  "id": "50"},
        {"name": "Malkie Zakarin",  "id": "51"},
        {"name": "Malkie Zakarin - return stuff",  "id": "52"},
        {"name": "Ali",  "id": "53"},
        {"name": "Tzippy Miller (Zakarin)",  "id": "54"},
        {"name": "Ali - meet",  "id": "55"},
        {"name": "Tzippy Z - Shabbosim",  "id": "56"},
        {"name": "Yehuda Pfeifer",  "id": "57"},
        {"name": "Dana",  "id": "58"},
        {"name": "read up",  "id": "59"},
        {"name": "ask Aviva",  "id": "60"},
        {"name": "ask Chanie chks",  "id": "61"},
        {"name": "Chanie",  "id": "62"},
        {"name": "Ma",  "id": "63"},
        {"name": "Ta",  "id": "64"},
        {"name": "Yisroel",  "id": "65"},
        {"name": "recordings",  "id": "66"},
        {"name": "cover radiators",  "id": "67"},
        {"name": "return kindle case",  "id": "68"},
        {"name": "sneakers",  "id": "69"},
        {"name": "glasses",  "id": "70"},
        {"name": "pants",  "id": "71"},
        {"name": "order/make new kindle case",  "id": "72"},
        {"name": "air filters / diy filter box",  "id": "73"},
        {"name": "vitamins",  "id": "74"},
        {"name": "oil change",  "id": "75"},
        {"name": "auto sensors",  "id": "76"},
        {"name": "dr. grunseid appts",  "id": "77"},
        {"name": "Dr. Grunseid",  "id": "78"},
        {"name": "deposit chks",  "id": "79"},
        {"name": "laundry",  "id": "80"},
        {"name": "util bills",  "id": "81"},
        {"name": "chase cc",  "id": "82"},
        {"name": "prep front rooms",  "id": "83"},
        {"name": "file away papers",  "id": "84"},
        {"name": "grist team version",  "id": "85"},
        {"name": "account on office",  "id": "86"},
        {"name": "contact yp",  "id": "87"},
        {"name": "go through list",  "id": "88"},
        {"name": "gmr finalize cpr so to speak",  "id": "89"},
        {"name": "connect with vba",  "id": "90"},
        {"name": "plan for week",  "id": "91"},
        {"name": "billed biweekly",  "id": "92"},
        {"name": "team call 1st 3rd mondays",  "id": "93"},
        {"name": "tsa pre",  "id": "94"},
        {"name": "grist tab between widgets and other shortcut keys",  "id": "95"},
        {"name": "priority pass",  "id": "96"},
        {"name": "car ins",  "id": "97"},
        {"name": "health ins",  "id": "98"},
        {"name": "car inspect",  "id": "99"},
        {"name": "car register",  "id": "100"},
        {"name": "wifi ma",  "id": "101"},
        {"name": "wifi me",  "id": "102"},
        {"name": "bills ma",  "id": "103"},
        {"name": "bills me",  "id": "104"},
        {"name": "ma points",  "id": "105"},
        {"name": "review emails",  "id": "106"},
        {"name": "review urls / bookmarks",  "id": "107"},
        {"name": "microcenter",  "id": "109"},
        {"name": "tehillim atmospheric",  "id": "110"},
        {"name": "stupid jokes happy lehios bsimcha",  "id": "111"},
        {"name": "meme quote of the day",  "id": "112"},
        {"name": "airtable",  "id": "113"},
        {"name": "call sofer",  "id": "116"},
        {"name": "mishlei",  "id": "117"},
        {"name": "kovetz tefilot",  "id": "118"},
        {"name": "blackout shades",  "id": "119"},
        {"name": "takedown walls",  "id": "120"},
        {"name": "global known traveler id",  "id": "121"},
        {"name": "cc bill",  "id": "122"},
        {"name": "electric bill",  "id": "123"},
        {"name": "rent",  "id": "124"},
        {"name": "obsidian",  "id": "125"},
        {"name": "inotes",  "id": "126"},
        {"name": "weights",  "id": "127"},
        {"name": "calisthenics",  "id": "128"},
        {"name": "yoga",  "id": "129"},
        {"name": "stretch",  "id": "130"},
        {"name": "aerobic",  "id": "131"},
        {"name": "230918-Todo",  "id": "132"},
        {"name": "Insights",  "id": "133"},
        {"name": "misc notes",  "id": "134"},
        {"name": "people",  "id": "136"},
        {"name": "notes",  "id": "137"},
        {"name": "notes test",  "id": "138"}
    ]}
}

function getTreeData4 () {
    return {"name":"flare","children":[{"name": "one",  "id": "135"},{"name": "tzedakah",  "id": "1"},{"name": "maaser",  "id": "2"},{"name": "tzedakah streams",  "id": "3"},{"name": "Deposit chks",  "id": "4"},{"name": "misc",  "id": "5"},{"name": "exercise",  "id": "7"},{"name": "3 men tehillim",  "id": "8"},{"name": "ma scan docs",  "id": "9"},{"name": "review",  "id": "10"},{"name": "Sefarim",  "id": "13"},{"name": "Alex Galvez",  "id": "14"},{"name": "Rebbe Nachman stories for Shabbos",  "id": "15"},{"name": "pullup bar",  "id": "16"},{"name": "adl",  "id": "18"},{"name": "purpose",  "id": "19"},{"name": "nonprof or llc",  "id": "22"},{"name": "autosuggestion",  "id": "23"},{"name": "wishlist",  "id": "24"},{"name": "GMR",  "id": "25"},{"name": "simcha",  "id": "26"},{"name": "project definition",  "id": "27"},{"name": "pray",  "id": "28"},{"name": "tehillim",  "id": "29"},{"name": "wash",  "id": "30"},{"name": "prep food",  "id": "31"},{"name": "eat",  "id": "32"},{"name": "check tefillin",  "id": "34"},{"name": "review notes",  "id": "35"},{"name": "review todos / nexts",  "id": "36"},{"name": "check mezuzot",  "id": "38"},{"name": "get sefarim",  "id": "39"},{"name": "Naomi",  "id": "41"},{"name": "team - my people",  "id": "43"},{"name": "Joshua L",  "id": "45"},{"name": "Marc D",  "id": "46"},{"name": "Aviva",  "id": "47"},{"name": "Chanita",  "id": "48"},{"name": "Joe T",  "id": "49"},{"name": "Joe T. - finders fee (how to link ppl other items w tsks)",  "id": "50"},{"name": "Malkie Zakarin",  "id": "51"},{"name": "Malkie Zakarin - return stuff",  "id": "52"},{"name": "Ali",  "id": "53"},{"name": "Tzippy Miller (Zakarin)",  "id": "54"},{"name": "Ali - meet",  "id": "55"},{"name": "Tzippy Z - Shabbosim",  "id": "56"},{"name": "Yehuda Pfeifer",  "id": "57"},{"name": "Dana",  "id": "58"},{"name": "read up",  "id": "59"},{"name": "ask Aviva",  "id": "60"},{"name": "ask Chanie chks",  "id": "61"},{"name": "Chanie",  "id": "62"},{"name": "Ma",  "id": "63"},{"name": "Ta",  "id": "64"},{"name": "Yisroel",  "id": "65"},{"name": "recordings",  "id": "66"},{"name": "cover radiators",  "id": "67"},{"name": "return kindle case",  "id": "68"},{"name": "sneakers",  "id": "69"},{"name": "glasses",  "id": "70"},{"name": "pants",  "id": "71"},{"name": "order/make new kindle case",  "id": "72"},{"name": "air filters / diy filter box",  "id": "73"},{"name": "vitamins",  "id": "74"},{"name": "oil change",  "id": "75"},{"name": "auto sensors",  "id": "76"},{"name": "dr. grunseid appts",  "id": "77"},{"name": "Dr. Grunseid",  "id": "78"},{"name": "deposit chks",  "id": "79"},{"name": "laundry",  "id": "80"},{"name": "util bills",  "id": "81"},{"name": "chase cc",  "id": "82"},{"name": "prep front rooms",  "id": "83"},{"name": "file away papers",  "id": "84"},{"name": "grist team version",  "id": "85"},{"name": "account on office",  "id": "86"},{"name": "contact yp",  "id": "87"},{"name": "go through list",  "id": "88"},{"name": "gmr finalize cpr so to speak",  "id": "89"},{"name": "connect with vba",  "id": "90"},{"name": "plan for week",  "id": "91"},{"name": "billed biweekly",  "id": "92"},{"name": "team call 1st 3rd mondays",  "id": "93"},{"name": "tsa pre",  "id": "94"},{"name": "grist tab between widgets and other shortcut keys",  "id": "95"},{"name": "priority pass",  "id": "96"},{"name": "car ins",  "id": "97"},{"name": "health ins",  "id": "98"},{"name": "car inspect",  "id": "99"},{"name": "car register",  "id": "100"},{"name": "wifi ma",  "id": "101"},{"name": "wifi me",  "id": "102"},{"name": "bills ma",  "id": "103"},{"name": "bills me",  "id": "104"},{"name": "ma points",  "id": "105"},{"name": "review emails",  "id": "106"},{"name": "review urls / bookmarks",  "id": "107"},{"name": "microcenter",  "id": "109"},{"name": "tehillim atmospheric",  "id": "110"},{"name": "stupid jokes happy lehios bsimcha",  "id": "111"},{"name": "meme quote of the day",  "id": "112"},{"name": "airtable",  "id": "113"},{"name": "call sofer",  "id": "116"},{"name": "mishlei",  "id": "117"},{"name": "kovetz tefilot",  "id": "118"},{"name": "blackout shades",  "id": "119"},{"name": "takedown walls",  "id": "120"},{"name": "global known traveler id",  "id": "121"},{"name": "cc bill",  "id": "122"},{"name": "electric bill",  "id": "123"},{"name": "rent",  "id": "124"},{"name": "obsidian",  "id": "125"},{"name": "inotes",  "id": "126"},{"name": "weights",  "id": "127"},{"name": "calisthenics",  "id": "128"},{"name": "yoga",  "id": "129"},{"name": "stretch",  "id": "130"},{"name": "aerobic",  "id": "131"},{"name": "230918-Todo",  "id": "132"},{"name": "Insights",  "id": "133"},{"name": "misc notes",  "id": "134"},{"name": "people",  "id": "136"},{"name": "notes",  "id": "137"},{"name": "notes test",  "id": "138"}]}
}