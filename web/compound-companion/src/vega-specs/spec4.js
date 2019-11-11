export default {
    data: { name: 'myData' },
    description: 'A simple bar chart with embedded data.',
    signals: [
        {
        "name": "ttip",
        "value": {},
        "on": [
            {"events": "rect:mouseover", "update": "datum"},
            {"events": "rect:mouseout",  "update": "{}"}
        ]
        }],
    encoding: {
        x: { field: 'DRUG_NAME', type: 'ordinal' },
        y: { field: 'LN_IC50', "aggregate": "mean", type: 'quantitative' },
    },
    mark: 'bar'
}
