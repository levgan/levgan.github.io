var data1 = getTreeData2();

function initD3c() {

    // Specify the charts’ dimensions. The height is variable, depending on the layout.
    const width = 300;
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
    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

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
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .on("click", (event, d) => {
            d.children = d.children ? null : d._children;
            update(event, d);
            });

        nodeEnter.append("circle")
            .attr("r", 2.5)
            .attr("fill", d => d._children ? "#555" : "#999")
            .attr("stroke-width", 10);

        nodeEnter.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d._children ? -6 : 6)
            .attr("text-anchor", d => d._children ? "end" : "start")
            .text(d => d.data.name)
            .on("click", function(d) {
                // d3.event.stopPropagation();
                console.log(d.data.name);
              })
        .clone(true).lower()
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .attr("stroke", "white");

        // Transition nodes to their new position.
        const nodeUpdate = node.merge(nodeEnter).transition(transition)
            .attr("transform", d => `translate(${d.y},${d.x})`)
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
         {"name": "AgglomerativeCluster", "value": 3938},
         {"name": "CommunityStructure", "value": 3812},
         {"name": "HierarchicalCluster", "value": 6714},
         {"name": "MergeEdge", "value": 743}
        ]
       },
       {
        "name": "graph",
        "children": [
         {"name": "BetweennessCentrality", "value": 3534},
         {"name": "LinkDistance", "value": 5731},
         {"name": "MaxFlowMinCut", "value": 7840},
         {"name": "ShortestPaths", "value": 5914},
         {"name": "SpanningTree", "value": 3416}
        ]
       },
       {
        "name": "optimization",
        "children": [
         {"name": "AspectRatioBanker", "value": 7074}
        ]
       }
      ]
     },
     {
      "name": "animate",
      "children": [
       {"name": "Easing", "value": 17010},
       {"name": "FunctionSequence", "value": 5842},
       {
        "name": "interpolate",
        "children": [
         {"name": "ArrayInterpolator", "value": 1983},
         {"name": "ColorInterpolator", "value": 2047},
         {"name": "DateInterpolator", "value": 1375},
         {"name": "Interpolator", "value": 8746},
         {"name": "MatrixInterpolator", "value": 2202},
         {"name": "NumberInterpolator", "value": 1382},
         {"name": "ObjectInterpolator", "value": 1629},
         {"name": "PointInterpolator", "value": 1675},
         {"name": "RectangleInterpolator", "value": 2042}
        ]
       },
       {"name": "ISchedulable", "value": 1041},
       {"name": "Parallel", "value": 5176},
       {"name": "Pause", "value": 449},
       {"name": "Scheduler", "value": 5593},
       {"name": "Sequence", "value": 5534},
       {"name": "Transition", "value": 9201},
       {"name": "Transitioner", "value": 19975},
       {"name": "TransitionEvent", "value": 1116},
       {"name": "Tween", "value": 6006}
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
      "name": "analytics",
      "children": [
       {
        "name": "cluster",
        "children": [
         {"name": "AgglomerativeCluster", "value": 3938},
         {"name": "CommunityStructure", "value": 3812},
         {"name": "HierarchicalCluster", "value": 6714},
         {"name": "MergeEdge", "value": 743}
        ]
       },
       {
        "name": "graph",
        "children": [
         {"name": "BetweennessCentrality", "value": 3534},
         {"name": "LinkDistance", "value": 5731},
         {"name": "MaxFlowMinCut", "value": 7840},
         {"name": "ShortestPaths", "value": 5914},
         {"name": "SpanningTree", "value": 3416}
        ]
       },
       {
        "name": "optimization",
        "children": [
         {"name": "AspectRatioBanker", "value": 7074}
        ]
       }
      ]
     },
     {
      "name": "animate",
      "children": [
       {"name": "Easing", "value": 17010},
       {"name": "FunctionSequence", "value": 5842},
       {
        "name": "interpolate",
        "children": [
         {"name": "ArrayInterpolator", "value": 1983},
         {"name": "ColorInterpolator", "value": 2047},
         {"name": "DateInterpolator", "value": 1375},
         {"name": "Interpolator", "value": 8746},
         {"name": "MatrixInterpolator", "value": 2202},
         {"name": "NumberInterpolator", "value": 1382},
         {"name": "ObjectInterpolator", "value": 1629},
         {"name": "PointInterpolator", "value": 1675},
         {"name": "RectangleInterpolator", "value": 2042}
        ]
       },
       {"name": "ISchedulable", "value": 1041},
       {"name": "Parallel", "value": 5176},
       {"name": "Pause", "value": 449},
       {"name": "Scheduler", "value": 5593},
       {"name": "Sequence", "value": 5534},
       {"name": "Transition", "value": 9201},
       {"name": "Transitioner", "value": 19975},
       {"name": "TransitionEvent", "value": 1116},
       {"name": "Tween", "value": 6006}
      ]
     },
     {
      "name": "data",
      "children": [
       {
        "name": "converters",
        "children": [
         {"name": "Converters", "value": 721},
         {"name": "DelimitedTextConverter", "value": 4294},
         {"name": "GraphMLConverter", "value": 9800},
         {"name": "IDataConverter", "value": 1314},
         {"name": "JSONConverter", "value": 2220}
        ]
       },
       {"name": "DataField", "value": 1759},
       {"name": "DataSchema", "value": 2165},
       {"name": "DataSet", "value": 586},
       {"name": "DataSource", "value": 3331},
       {"name": "DataTable", "value": 772},
       {"name": "DataUtil", "value": 3322}
      ]
     },
     {
      "name": "display",
      "children": [
       {"name": "DirtySprite", "value": 8833},
       {"name": "LineSprite", "value": 1732},
       {"name": "RectSprite", "value": 3623},
       {"name": "TextSprite", "value": 10066}
      ]
     },
     {
      "name": "flex",
      "children": [
       {"name": "FlareVis", "value": 4116}
      ]
     },
     {
      "name": "physics",
      "children": [
       {"name": "DragForce", "value": 1082},
       {"name": "GravityForce", "value": 1336},
       {"name": "IForce", "value": 319},
       {"name": "NBodyForce", "value": 10498},
       {"name": "Particle", "value": 2822},
       {"name": "Simulation", "value": 9983},
       {"name": "Spring", "value": 2213},
       {"name": "SpringForce", "value": 1681}
      ]
     },
     {
      "name": "query",
      "children": [
       {"name": "AggregateExpression", "value": 1616},
       {"name": "And", "value": 1027},
       {"name": "Arithmetic", "value": 3891},
       {"name": "Average", "value": 891},
       {"name": "BinaryExpression", "value": 2893},
       {"name": "Comparison", "value": 5103},
       {"name": "CompositeExpression", "value": 3677},
       {"name": "Count", "value": 781},
       {"name": "DateUtil", "value": 4141},
       {"name": "Distinct", "value": 933},
       {"name": "Expression", "value": 5130},
       {"name": "ExpressionIterator", "value": 3617},
       {"name": "Fn", "value": 3240},
       {"name": "If", "value": 2732},
       {"name": "IsA", "value": 2039},
       {"name": "Literal", "value": 1214},
       {"name": "Match", "value": 3748},
       {"name": "Maximum", "value": 843},
       {
        "name": "methods",
        "children": [
         {"name": "add", "value": 593},
         {"name": "and", "value": 330},
         {"name": "average", "value": 287},
         {"name": "count", "value": 277},
         {"name": "distinct", "value": 292},
         {"name": "div", "value": 595},
         {"name": "eq", "value": 594},
         {"name": "fn", "value": 460},
         {"name": "gt", "value": 603},
         {"name": "gte", "value": 625},
         {"name": "iff", "value": 748},
         {"name": "isa", "value": 461},
         {"name": "lt", "value": 597},
         {"name": "lte", "value": 619},
         {"name": "max", "value": 283},
         {"name": "min", "value": 283},
         {"name": "mod", "value": 591},
         {"name": "mul", "value": 603},
         {"name": "neq", "value": 599},
         {"name": "not", "value": 386},
         {"name": "or", "value": 323},
         {"name": "orderby", "value": 307},
         {"name": "range", "value": 772},
         {"name": "select", "value": 296},
         {"name": "stddev", "value": 363},
         {"name": "sub", "value": 600},
         {"name": "sum", "value": 280},
         {"name": "update", "value": 307},
         {"name": "variance", "value": 335},
         {"name": "where", "value": 299},
         {"name": "xor", "value": 354},
         {"name": "_", "value": 264}
        ]
       },
       {"name": "Minimum", "value": 843},
       {"name": "Not", "value": 1554},
       {"name": "Or", "value": 970},
       {"name": "Query", "value": 13896},
       {"name": "Range", "value": 1594},
       {"name": "StringUtil", "value": 4130},
       {"name": "Sum", "value": 791},
       {"name": "Variable", "value": 1124},
       {"name": "Variance", "value": 1876},
       {"name": "Xor", "value": 1101}
      ]
     },
     {
      "name": "scale",
      "children": [
       {"name": "IScaleMap", "value": 2105},
       {"name": "LinearScale", "value": 1316},
       {"name": "LogScale", "value": 3151},
       {"name": "OrdinalScale", "value": 3770},
       {"name": "QuantileScale", "value": 2435},
       {"name": "QuantitativeScale", "value": 4839},
       {"name": "RootScale", "value": 1756},
       {"name": "Scale", "value": 4268},
       {"name": "ScaleType", "value": 1821},
       {"name": "TimeScale", "value": 5833}
      ]
     },
     {
      "name": "util",
      "children": [
       {"name": "Arrays", "value": 8258},
       {"name": "Colors", "value": 10001},
       {"name": "Dates", "value": 8217},
       {"name": "Displays", "value": 12555},
       {"name": "Filter", "value": 2324},
       {"name": "Geometry", "value": 10993},
       {
        "name": "heap",
        "children": [
         {"name": "FibonacciHeap", "value": 9354},
         {"name": "HeapNode", "value": 1233}
        ]
       },
       {"name": "IEvaluable", "value": 335},
       {"name": "IPredicate", "value": 383},
       {"name": "IValueProxy", "value": 874},
       {
        "name": "math",
        "children": [
         {"name": "DenseMatrix", "value": 3165},
         {"name": "IMatrix", "value": 2815},
         {"name": "SparseMatrix", "value": 3366}
        ]
       },
       {"name": "Maths", "value": 17705},
       {"name": "Orientation", "value": 1486},
       {
        "name": "palette",
        "children": [
         {"name": "ColorPalette", "value": 6367},
         {"name": "Palette", "value": 1229},
         {"name": "ShapePalette", "value": 2059},
         {"name": "SizePalette", "value": 2291}
        ]
       },
       {"name": "Property", "value": 5559},
       {"name": "Shapes", "value": 19118},
       {"name": "Sort", "value": 6887},
       {"name": "Stats", "value": 6557},
       {"name": "Strings", "value": 22026}
      ]
     },
     {
      "name": "vis",
      "children": [
       {
        "name": "axis",
        "children": [
         {"name": "Axes", "value": 1302},
         {"name": "Axis", "value": 24593},
         {"name": "AxisGridLine", "value": 652},
         {"name": "AxisLabel", "value": 636},
         {"name": "CartesianAxes", "value": 6703}
        ]
       },
       {
        "name": "controls",
        "children": [
         {"name": "AnchorControl", "value": 2138},
         {"name": "ClickControl", "value": 3824},
         {"name": "Control", "value": 1353},
         {"name": "ControlList", "value": 4665},
         {"name": "DragControl", "value": 2649},
         {"name": "ExpandControl", "value": 2832},
         {"name": "HoverControl", "value": 4896},
         {"name": "IControl", "value": 763},
         {"name": "PanZoomControl", "value": 5222},
         {"name": "SelectionControl", "value": 7862},
         {"name": "TooltipControl", "value": 8435}
        ]
       },
       {
        "name": "data",
        "children": [
         {"name": "Data", "value": 20544},
         {"name": "DataList", "value": 19788},
         {"name": "DataSprite", "value": 10349},
         {"name": "EdgeSprite", "value": 3301},
         {"name": "NodeSprite", "value": 19382},
         {
          "name": "render",
          "children": [
           {"name": "ArrowType", "value": 698},
           {"name": "EdgeRenderer", "value": 5569},
           {"name": "IRenderer", "value": 353},
           {"name": "ShapeRenderer", "value": 2247}
          ]
         },
         {"name": "ScaleBinding", "value": 11275},
         {"name": "Tree", "value": 7147},
         {"name": "TreeBuilder", "value": 9930}
        ]
       },
       {
        "name": "events",
        "children": [
         {"name": "DataEvent", "value": 2313},
         {"name": "SelectionEvent", "value": 1880},
         {"name": "TooltipEvent", "value": 1701},
         {"name": "VisualizationEvent", "value": 1117}
        ]
       },
       {
        "name": "legend",
        "children": [
         {"name": "Legend", "value": 20859},
         {"name": "LegendItem", "value": 4614},
         {"name": "LegendRange", "value": 10530}
        ]
       },
       {
        "name": "operator",
        "children": [
         {
          "name": "distortion",
          "children": [
           {"name": "BifocalDistortion", "value": 4461},
           {"name": "Distortion", "value": 6314},
           {"name": "FisheyeDistortion", "value": 3444}
          ]
         },
         {
          "name": "encoder",
          "children": [
           {"name": "ColorEncoder", "value": 3179},
           {"name": "Encoder", "value": 4060},
           {"name": "PropertyEncoder", "value": 4138},
           {"name": "ShapeEncoder", "value": 1690},
           {"name": "SizeEncoder", "value": 1830}
          ]
         },
         {
          "name": "filter",
          "children": [
           {"name": "FisheyeTreeFilter", "value": 5219},
           {"name": "GraphDistanceFilter", "value": 3165},
           {"name": "VisibilityFilter", "value": 3509}
          ]
         },
         {"name": "IOperator", "value": 1286},
         {
          "name": "label",
          "children": [
           {"name": "Labeler", "value": 9956},
           {"name": "RadialLabeler", "value": 3899},
           {"name": "StackedAreaLabeler", "value": 3202}
          ]
         },
         {
          "name": "layout",
          "children": [
           {"name": "AxisLayout", "value": 6725},
           {"name": "BundledEdgeRouter", "value": 3727},
           {"name": "CircleLayout", "value": 9317},
           {"name": "CirclePackingLayout", "value": 12003},
           {"name": "DendrogramLayout", "value": 4853},
           {"name": "ForceDirectedLayout", "value": 8411},
           {"name": "IcicleTreeLayout", "value": 4864},
           {"name": "IndentedTreeLayout", "value": 3174},
           {"name": "Layout", "value": 7881},
           {"name": "NodeLinkTreeLayout", "value": 12870},
           {"name": "PieLayout", "value": 2728},
           {"name": "RadialTreeLayout", "value": 12348},
           {"name": "RandomLayout", "value": 870},
           {"name": "StackedAreaLayout", "value": 9121},
           {"name": "TreeMapLayout", "value": 9191}
          ]
         },
         {"name": "Operator", "value": 2490},
         {"name": "OperatorList", "value": 5248},
         {"name": "OperatorSequence", "value": 4190},
         {"name": "OperatorSwitch", "value": 2581},
         {"name": "SortOperator", "value": 2023}
        ]
       },
       {"name": "Visualization", "value": 16540}
      ]
     }
    ]
   };
}