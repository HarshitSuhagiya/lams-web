app.controller("loginCtrl",["$scope", "$http","$rootScope","userService","Constant","$state","Notification","$cookieStore",
		function($scope,$http,$rootScope,userService,Constant,$state,Notification,$cookieStore) {
	$scope.login = {};
	$scope.msg = null;
	$scope.doLogin = function(){
		if($scope.loginForm.$invalid){
			$scope.loginForm.$submitted = true;
			console.warn("Invalid Form Details");
			return false;
		}
		userService.login($scope.login).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$cookieStore.put(Constant.TOKEN,success.data.token);
	            		$rootScope.loadMasters()
	            		$state.go("web.lams.dashboard");
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
}]);
