```js
/// App.js
import React, { useRef, useEffect } from "react";
import cytoscape from "cytoscape";
import cydagre from "cytoscape-dagre";
import dagre from "dagre";
import { defaults } from "./settings";
import { style } from "./styles";
import { elements } from "./mock";
import "./styles.css";

cydagre(cytoscape, dagre);
// cytoscape.use(dagre);
// cytoscape.use(popper);

export default function App() {
  return (
    <div className="App">
      <TopologyViewerComponent elements={elements} />
    </div>
  );
}

const TopologyViewerComponent = ({ elements }) => {
  const ref = useRef(null);
  useEffect(() => {
    const cy = cytoscape({
      container: ref.current,
      boxSelectionEnabled: false,
      autounselectify: true,
      layout: {
        name: "dagre",
        ...defaults
      },
      zoom: 1,
      pan: { x: 0, y: 0 },
      minZoom: 0.1,
      maxZoom: 5,
      wheelSensitivity: 0.1,
      motionBlur: false,
      motionBlurOpacity: 0.5,
      pixelRatio: "auto",
      textureOnViewport: false,
      style,
      elements
    });

    cy.on("tap", function (e) {
      const url = e.target.data("url");
      if (url && url !== "") {
        window.open(url);
      }
    });

    const animateEdges = () => {
      cy.edges().style({ "line-dash-offset": 0 });
      cy.edges().animate({
        style: {
          "line-dash-offset": -300
        },
        duration: 5000,
        complete: () => animateEdges()
      });
    };

    animateEdges();

    return function cleanup() {
      if (cy) {
        cy.destroy();
      }
    };
  });
  return <div className="topology-viewer-component" ref={ref}></div>;
};

```

```js
// mock.js
const siteA = {
  nodes: [
    { data: { id: "siteB" } },
    {
      data: {
        id: "sp5",
        label: "A",
        parent: "siteB",
        callCount: 10,
        delayMS: 100,
        url: "http://www.naver.com"
      },
      classes: "switch purple"
    },
    {
      data: {
        id: "lf14",
        label: "B",
        parent: "siteB",
        callCount: 10,
        delayMS: 100
      },
      classes: "switch red"
    },
    {
      data: {
        id: "mf14",
        label: "C",
        parent: "siteB",
        callCount: 10,
        delayMS: 100
      },
      classes: "switch blue"
    },
    {
      data: {
        id: "nf14",
        label: "D",
        parent: "siteB",
        callCount: 10,
        delayMS: 100
      },
      classes: "switch emerald" //styles.js에서 색상을 만들어줘야함
    }
  ],
  edges: [
    // id를 통해 source에서 target으로 노드를 연결해줌
    {
      data: {
        source: "sp5",
        target: "lf14",
        callCount: 10,
        delayMS: 100,
        speed: 100,
        bw: 50
      }
    },
    {
      data: {
        source: "lf14",
        target: "mf14",
        callCount: 15,
        delayMS: 150,
        speed: 100,
        bw: 100
      }
    },
    {
      data: {
        source: "mf14",
        target: "nf14",
        callCount: 20,
        delayMS: 200,
        speed: 100,
        bw: 10
      }
    }
  ]
};

export const elements = {
  // 보여주고자하는 parent를 export
  nodes: [...siteA.nodes],
  edges: [...siteA.edges]
};
```

```js
// settings.js
export const defaults = {
  // dagre algo options, uses default value on undefined
  nodeSep: 50, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: 300, // the separation between each rank in the layout
  rankDir: "LR", // 'TB' for top to bottom flow, 'LR' for left to right,
  ranker: "network-simplex", // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
  //'network-simplex', 'tight-tree' or 'longest-path'
  minLen: function (edge) {
    return 1;
  }, // number of ranks to keep between the source and target of the edge
  edgeWeight: function (edge) {
    return 1;
  }, // higher weight edges are generally made shorter and straighter than lower weight edges

  // general layout options
  fit: true, // whether to fit to viewport
  padding: 15, // fit padding
  spacingFactor: 1, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
  animate: false, // whether to transition the node positions
  animateFilter: function (node, i) {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  animationDuration: 5000, // duration of animation in ms if enabled
  animationEasing: "ease-out-expo", // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform: function (node, pos) {
    return pos;
  }, // a function that applies a transform to the final node position
  ready: function () {}, // on layoutready
  stop: function () {} // on layoutstop
};

```

