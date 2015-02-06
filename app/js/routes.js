'use strict';

/* Controllers */

angular.module('myApp.routes', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state("home", {
                url: '/',
                templateUrl: 'views/home.html'
            })

            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })

            .state("profile", {
                url:'/profile',
                templateUrl:'views/profile.html'
            })

            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller:"DashboardCtrl"
            })

            .state('sex',{
                url: '/sex',
                templateUrl: 'views/sex.html',
                controller: 'SexCtrl',
                resolve: {
                    friendsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getFriends();
                    }]
                }
            })

            .state('care-me-most', {
                url: '/care-me-most',
                templateUrl: 'views/carememost.html',
                controller:'CareMeMost',
                resolve: {
                    feedsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getMyFeeds();
                    }],
                    me:['authentication','facebookAPI',function(authentication,facebookAPI){
                        return facebookAPI.getMe();
                    }]
                }
            })
            .state('like-me-most', {
                url: '/like-me-most',
                templateUrl: 'views/likememost.html',
                controller:'LikeMeMost',
                resolve: {
                    feedsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getMyFeeds();
                    }]
                }
            })
            .state('narcissistic', {
                url: '/narcissistic',
                templateUrl: 'views/narcissistic.html',
                controller: 'NarcissisticCtrl',
                resolve: {
                    friendsAlbums: ['facebookAPI', function(facebookAPI) {
                        return facebookAPI.getFriendsAlbums();
                    }]
                }
            })
            .state('networkmap',{
                url:'/networkmap',
                templateUrl:'views/networkmap.html',
                controller:'NetworkmapCtrl',
                resolve:{
                    friendsList:['facebookAPI',function(facebookAPI) {
                        return facebookAPI.getFriends();
                    }]
                }
            })
            .state('mutualfriends', {
                url:'/mutualfriends',
                templateUrl:'views/mutualfriends.html',
                controller:'MutualFriendsCtrl',
                resolve: {
                    mutualFriends :['facebookAPI', function(facebookAPI) {
                        return facebookAPI.getAllMutualFriends();
                    }],
                    basicFriends: ['facebookAPI', function(facebookAPI) {
                        return facebookAPI.getFriendsBasic();
                    }]
                }
            })

    }])

    .controller('SexCtrl', ['$scope', 'friendsList', function($scope, friendsList){
        $scope.friends = friendsList;
        $scope.male = 0
        $scope.female = 0;
        $scope.total = friendsList.data.length;

        for (var x in friendsList.data) {
            if (friendsList.data[x].gender == 'male') {
                $scope.male++;
            } else {
                $scope.female++;
            }
        }

        var sexRatio = [
            {
                key: "Male",
                y: $scope.male
            },
            {
                key: "Female",
                y: $scope.female
            }
        ];


        nv.addGraph(function() {
            var width = 500,
                height = 500;

            var chart = nv.models.pieChart()
                .x(function(d) { return d.key })
                .y(function(d) { return d.y })
                .color(d3.scale.category10().range())
                .width(width)
                .height(height);

            d3.select("#sexratio")
                .datum(sexRatio)
                .transition().duration(1200) // there's no duration now?
                .attr('width', width)
                .attr('height', height)
                .call(chart);

            chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

            return chart;
        });

    }])

    .controller('CareMeMost', ['$scope', 'feedsList', 'me', 'utils',function($scope,feedsList,me,utils){
        $scope.feeds = feedsList.data ;
        $scope.profile = me;
        $scope.count = {}
        for (var x in feedsList.data) {
            if (feedsList.data[x].comments) {

                for (var i in feedsList.data[x].comments.data) {
                    if ($scope.count[feedsList.data[x].comments.data[i].from.name]) {
                        $scope.count[feedsList.data[x].comments.data[i].from.name] ++;
                    } else {
                        $scope.count[feedsList.data[x].comments.data[i].from.name] = 1;
                    }
                }
            }
        }

        $scope.names = utils.removeSelf($scope.profile.name, utils.hashSortbyValue($scope.count));
        $scope.pictures = utils.searchPicture($scope.names,$scope.friendsPicture.friends.data);

        $scope.results = {};
        for (var i = 0; i < 6; i++) {
            $scope.results[$scope.names[i]] = $scope.pictures[i];
        }

    }])

    .controller('LikeMeMost', ['$scope', 'feedsList', 'utils', '$log', function($scope,feedsList,utils, $log){
        $scope.feeds = feedsList.data ;
        $scope.count = {}

        for (var x in feedsList.data) {
            if (feedsList.data[x].likes) {
                for (var i in feedsList.data[x].likes.data) {
                    if ($scope.count[feedsList.data[x].likes.data[i].name]) {
                        $scope.count[feedsList.data[x].likes.data[i].name] ++;
                    } else {
                        $scope.count[feedsList.data[x].likes.data[i].name] = 1;
                    }
                }
            }
        }


        $scope.names = utils.hashSortbyValue($scope.count);
        $scope.pictures = utils.searchPicture($scope.names,$scope.friendsPicture.friends.data);

        console.log($scope.names);
        $scope.results = {};
        for (var i = 0; i < 6; i++) {
            $scope.results[$scope.names[i]] = $scope.pictures[i];
        }

    }])

    /**
     * if (friendsAlbums.data[x].albums)  -- this sets for Sheldon, I Can't get his data from API but website works
     * if (friendsAlbums.data[x].albums.data[i]) -- this sets for Flynn? or the following one
     *
     * Algorithm:
     * 1.get pictures account
     *   - if count >=10   chu?
     *   - if count < 10   buchu?
     *   - need to talk with yaxian.
     */

    .controller('NarcissisticCtrl', ['$scope', 'friendsAlbums','utils', function($scope, friendsAlbums, utils) {
        $scope.count = {};

        for (var x in friendsAlbums.data) {
            if (friendsAlbums.data[x].albums) {
                for (var i=0;  i<5 ; i++) {
                    if (friendsAlbums.data[x].albums.data[i]) {
                        if (friendsAlbums.data[x].albums.data[i].name == "Profile Pictures") {
                            $scope.count[friendsAlbums.data[x].name] = friendsAlbums.data[x].albums.data[i].count;

                        }
                    }
                }
            }
        }

        $scope.names = utils.hashSortbyValue($scope.count);
        $scope.pictures = utils.searchPicture($scope.names, $scope.friendsPicture.friends.data);

        $scope.results = {};
        for (var i = 0; i < 6; i++) {
            $scope.results[$scope.names[i]] = $scope.pictures[i];
        }
    }])

    .controller('NetworkmapCtrl', ['$scope','friendsList','utils','$store', function($scope,friendsList,utils,$store){
        $scope.count={};

        for(var x in friendsList.data){
            if(friendsList.data[x].location){
                if($scope.count[friendsList.data[x].location.name]){
                    $scope.count[friendsList.data[x].location.name]++;
                }else {
                    $scope.count[friendsList.data[x].location.name] = 1;
                }
            }else if(friendsList.data[x].hometown){
                if($scope.count[friendsList.data[x].hometown.name]){
                    $scope.count[friendsList.data[x].hometown.name]++;
                }else {
                    $scope.count[friendsList.data[x].hometown.name] = 1;
                }
            }

        }

        $scope.result = utils.hashSortbyValue($scope.count);


        // Use Google Chart here
        var data = google.visualization.arrayToDataTable(utils.filterCity($scope.result));

        var options_world = {
            region: 'world',
            displayMode: 'markers',
            colorAxis: {colors: ['green', 'blue']}
        };

        var chart1 = new google.visualization.GeoChart(document.getElementById('chart_div1'));
        chart1.draw(data, options_world);

    }])

    .controller('MutualFriendsCtrl',['$scope','mutualFriends','basicFriends', 'utils',
        function($scope, mutualFriends, basicFriends, utils){

            $scope.mutualFriends =  mutualFriends;
            $scope.friends = basicFriends;
            $scope.friendsLink = []


            // return people $index in array
            function indexWithAttribute(array, attr, value) {
                for(var i = 0; i < array.length; i++) {
                    if(array[i][attr] === value) {
                        return i;
                    } else {
                        continue;
                    }
                }
            }

            function showFriendInfo(d) {
                // Displays given d3 node's 'name' attribute.
                document.getElementById('selected-friend-name').innerHTML = d['name'];
                document.getElementById('selected-friend-photo').setAttribute('src',d['picture']['data']['url']);
            }


            for (var i=0; i<basicFriends.length; i++) {
                // my friend may not have mutual friend with me.
                var completed = Math.round(100*(i/basicFriends.length));
                document.getElementById('load-status').innerHTML = 'Calculating mutual friend links: ' + completed + '%'
                if (mutualFriends.data[i].mutualfriends) {
                    for (var j=0; j< mutualFriends.data[i].mutualfriends.data.length;j++){
                        if($scope.friends[i]) {
                            $scope.friends[i].value = mutualFriends.data[i].mutualfriends.data.length;
                            var targetIndex = indexWithAttribute(basicFriends,'id',mutualFriends.data[i].mutualfriends.data[j]['id']);
                            $scope.friendsLink.push(
                                {
                                    'source' : i,
                                    'target': targetIndex,
                                    'value': mutualFriends.data[i].mutualfriends.data.length
                                }
                            )
                        }
                    }
                }

                if(i === basicFriends.length -1) {
                    graphFriends($scope.friends, $scope.friendsLink);
                }
            }

            function graphFriends(friends, friendlinks) {
                // Configures a d3 force-directed graph of friends and friend links.
                document.getElementById('load-status').innerHTML = ''

                // Set dimensions of svg
                // innerWidth get self window width and length -- here, the window means the all browser window
                var width = window.innerWidth /2 + 150,
                    height = window.innerHeight /2 + 150;

                console.log(height)

                // Set up a 10-color scale for node colors
                var color = d3.scale.category20();

                // Set up a linear scale to map number of mutual
                // friends to node radius
                var r = d3.scale.linear()
                    .domain([1,100])
                    .range([5,15]);

                // Set the initial parameters of the force() layout
                var force = d3.layout.force()
                    .charge(-100)
                    .linkDistance(50)
                    .size([width, height]);

                // Add svg and start visualization
                var svg = d3.select("#viz").append("svg")
                    .attr("width", width)
                    .attr("height", height);

                // Pass in friends array as graph nodes and friendlinks
                // array as graph edges.
                force
                    .nodes(friends)
                    .links(friendlinks)
                    .start();

                var link = svg.selectAll("line.link")
                    .data(friendlinks)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke", "rgba(200, 200, 200, 0.2)")
                    .style("stroke-width", 2);

                var node = svg.selectAll("circle.node")
                    .data(friends)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", function(d) { return r(d.value); })
                    .style("stroke", "rgba(200, 200, 200, 0.2)")
                    .style("fill", function(d) { return color(d.value); })
                    .on("mouseover", function(d) { showFriendInfo(d); })
                    .call(force.drag);

                force.on("tick", function() {
                    node.attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });

                    link.attr("link-id",function(d) { return d.sourceId })
                        .attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });
                });

            }

        }])