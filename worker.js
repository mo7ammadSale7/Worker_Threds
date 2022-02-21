const { isMainThread, parentPort, workerData } = require("worker_threads");

if (!isMainThread) {

  // Get data from  main and send it
  parentPort.on('message', (data) => {
    const parsed = JSON.parse(data);
    parentPort.postMessage(parsed);
  })
}