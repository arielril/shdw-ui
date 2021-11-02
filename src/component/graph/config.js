import CustomNode from './customNode';

/**
 * @type {import('react-d3-graph').GraphConfiguration}
 */
const config = {
  directed: true,
  automaticRearrangeAfterDropNode: true,
  linkHighlightBehavior: true,
  nodeHighlightBehavior: true,
  initialZoom: 1,
  minZoom: 1,
  maxZoom: 12,
  width: window.innerWidth,
  height: window.innerHeight / 1.3,
  node: {
    color: '#F79767',
    highlightColor: 'red',
    highlightFontSize: 14,
    highlightFontWeight: 'bold',
    highlightStrokeColor: 'red',
    renderLabel: false,
    size: {
      height: 900,
      width: 900,
    },
    viewGenerator: n => <CustomNode node={n} />
  },
  link: {
    color: 'lightgray',
    highlightColor: 'red',
    type: 'STRAIGHT',
    renderLabel: true,
    fontSize: 10,
  },
  d3: {
    alphaTarget: 0.5,
    gravity: -250,
    linkLength: 200,
    linkStrength: 2,
  },
};

export default config;
