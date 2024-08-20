export default {
  "nodes": [
    {
      "type": "start",
      "size": "72*72",
      "shape": "flow-circle",
      "color": "#FA8C16",
      "label": "开始",
      "x": 468,
      "y": 61,
      "id": "Y6WY3sVMiN",
      "index": 0,
      "data": {
        "name": "prop2",
        "value": "prop2"
      }
    },
    {
      "type": "node",
      "size": "80*48",
      "shape": "flow-rect",
      "color": "#1890FF",
      "label": "审批人",
      "x": 468,
      "y": 201.5,
      "id": "CX1h5ZeV9t",
      "index": 1,
      "data": {
        "name": "prop3",
        "value": "prop3"
      }
    },
    {
      "type": "node",
      "size": "80*48",
      "shape": "flow-rect",
      "color": "#1890FF",
      "label": "审批人1",
      "x": 299,
      "y": 459,
      "id": "sGYZgVzbs5",
      "index": 4
    },
    {
      "type": "node",
      "size": "80*48",
      "shape": "flow-rect",
      "color": "#1890FF",
      "label": "审批人2",
      "x": 626,
      "y": 461,
      "id": "YBpQtrI7qz",
      "index": 5
    },
    {
      "type": "end",
      "size": "72*72",
      "shape": "flow-circle",
      "color": "#FA8C16",
      "label": "结束",
      "x": 468,
      "y": 625.7,
      "id": "OVAskoD5l6",
      "index": 8
    },
    {
      "type": "condition",
      "size": "80*48",
      "shape": "flow-rhombus",
      "color": "#13C2C2",
      "label": "条件",
      "x": 468.5,
      "y": 355.5,
      "id": "gMp8LWAN6O",
      "index": 11
    }
  ],
  "edges": [
    {
      "source": "Y6WY3sVMiN",
      "sourceAnchor": 2,
      "shape": "flow-polyline",
      "target": "CX1h5ZeV9t",
      "targetAnchor": 0,
      "id": "c0m6YF2Aip",
      "index": 2,
      "points": [
        {
          "x": 468,
          "y": 97.5,
          "index": 2
        },
        {
          "x": 468,
          "y": 177,
          "index": 0
        }
      ]
    },
    {
      "source": "CX1h5ZeV9t",
      "sourceAnchor": 2,
      "target": "gMp8LWAN6O",
      "targetAnchor": 0,
      "id": "iPKj1pCeVN",
      "shape": "flow-polyline",
      "index": 3,
      "points": [
        {
          "x": 468,
          "y": 226,
          "index": 2
        },
        {
          "x": 468.5,
          "y": 331,
          "index": 0
        }
      ]
    },
    {
      "source": "gMp8LWAN6O",
      "sourceAnchor": 3,
      "target": "sGYZgVzbs5",
      "targetAnchor": 0,
      "id": "gj6NZG4BEH",
      "shape": "flow-polyline",
      "label": "是",
      "index": 6,
      "points": [
        {
          "x": 428,
          "y": 355.5,
          "index": 3
        },
        {
          "x": 299,
          "y": 434.5,
          "index": 0
        }
      ]
    },
    {
      "source": "gMp8LWAN6O",
      "sourceAnchor": 1,
      "target": "YBpQtrI7qz",
      "targetAnchor": 0,
      "id": "DSUZrpRTmb",
      "shape": "flow-polyline",
      "label": "否",
      "index": 7,
      "points": [
        {
          "x": 509,
          "y": 355.5,
          "index": 1
        },
        {
          "x": 626,
          "y": 436.5,
          "index": 0
        }
      ]
    },
    {
      "source": "sGYZgVzbs5",
      "sourceAnchor": 2,
      "target": "OVAskoD5l6",
      "targetAnchor": 0,
      "id": "sik7fPdube",
      "shape": "flow-polyline",
      "index": 9,
      "points": [
        {
          "x": 299,
          "y": 483.5,
          "index": 2
        },
        {
          "x": 468,
          "y": 589.2,
          "index": 0
        }
      ]
    },
    {
      "source": "YBpQtrI7qz",
      "sourceAnchor": 2,
      "target": "OVAskoD5l6",
      "targetAnchor": 0,
      "id": "J9JahAnLqc",
      "shape": "flow-polyline",
      "index": 10,
      "points": [
        {
          "x": 626,
          "y": 485.5,
          "index": 2
        },
        {
          "x": 468,
          "y": 589.2,
          "index": 0
        }
      ]
    }
  ]
}