```js
const COLORS = {
  "#evs-white": "#ffffff",
  "#evs-gray": "#323232",
  "#evs-info": "#00bcd4",
  "#evs-danger": "#f44336",
  "#evs-warning": "#ff9800",
  "#evs-success": "#4caf50",
  "#evs-primary": "#2196f3",
  "#evs-black": "#000000",
  "#evs-gray-lighter": "#696969",
  "#evs-gray-light": "#555555",
  "#evs-gray-darker": "#141414",
  "#evs-gray-dark": "#232323",
  "#amber-500": "#ffc107",
  "#purple-500": "#9c27b0",
  "#deeppurple-500": "#673ab7",
  "#indigo-500": "#3f51b5",
  "#lightblue-500": "#03a9f4",
  "#teal-500": "#009688",
  "#lightgreen-500": "#8bc34a",
  "#lime-500": "#cddc39",
  "#yellow-500": "#ffeb3b",
  "#pink-500": "#e91e63",
  "#deeporange-500": "#ff5722",
  "#brown-500": "#795548",
  "#bluegrey-500": "#607d8b",
  "#gray-500": "#9e9e9e",
  "#teal-700": "#00bfa5"
};

export const style = [
  {
    selector: ".switch, .interface, .interface-problem",
    style: {
      "background-color": COLORS["#evs-gray-dark"],
      "border-width": 5
    }
  },
  {
    selector: ".switch",
    style: {
      width: 160,
      height: 160,
      "border-color": COLORS["#evs-gray-light"],
      shape: "roundrectangle",
      "font-size": 40
    }
  },
  {
    selector: ".red",
    style: {
      "border-color": "#ee4326"
    }
  },
  {
    selector: ".blue",
    style: {
      "border-color": "#2643ee"
    }
  },
  {
    selector: ".purple",
    style: {
      "border-color": "#ee43ee"
    }
  },
  {
    selector: ".emerald",
    style: {
      "border-color": "#0eedcb"
    }
  },
  {
    selector: ".switch:selected",
    style: {
      "background-color": COLORS["#evs-info"]
    }
  },
  {
    selector: ".interface",
    style: {
      width: 54,
      height: 54,
      "font-size": 12,
      "border-color": COLORS["#teal-700"]
    }
  },
  {
    selector: ".interface-problem",
    style: {
      width: 54,
      height: 54,
      "font-size": 12,
      "border-color": COLORS["#evs-danger"]
    }
  },
  {
    selector: ".interface-problem:selected",
    style: {
      "background-color": COLORS["#evs-danger"]
    }
  },
  {
    selector: ".interface:selected",
    style: {
      "background-color": COLORS["#teal-700"]
    }
  },
  {
    selector: ":parent",
    style: {
      events: "yes",
      "background-fill": "#FFFFFF", //radial-gradient
      "background-gradient-stop-colors": `${COLORS["#evs-gray"]} ${COLORS["#evs-gray-dark"]}`,
      "background-opacity": 0,
      "border-width": 0,
      "text-valign": "top",
      "text-halign": "left",
      shape: "roundrectangle"
    }
  },
  {
    selector: "[label]",
    style: {
      label: "data(label)",
      color: COLORS["#evs-white"],
      "text-valign": "center",
      "font-family": "Roboto"
    }
  },
  {
    selector: "edge",
    style: {
      "z-index": 999,
      opacity: 1,
      "curve-style": "bezier",
      "line-style": "dashed",
      "line-dash-pattern": [36, 1, 2, 1].map((e) => e * 5),
      "line-dash-offset": 0,
      width: 15,
      "target-arrow-shape": "triangle",
      "target-arrow-color": (ele) => {
        let pUsed = (ele.data("bw") / ele.data("speed")) * 100;
        if (pUsed > 80) {
          return COLORS["#evs-warning"];
        } else if (pUsed > 30) {
          return COLORS["#evs-success"];
        } else if (pUsed > 0) {
          return COLORS["#evs-primary"];
        } else {
          return COLORS["#evs-gray-light"];
        }
      }
    }
  },
  {
    selector: "[speed]",
    style: {
      "line-color": (ele) => {
        let pUsed = (ele.data("bw") / ele.data("speed")) * 100;
        if (pUsed > 80) {
          return COLORS["#evs-warning"];
        } else if (pUsed > 30) {
          return COLORS["#evs-success"];
        } else if (pUsed > 0) {
          return COLORS["#evs-primary"];
        } else {
          return COLORS["#evs-gray-light"];
        }
      },
      width: "mapData(speed, 0, 100, 1, 10)",
      "z-index": (ele) => Math.ceil((ele.data("bw") / ele.data("speed")) * 100),
      "line-dash-pattern": (ele) => {
        const f = 100 - Math.ceil((ele.data("bw") / ele.data("speed")) * 100);
        return [f, 2, 5, 2];
      }
    }
  }
];
```

```css
.App {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
}

.topology-viewer-component {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  height: 900px;
  background: #ffffff;
}
```