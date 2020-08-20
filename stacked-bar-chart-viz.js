function stackedBarChartViz(option) {
  const operationMeasures = ["sum", "avg", "count"];
  const paletteFills = ["full", "single", "pattern"];
  const positionLegends = ["top", "bottom", "none"];
  const sortOrders = ["atoz", "ztoa"];
  // Verify options
  if (!operationMeasures.includes(option.operationMeasure)) {
    throw Error("Calc can only be sum, avg, or count.");
  }
  if (!paletteFills.includes(option.paletteFill)) {
    throw Error("Fill can only be full, single, or pattern.");
  }
  if (!positionLegends.includes(option.positionLegend)) {
    throw Error("Legend can only be top or bottom.");
  }
  if (!sortOrders.includes(option.sort)) {
    throw Error("Sort can only be atoz or ztoa.");
  }

  // Colors
  const colors = {
    full_0: [
      "#a4517b",
      "#d75a3b",
      "#FABC3C",
      "#fffad9",
      "#4cb8d5",
      "#7BC950",
      "#2C4251",
      "#007693",
      "#3A5A40",
      "#a4517b",
      "#d75a3b",
      "#FABC3C",
      "#fffad9",
      "#4cb8d5",
      "#7BC950",
      "#2C4251",
      "#007693",
      "#3A5A40",
    ],
    full_1: [
      "#C992AD",
      "#E79B88",
      "#FDE3AF",
      "#FCD588",
      "#BCE5F0",
      "#ACDD92",
      "#95B2C6",
      "#85E7FF",
      "#B4CFB9",
      "#C992AD",
      "#E79B88",
      "#FDE3AF",
      "#FCD588",
      "#BCE5F0",
      "#ACDD92",
      "#95B2C6",
      "#85E7FF",
      "#B4CFB9",
    ],
    single_0: [
      "#e5f4f7",
      "#b0dfe8",
      "#7bc9d8",
      "#46b4c9",
      "#119eb9",
      "#0d8ca7",
      "#097996",
      "#046784",
      "#005472",
    ],
    single_1: [
      "#FDECC3",
      "#FBD374",
      "#F9C64D",
      "#F9B924",
      "#EFA906",
      "#DB9B06",
      "#B37F05",
      "#8B6304",
      "#624604",
    ],
    pattern_0: [
      "pattern-fill-0-0",
      "pattern-fill-0-1",
      "pattern-fill-0-2",
      "pattern-fill-0-3",
      "pattern-fill-0-4",
      "pattern-fill-0-5",
      "pattern-fill-0-6",
    ],
    pattern_1: [
      "pattern-fill-1-0",
      "pattern-fill-1-1",
      "pattern-fill-1-2",
      "pattern-fill-1-3",
      "pattern-fill-1-4",
      "pattern-fill-1-5",
      "pattern-fill-1-6",
    ],
  };

  const patternImages_0 = {
    "pattern-fill-0-0":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect fill='none' stroke='%23119eb9' stroke-width='3' width='100%25' height='100%25' %3E%3C/rect%3E%3C/svg%3E",
    "pattern-fill-0-1":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect fill='none' stroke='%23119eb9' stroke-width='2' width='100%25' height='100%25' transform='rotate(45)' %3E%3C/rect%3E%3C/svg%3E",
    "pattern-fill-0-2":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath stroke='%23119eb9' stroke-width='2' fill='none' d='M0,0L5,5L10,0L5,5L0,0Z' %3E%3C/path%3E%3C/svg%3E",
    "pattern-fill-0-3":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath stroke='%23119eb9' stroke-width='2' fill='none' d='M0,0L10,10' %3E%3C/path%3E%3Cpath stroke='%23119eb9' stroke-width='2' fill='none' d='M10,0L0,10' %3E%3C/path%3E%3C/svg%3E",
    "pattern-fill-0-4":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill='%23119eb9' d='M0,0L10,10L10,0L0,10Z'%3E%3C/path%3E%3C/svg%3E",
    "pattern-fill-0-5":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle fill='%23119eb9' cx='-5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='%23119eb9' cx='5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='%23119eb9' cx='0' cy='-5' r='2'%3E%3C/circle%3E%3Ccircle fill='%23119eb9' cx='0' cy='5' r='2'%3E%3C/circle%3E%3C/svg%3E",
    "pattern-fill-0-6":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5'%3E%3Cpath fill='%23119eb9' d='M-10,0L0,10L10,0L0,-10z'%3E%3C/path%3E%3Ccircle fill='white' cx='-5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='white' cx='5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='white' cx='0' cy='-5' r='2'%3E%3C/circle%3E%3Ccircle fill='white' cx='0' cy='5' r='2'%3E%3C/circle%3E%3C/svg%3E",
  };
  const patternImages_1 = {
    "pattern-fill-1-0":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect fill='none' stroke='%2308415c' stroke-width='3' width='100%25' height='100%25' %3E%3C/rect%3E%3C/svg%3E",
    "pattern-fill-1-1":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect fill='none' stroke='%2308415c' stroke-width='2' width='100%25' height='100%25' transform='rotate(45)' %3E%3C/rect%3E%3C/svg%3E",
    "pattern-fill-1-2":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath stroke='%2308415c' stroke-width='2' fill='none' d='M0,0L5,5L10,0L5,5L0,0Z' %3E%3C/path%3E%3C/svg%3E",
    "pattern-fill-1-3":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath stroke='%2308415c' stroke-width='2' fill='none' d='M0,0L10,10' %3E%3C/path%3E%3Cpath stroke='%2308415c' stroke-width='2' fill='none' d='M10,0L0,10' %3E%3C/path%3E%3C/svg%3E",
    "pattern-fill-1-4":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill='%2308415c' d='M0,0L10,10L10,0L0,10Z'%3E%3C/path%3E%3C/svg%3E",
    "pattern-fill-1-5":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle fill='%2308415c' cx='-5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='%2308415c' cx='5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='%2308415c' cx='0' cy='-5' r='2'%3E%3C/circle%3E%3Ccircle fill='%2308415c' cx='0' cy='5' r='2'%3E%3C/circle%3E%3C/svg%3E",
    "pattern-fill-1-6":
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5'%3E%3Cpath fill='%2308415c' d='M-10,0L0,10L10,0L0,-10z'%3E%3C/path%3E%3Ccircle fill='white' cx='-5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='white' cx='5' cy='0' r='2'%3E%3C/circle%3E%3Ccircle fill='white' cx='0' cy='-5' r='2'%3E%3C/circle%3E%3Ccircle fill='white' cx='0' cy='5' r='2'%3E%3C/circle%3E%3C/svg%3E",
  };

  var margin = { top: 10, right: 20, bottom: 50, left: 20 };
  bar_width = 10;

  // Extract options
  const el = option.el;
  const columnBars = option.columnBars;
  const isGrouped = option.hasOwnProperty("columnGrouping");
  const columnGrouping = option.columnGrouping;
  const columnMeasure0 = option.columnMeasure0;
  const columnMeasure1 = option.columnMeasure1;
  const operationMeasure = option.operationMeasure || "avg";
  const paletteFill = option.paletteFill || "full";
  const positionLegend = option.positionLegend || "top";
  const sort = option.sort || "atoz";
  const labelXAxis = option.labelXAxis || "X Axis";
  const labelYAxis = option.labelYAxis || "Y Axis";

  // Process data
  option.data.forEach((d) => {
    d[columnMeasure0] = parseFloat(d[columnMeasure0]);
    d[columnMeasure1] = parseFloat(d[columnMeasure1]);
  });

  const allValues = [];
  if (isGrouped) {
    var data_0 = d3
      .nest()
      .key(function (d) {
        return d[columnGrouping];
      })
      .sortKeys(sortBars(sort))
      .key(function (d) {
        return d[columnBars];
      })
      .sortKeys(sortBars(sort))
      .rollup(function (v) {
        const value = aggregate(v, operationMeasure, columnMeasure0);
        return value;
      })
      .entries(option.data);

    var data_1 = d3
      .nest()
      .key(function (d) {
        return d[columnGrouping];
      })
      .sortKeys(sortBars(sort))
      .key(function (d) {
        return d[columnBars];
      })
      .sortKeys(sortBars(sort))
      .rollup(function (v) {
        const value0 = aggregate(v, operationMeasure, columnMeasure0);
        const value1 = aggregate(v, operationMeasure, columnMeasure1);
        const value = value0 + value1;
        allValues.push(value);
        return value;
      })
      .entries(option.data);
  } else {
    var data_0 = d3
      .nest()
      .key(function (d) {
        return d[columnBars];
      })
      .sortKeys(sortBars(sort))
      .rollup(function (v) {
        const value = aggregate(v, operationMeasure, columnMeasure0);
        allValues.push(value);
        return value;
      })
      .entries(option.data);

    var data_1 = d3
      .nest()
      .key(function (d) {
        return d[columnBars];
      })
      .sortKeys(sortBars(sort))
      .rollup(function (v) {
        const value0 = aggregate(v, operationMeasure, columnMeasure0);
        const value1 = aggregate(v, operationMeasure, columnMeasure1);
        const value = value0 + value1;
        allValues.push(value);
        return value;
      })
      .entries(option.data);

    data_0 = [{ key: "", values: data_0 }];
    data_1 = [{ key: "", values: data_1 }];
  }

  const groupKeys = data_0.map(function (d) {
    return d.key;
  });

  const singleKeys = data_0[0].values.map(function (d) {
    return d.key;
  });

  const maxValue = d3.max(allValues);

  const n = allValues.length;

  bar_height = 20;
  singleSpacing = 10;
  groupSpacing = 20;

  const colorScale_0 = d3
    .scaleOrdinal()
    .domain(singleKeys)
    .range(colors[paletteFill + "_0"]);

  const colorScale_1 = d3
    .scaleOrdinal()
    .domain(singleKeys)
    .range(colors[paletteFill + "_1"]);

  // Render chart
  const container = d3.select(el).classed("stacked-bar-chart-viz", true);
  const svg_width = +container.style("width").slice(0, -2) - 26;

  var longestYLabel = "";
  var longestYLabelLength = 0;
  groupKeys.forEach(function (v) {
    if (longestYLabelLength < v.length) {
      longestYLabelLength = v.length;
      longestYLabel = v;
    }
  });

  var dummy_text = container
    .append("div")
    .attr("class", "dummy-text")
    .append("text")
    .style("font-family", "sans-serif")
    .style("font-size", "10px")
    .text(longestYLabel);

  var max_y_label_width = dummy_text.node().getBoundingClientRect().width;

  dummy_text.remove();

  var margin_left = margin.left;
  if (max_y_label_width > 25) {
    margin_left = ((max_y_label_width + 35) / 10).toFixed(1) * 10;
  }

  margin.left = margin_left;

  const svg_height =
    (singleKeys.length * (bar_height + singleSpacing) + groupSpacing) *
      groupKeys.length +
    margin.top +
    groupSpacing;

  let legendContainer;
  if (positionLegend === "top") {
    legendContainer = container.insert("div", ".chart-container");
  }

  var chartContainer = container
    .append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  if (paletteFill === "pattern") {
    colors.pattern_0.forEach(function (v) {
      chartContainer
        .append("defs")
        .append("pattern")
        .attr("id", v)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 10)
        .attr("height", 10)
        .append("image")
        .attr("xlink:href", patternImages_0[v])
        .attr("width", 10)
        .attr("height", 10);
    });
    colors.pattern_1.forEach(function (v) {
      chartContainer
        .append("defs")
        .append("pattern")
        .attr("id", v)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 10)
        .attr("height", 10)
        .append("image")
        .attr("xlink:href", patternImages_1[v])
        .attr("width", 10)
        .attr("height", 10);
    });
  }

  if (positionLegend === "bottom") {
    legendContainer = container.append("div");
  }

  console.log("maxValue", maxValue);

  x = d3
    .scaleLinear()
    .domain([0, maxValue])
    .nice()
    .rangeRound([0, svg_width - margin.right - margin.left]);

  y0 = d3
    .scaleBand()
    .domain(groupKeys)
    .rangeRound([groupSpacing, svg_height - margin.bottom]);

  y1 = d3
    .scaleBand()
    .domain(singleKeys)
    .rangeRound([0, y0.bandwidth() - groupSpacing]);

  render(chartContainer, data_0, data_1);

  function render(container, data_0, data_1) {
    container
      .append("g")
      .selectAll("g")
      .data(data_1)
      .join("g")
      .attr("transform", (d) => `translate(0,${y0(d.key)})`)
      .attr("class", "test")
      .selectAll("rect")
      .data(function (d) {
        d.values.forEach(function (v) {
          v.parentKey = d.key;
        });
        return d.values;
      })
      .join("rect")
      .attr("x", (d) => x(0))
      .attr("y", (d) => y1(d.key))
      .attr("width", (d) => 0)
      .attr("height", bar_height)
      .attr("fill", function (d) {
        if (paletteFill === "pattern") {
          return "url(#" + colorScale_1(d.key) + ")";
        } else {
          //return colorScale(d.key);
          return colorScale_1(d.key);
        }
      })
      .attr("class", function () {
        if (paletteFill === "pattern") {
          return "pattern-fill-1";
        }
      })
      .on("mouseover", function (d) {
        showTooltip(d, 1);
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip);

    container
      .append("g")
      .selectAll("g")
      .data(data_0)
      .join("g")
      .attr("transform", (d) => `translate(0,${y0(d.key)})`)
      .attr("class", "test")
      .selectAll("rect")
      .data(function (d) {
        d.values.forEach(function (v) {
          v.parentKey = d.key;
        });
        return d.values;
      })
      .join("rect")
      .attr("x", (d) => x(0))
      .attr("y", (d) => y1(d.key))
      .attr("width", (d) => 0)
      .attr("height", bar_height)
      .attr("fill", function (d) {
        if (paletteFill === "pattern") {
          return "url(#" + colorScale_0(d.key) + ")";
        } else {
          return colorScale_0(d.key);
        }
      })
      .attr("class", function () {
        if (paletteFill === "pattern") {
          return "pattern-fill-0";
        }
      })
      .attr("id", function (d) {
        return d.key;
      })
      .on("mouseover", function (d) {
        showTooltip(d, 0);
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip);

    container.append("g").attr("class", "y-axis").call(d3.axisLeft(y0));

    /* calc x-ticks:
    - largest label width
    - space for each
    - calc how many ticks can fit
    - set number of ticks
      */

    var dummy_text = d3
      .select(el)
      .append("div")
      .attr("class", "x-dummy-text")
      .append("text")
      .style("font-family", "Nunito")
      .style("font-size", "10px")
      .text(maxValue.toFixed(0));

    var max_x_label_width = dummy_text.node().getBoundingClientRect().width * 2;
    var axis_width = svg_width - margin.right - margin.left;
    var target_n = Math.floor(axis_width / max_x_label_width);

    d3.select(".x-dummy-text").remove();

    container
      .append("g")
      .attr("class", "x-axis-0")
      .call(d3.axisBottom(x).ticks(target_n))
      .attr(
        "transform",
        "translate(" + 0 + "," + (svg_height - margin.bottom) + ")"
      );

    // determine if x-axis label needs shortening:
    var x_label_spacing =
      (svg_width - margin.left - margin.right) / groupKeys.length;

    container.selectAll(".x-axis-0 text").html(function (d) {
      var label_width = this.getBoundingClientRect().width;
      if (label_width > x_label_spacing) {
        var a = d.substr(0, 20).lastIndexOf(" ");
        var b = d.substr(0, a + 1);
        var y = d.substr(a + 1);
        return (
          "<tspan x='0' dy='0.35em'>" +
          b +
          "</tspan><tspan x='0' dy='1.5em'>" +
          y +
          "</tspan>"
        );
      }
      return "<tspan x='0' dy='0.35em'>" + d + "</tspan>";
    });

    container
      .append("text")
      .attr("transform", function () {
        var height = svg_height - margin.top - 10;
        return (
          "translate(" +
          (svg_width - margin.left - margin.right) / 2 +
          " ," +
          +height +
          ")"
        );
      })
      .attr("class", "x-axis axis-label")
      .text(labelXAxis);

    container
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (svg_height - margin.bottom - margin.top) / 2)
      .attr("dy", "1em")
      .attr("class", "y-axis axis-label")
      .text(labelYAxis);
  }

  init();

  function init() {
    chartContainer
      .selectAll("rect")
      .transition()
      .duration(1000)
      .delay(500)
      .attr("width", function (d) {
        return x(d.value) - x(0);
      })
      .attr("x", function (d) {
        return x(0);
      });

    chartContainer
      .selectAll(".value-label")
      .transition()
      .duration(1000)
      .delay(500)
      .attr("x", function (d) {
        return x(d.value) - 5;
      })
      .attr("opacity", 1);
  }

  // Tooltip
  const tooltip = container.append("div").attr("class", "chart-tooltip");
  tooltip.append("div").attr("class", "tooltip-outer-group-label");
  tooltip.append("div").attr("class", "tooltip-inner-group-label");
  tooltip.append("div").attr("class", "tooltip-inner-group-value");

  function moveTooltip() {
    let padding = 10;
    const { width, height } = tooltip.datum();
    let x = d3.event.clientX;
    if (x + padding + width > window.innerWidth) {
      x = x - padding - width;
    } else {
      x = x + padding;
    }
    let y = d3.event.clientY;
    if (y + padding + height > window.innerHeight) {
      y = y - padding - height;
    } else {
      y = y + padding;
    }
    tooltip.style("transform", `translate(${x}px,${y}px)`);
  }

  function showTooltip(d, stack) {
    var value;
    if (stack == 0) {
      tooltip
        .style(
          "border-color",
          paletteFill === "pattern" ? "#119eb9" : colorScale_0(d.key)
        )
        .transition()
        .style("opacity", 1);

      value = formatNumber(d.value);
    } else {
      tooltip
        .style(
          "border-color",
          paletteFill === "pattern" ? "#08415c" : colorScale_1(d.key)
        )
        .transition()
        .style("opacity", 1);

      var value_1 = d.value;
      var value_0;
      data_0.forEach(function (v) {
        if (v.key == d.parentKey) {
          v.values.forEach(function (w) {
            if (w.key == d.key) {
              value_0 = w.value;
            }
          });
        }
      });

      value = formatNumber(value_1 - value_0);
    }
    tooltip.select(".tooltip-outer-group-label").text(d.parentKey);
    tooltip.select(".tooltip-inner-group-label").text(d.key);
    tooltip.select(".tooltip-inner-group-value").text(value);

    const { width, height } = tooltip.node().getBoundingClientRect();
    tooltip.datum({ width, height });
  }

  function hideTooltip() {
    tooltip.transition().style("opacity", 0);
  }

  // Render legend
  legendContainer
    .attr("class", "legend-container")
    .selectAll(".legend-item")
    .data(colorScale_0.domain())
    .join("div")
    .attr("class", "legend-item")
    .call((item) =>
      item
        .append("div")
        .attr("class", (d) =>
          paletteFill === "pattern"
            ? `${colorScale_0(d)} pattern-fill-0 legend-swatch`
            : "legend-swatch"
        )
        .style("background", (d) =>
          paletteFill === "pattern" ? null : colorScale_0(d)
        )
    )
    .call((item) =>
      item
        .append("div")
        .attr("class", (d) =>
          paletteFill === "pattern"
            ? `${colorScale_1(d)} pattern-fill-1 legend-swatch legend-swatch-1`
            : "legend-swatch legend-swatch-1"
        )
        .style("background", (d) =>
          paletteFill === "pattern" ? null : colorScale_1(d)
        )
    )
    .call((item) =>
      item
        .append("div")
        .attr("class", "legend-label")
        .text((d) => d)
    );

  // Utilities
  function aggregate(v, op, col) {
    switch (op) {
      case "sum":
        return d3.sum(v, (v) => v[col]);
      case "avg":
        return d3.mean(v, (v) => v[col]);
      case "count":
        return v.length;
      default:
        break;
    }
  }

  function sortBars(sortOrder) {
    switch (sortOrder) {
      case "atoz":
        return d3.ascending;
      case "ztoa":
        return d3.descending;
      default:
        break;
    }
  }

  // Format number
  function formatNumber(d) {
    if (d < 1e3) {
      return d3.format(".3s")(d);
    } else if (d < 1e5) {
      return `${(d / 1e3).toFixed(1)}K`;
    } else if (d < 1e6) {
      return `${(d / 1e3).toFixed(0)}K`;
    } else if (d < 1e8) {
      return `${(d / 1e6).toFixed(1)}M`;
    } else if (d < 1e9) {
      return `${(d / 1e6).toFixed(0)}M`;
    } else if (d < 1e11) {
      return `${(d / 1e9).toFixed(1)}B`;
    } else if (d < 1e12) {
      return `${(d / 1e9).toFixed(0)}B`;
    } else if (d < 1e14) {
      return `${(d / 1e12).toFixed(1)}T`;
    } else {
      return `${(d / 1e12).toFixed(1)}T`;
    }
  }
}
