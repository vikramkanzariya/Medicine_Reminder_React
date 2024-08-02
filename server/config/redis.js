const {Queue} = require('bullmq')

const reportQueue = new Queue("sendReport",{
  connection:{
    host:"127.0.0.1",
    port:6379
  }
})

const taskQueue = new Queue("sendReminder",{
  connection:{
    host:"127.0.0.1",
    port:6379
  }
})

module.exports = {reportQueue,taskQueue};