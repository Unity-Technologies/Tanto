import createWorkerMiddleware from 'redux-worker-middleware'

const PrismDiffProcessor = require('worker-loader?inline!../../workers/prismDiffProcessor')
const processorWorker = new PrismDiffProcessor()

const workerMiddleware = createWorkerMiddleware(processorWorker)

export default workerMiddleware
