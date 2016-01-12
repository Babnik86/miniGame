'use strict';


miniGamemvc.controller('MiniGameCtrl', function MiniGameCtrl($scope, $timeout, $interval,$location, $window) {
	
	$scope.arrBricks = [];
	$scope.bricksColor = ["yellow", "blue", "brown", "darkblue", "grey", "orange"];
	$scope.color = "yellow";
	$scope.timeline = 20;
	
	
	function overGame(){
		$scope.loseScreen = true;
		$timeout(function(){
			$scope.allowRestart = true;
		}, 5000);
	};
	function winGame(){
		$scope.winScreen = true;
		$timeout(function(){
			$scope.allowRestart = true;
		}, 5000);
	};
	
	
	
	
	function randomInteger(min, max) {
	   var rand = min + Math.random() * (max - min)
	   rand = Math.round(rand);
	   return rand;
	}
	
	$scope.restartGame = function(){
		if ($scope.loseScreen || $scope.winScreen){
			if ($scope.allowRestart){
					$location.path($location.path());
					$window.location.reload(true);
			};
		}
	}
	
	for (var i = 0; i < 46; i++) {
		$scope.arrBricks[i]=[];
		
		if (i<2){
			$scope.arrBricks[i]["visible"] = true;
		}else{
			$scope.arrBricks[i]["visible"] = false;
		}		
	};
	
	var count = 2;
	var tmpCount = 0;
	$scope.moveToCastle = function(){
		if (count===2 && tmpCount===0){
			$scope.animation = true;
			$scope.timeInt = $timeout(overGame, 20000);
			$scope.timeLineInt = $interval(function() {
				if ($scope.timeline>0){
					$scope.timeline--;
				}
			}, 1000);
		}
		if(tmpCount===1 && $scope.arrBricks[count]){
			$scope.color = $scope.bricksColor[randomInteger(0,5)];
			$scope.arrBricks[count]["visible"] = true;
			count++;
			tmpCount = 0;
		}else{
			tmpCount++;
		};
		if (count>45){
			$timeout.cancel($scope.timeInt);
			$interval.cancel($scope.timeLineInt);
			winGame();
		}
	}
	
	
	
	
	
	
});
