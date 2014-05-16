'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('mongoMonitorApp.services', []).
	factory('serverStatus', function(){
		var serviceObj = {
			url : 'http://182.162.84.136:28017/serverStatus',
			userId : 'admin',
			password : 'aaaaaaa',
			getStatus : function(success, fail) {
				var userId = this.userId;
				var url = this.url;
				var password = this.password;
				var xhr = new XMLHttpRequest();
				if (userId && userId != null && userId != '') {
					xhr.open("GET", url, true, userId, password);
				} else { 
					xhr.open("GET", url, true); 
				}
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						switch(xhr.status) {
						case 200:
							var resp = JSON.parse(xhr.responseText);
							success(resp);
							break;
						case 400:
							fail(400, 'not found');
							break;
						default: 
							fail(xhr.status, 'unKnown');
							break;
						}
					} else {
						//fail(0, 'xhr not ready');
					}
			    }
			    xhr.send();
			},
		};
		return serviceObj;
	})