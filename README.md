# after-operation

[![Greenkeeper badge](https://badges.greenkeeper.io/DrPaulBrewer/after-operation.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/DrPaulBrewer/after-operation.svg?branch=master)](https://travis-ci.org/DrPaulBrewer/after-operation)
[![Coverage Status](https://coveralls.io/repos/github/DrPaulBrewer/after-operation/badge.svg?branch=master)](https://coveralls.io/github/DrPaulBrewer/after-operation?branch=master)

Helper for converting Google Compute Engine [tm] operation event-emitters to Promises

## Deprecation Notice

Oct. 2019: Since GCE operations support `operation.promise()` you should probably use that instead. 

## Installation

    npm i after-operation -S


## Initialization

    const after = require('after-operation');

## Usage

Promise to return a value after an operation completes:

    // some @google-cloud/compute method returns an operation
    after(operation, onSuccessValue)
    .then( (v)=>(assert.equal(v, onSuccessValue)) )
    .catch(logTheOperationErrors)

Promise to call a function after the operation completes:

    after(operation, (meta)=>(meta) )
    .then(doSomethingUseful)
    .catch(logTheOperationErrors)


Note that the success function gets fed with the metadata emitted in the operation 'complete' event.

By using the identity function as the success function, the promise will resolve to that metadata.

Note: after-operation will remove all operation listeners on either operation complete or operation error.

## Related modules by other authors 

[npm: event-to-promise](https://www.npmjs.com/package/event-to-promise) might be useful
with other eventEmitters.

## Copyright

2017 Paul Brewer - Economic and Financial Technology Consulting LLC <drpaulbrewer@eaftc.com>

## License

The MIT License

### Trademarks

Google Compute Engine [tm] is a trademark of Google, Inc.

This software is not a product of Google, Inc.

