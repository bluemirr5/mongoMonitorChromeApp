'use strict';

/* Controllers */

angular.module('mongoMonitorApp.controllers', [])
  .controller('RootCtrl', function($scope, serverStatus) {
	  var success = function(data) {
		var vo = {};
		vo.host = data.host;
		vo.version = data.version;
		vo.uptime = data.uptime;
		
		vo.ram = data.mem.resident;
		vo.virtual = data.mem.virtual;
		
		vo.dataFlushCount = data.backgroundFlushing.flushes;
		vo.dataFlushTotalTime = data.backgroundFlushing.total_ms;
		vo.dataFlushAvrTime = data.backgroundFlushing.average_ms;
		vo.pageFaults = data.extra_info.page_faults;
		vo.accessesNotInMemory = data.recordStats.accessesNotInMemory;
		vo.pageFaultExceptionsThrown = data.recordStats.pageFaultExceptionsThrown;
		
		vo.currentConnection = data.connections.current;
		vo.availableConnection = data.connections.available;
		vo.networkInByte = data.network.bytesIn;
		vo.networkOutByte = data.network.bytesOut;
		
		vo.readLockedTime = data.locks["."].timeLockedMicros.R;
		vo.writeLockedTime = data.locks["."].timeLockedMicros.W;
		vo.readSpendTime = data.locks["."].timeAcquiringMicros.R;
		vo.writeSpendTime = data.locks["."].timeAcquiringMicros.W;
		vo.totalQueue = data.globalLock.currentQueue.total;
		vo.readersQueue = data.globalLock.currentQueue.readers;
		vo.writersQueue = data.globalLock.currentQueue.writers;
		
		vo.opInsert = data.opcounters.insert;
		vo.opQuery = data.opcounters.query;
		vo.opUpdate = data.opcounters.update;
		vo.opDelete = data.opcounters.delete;
		
		$scope.vo = vo;
//		$scope.data = data;
		$scope.$apply();
	  };
	  var fail = function(statusCode, msg){
	  };
	  setInterval(function() {serverStatus.getStatus(success, fail);}, 1000);
  });
