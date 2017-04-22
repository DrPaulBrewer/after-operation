/* jshint node:true,mocha:true,esnext:true,eqeqeq:true,undef:true,lastsemic:true */

const assert = require('assert');
require('should');
const EventEmitter = require('events');

const after = require("../index.js");

describe("afterOperation: ", function(){
    it("should be a function", function(){
	assert.ok(typeof(after)==='function');
    });
    it("should return a rejected Promise on undefined operation", function(done){
	const bad = ()=>(after(undefined, 23));
	bad().then(()=>(assert.ok(false)), ()=>(done()));
    });
    it("should return a rejected Promise if operation.on is not a function", function(done){
	const bad = ()=>(after({on: 'nope'}, 23));
	bad().then(()=>(assert.ok(false)), ()=>(done()));
    });
    it("should reject the returned Promise if the operation emits an error", function(done){
	const op = new EventEmitter();
	after(op, 23).then(()=>(assert.ok(false)), ()=>(done()));
	setTimeout(()=>(op.emit("error","oops")), 1000);
    });
    it("should resolve the returned Promise with the success value when the operation emits complete",
       function(done){
	   const op = new EventEmitter();
	   after(op,23).then(
	       (v)=>{
		   assert.equal(v,23);
		   done();
	       },
	       ()=>{
		   assert.ok(false);
	       });
	   setTimeout(()=>(op.emit("complete")), 1000);
       });
    it("should call the success function and resolve the promise to that value after the operation emits complete", function(done){
	const op = new EventEmitter();
	after(op, (x)=>(47+x)).then(
	    (v)=>{
		assert.equal(v,70);
		done();
	    },
	    ()=>{
		assert.ok(false);
	    });
	setTimeout(()=>(op.emit("complete", 23)), 1000);
    });
});    
