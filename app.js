const app = require("express")();
const { Worker, isMainThread } = require("worker_threads");

let worker;

if(isMainThread) {
  console.log("Main Thread");
  worker = new Worker('./worker.js');

  worker.on('message', (data) => {
    console.log("The name of user:", data.name);
  })

  worker.on('error', (error) => {
    console.log("Got Error:");
  })

  worker.on('exit', (data) => {
    console.log("Exit:", data);
  })
}

app.get('/', (req, res) => {
  const json = '{"name": "mohammad", "age": 15}'
  worker.postMessage(json)
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('server is running');
})