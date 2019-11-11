// From https://vega.github.io/vega/examples/bar-chart/

export default {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 400,
    height: 200,
    padding: { left: 5, right: 5, top: 5, bottom: 5 },
  
    data: [
      {
        name: 'myData',
        values: []
      }
    ],
  
    signals: [
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:mouseover', update: 'datum' },
          { events: 'rect:mouseout', update: '{}' },
        ],
      },
      {
        name: 'click',
        value: {},
        on: [
          { events: 'rect:click', update: 'datum' }
        ],
      }
    ],
  
    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'myData', field: 'DRUG_NAME' },
        range: 'width',
      },
      {
        name: 'yscale',
        domain: { data: 'myData', field: 'LN_IC50' },
        nice: true,
        range: 'height',
      },
    ],
  
    axes: [{ orient: 'bottom', scale: 'xscale' }, { orient: 'left', scale: 'yscale' }],
  
    marks: [
      {
        type: 'rect',
        from: { data: 'myData' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'DRUG_NAME', offset: 1 },
            width: { scale: 'xscale', band: 1, offset: -1 },
            y: { scale: 'yscale', field: 'LN_IC50' },
            y2: { scale: 'yscale', value: 0 },
          },
          update: {
            fill: { value: 'steelblue' },
          },
          hover: {
            fill: { value: 'red' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          enter: {
            align: { value: 'center' },
            baseline: { value: 'bottom' },
            fill: { value: '#333' },
          },
          update: {
            x: { scale: 'xscale', signal: 'tooltip.DRUG_NAME', band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.LN_IC50', offset: -2 },
            text: { signal: 'tooltip.LN_IC50' },
            fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
          },
        },
      },
    ],
  };