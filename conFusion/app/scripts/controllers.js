'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= [];
            menuFactory.getDishes()
            .then(function(response) {
            	$scope.dishes = response.data;
            });
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === '')) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        	$scope.dish = {};
        	menuFactory.getDish(parseInt($stateParams.id, 10))
        	.then(function(response) {
        		$scope.dish = response.data;
        		$scope.showDish = true;
        	});
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
        	
        	$scope.comment = {author: '', rating: 5, comment: '', date: ''};
            
            $scope.submitComment = function () {
                
        		$scope.comment.date = new Date().toISOString();
        		$scope.comment.rating = parseInt($scope.comment.rating); // Need to do this to enable sorting by rating
        		
                $scope.dish.comments.push($scope.comment);
                
                $scope.commentForm.$setPristine();
    			
                $scope.comment = {author: '', rating: 5, comment: '', date: ''};
            };
        }])
        
        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {
        	$scope.featureddish = {};
        	menuFactory.getDish(0)
        	.then(function(response) {
        		$scope.featureddish = response.data;
        		$scope.showDish = true;
        	});
        	
        	$scope.promotion = menuFactory.getPromotion(0);
        	
        	$scope.specialist = corporateFactory.getLeader(3);
        }])
        
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
        	$scope.leaders = corporateFactory.getLeaders();
        }]);
