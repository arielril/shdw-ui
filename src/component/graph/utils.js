import axios from 'axios';

const orchestratorBaseUrl = 'http://localhost:3001/v1';

/**
 * @typedef GetGraphReturn
 * @property {object[]} nodes
 * @property {string} nodes.name
 * @property {string} nodes.uid
 * @property {string} nodes.label
 * @property {string[]} nodes.tags
 * @property {object[]} edges
 * @property {string} edges.source
 * @property {string} edges.target
 * @property {string} edges.label
 */

/**
 * 
 * @returns {Promise<GetGraphReturn>}
 */
const getGraph = async () => {
  try {
    const resp = await axios.get(`${orchestratorBaseUrl}/graph`);

    return resp.data;
  } catch (error) {
    console.error('failed to get graph from the backend. Error:', error);
    throw error;
  };
};

const funcs = {
  getGraph,
};

export default funcs;
