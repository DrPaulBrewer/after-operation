/* Copyright 2017 Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

/* jshint esnext:true,eqeqeq:true,undef:true,lastsemic:true,strict:true,unused:true,node:true */

module.exports = function afterOperation(operation, success, evname){
    const eventName = evname || 'complete';
    if (operation===undefined) return Promise.reject("operation is undefined");
    if (typeof(operation.on)!=="function") return Promise.reject("operation.on is not a function");
    return new Promise(function(resolve, reject){
	operation.on(eventName, (data)=>{
	    operation.removeAllListeners();
	    if (typeof(success)==='function')
		return resolve(success(data));
	    resolve(success);
	});
	operation.on('error', (e)=>{
	    operation.removeAllListeners();
	    reject(e);
	});   
    });
};
