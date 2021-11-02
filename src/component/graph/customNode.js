import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './customNode.css';

/**
 * 
 * @param {object} props 
 * @param {object} props.node
 * @param {string} props.node.uid
 * @param {string} props.node.name
 * @param {number} props.node.port
 * @param {number} props.node.status_code
 * @param {string[]} props.node.tags
 */
const CustomNode = ({ node }) => {
  /**
   * @param {string[]} tags 
   * @returns {string}
   */
  const formatTags = (tags = []) => tags.join(';');

  const renderTags = (tags = []) => (
    <Tooltip>
      {JSON.stringify(tags)}
    </Tooltip>
  );

  const isNodeHost = (tags = []) => tags.find(tg => tg === 'target-host');

  return (
    <OverlayTrigger
      placement='top'
      delay={{ show: 500, hide: 200 }}
      overlay={renderTags(node.tags || [])}
    >
      <svg height='90' width='90'>
        <g>
          <circle
            cx='45'
            cy='45'
            r='45'
            className='node'
            style={{ fill: `${isNodeHost(node.tags) ? 'green' : ''}` }}
          />
          <foreignObject height='70' width='70' x='10' y='10' className='name'>
            <center>{node.name}</center>
          </foreignObject>
        </g>
      </svg>
    </OverlayTrigger>
  );
};

export default CustomNode;
