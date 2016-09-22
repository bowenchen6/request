'use strict'

const request = require('./request.js');

request.get('http://127.0.0.1:3000/get').then(function(res) {
  let data = res.read();
  console.log(`Got response: ${data}`);
}, function(error) {
  console.error('出错了', error);
});

let params = {
  id : 123
}
request.post('http://127.0.0.1:3000/post', params).then(function(chunk) {
  console.log(`Got response: ${chunk}`);
}, function(error) {
  console.error('出错了', error);
});