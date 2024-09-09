import NodeCache from 'node-cache';

let cache = new NodeCache({ stdTTL: 600 });

export default cache;