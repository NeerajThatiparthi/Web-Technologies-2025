let app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    $scope.title = "Weather App";
    $scope.weather = null;
    $scope.error = null;

    $scope.getWeather = function () {
        const apiKey = "bdb1a7290c40fe16a93c5dc4bc5dd7eb";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&units=metric&appid=${apiKey}`;

        // Make the API call using Axios
        axios
            .get(apiUrl)
            .then(function (response) {
                const data = response.data;
                $scope.weather = {
                    temp: data.main.temp,
                    description: data.weather[0].description,
                };
                $scope.error = null;
                $scope.$apply(); // Trigger digest cycle to update the view
            })
            .catch(function (error) {
                $scope.weather = null;
                if (error.response) {
                    $scope.error = "City not found or invalid API key!";
                } else {
                    $scope.error = "Network error, please try again!";
                }
                $scope.$apply(); // Trigger digest cycle to update the view
            });
    };
});
