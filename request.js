'use strict'

const Promise = require("bluebird");
const http = require('http');
const urlUtil = require('url');
const buffer = require('buffer').Buffer;

exports.get = function (url) {
    console.log(`get ${url}`);
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            resolve(res);
        }).on('error', (e) => {
            reject(`Got error: ${e.message}`);
        });
    })
}

exports.post = function (url, params) {
    console.log(`get ${url} with params ${JSON.stringify(params)}`);
    const urlArray = urlUtil.parse(url);
    const paramsString = JSON.stringify(params);
    const options = {
        hostname: urlArray.hostname,
        port: urlArray.port,
        path: urlArray.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': buffer.byteLength(paramsString)
        }
    };
    return new Promise((resolve, reject) => {
        let req = http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                resolve(chunk);
            });
            res.on('end', () => {
            })
        });

        req.on('error', (e) => {
            reject(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(paramsString);
        req.end();
    })
}