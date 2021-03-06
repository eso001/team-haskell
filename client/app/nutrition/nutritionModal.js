angular.module('myApp.nutritionModal', ['factories'])
  .controller('NutritionModalCtrl', function ($scope, $state, $http, AuthFactory, NutritionFactory, $cookies, $uibModal) {
    $scope.food = {query: ''}
    $scope.results = []
     // Date Modal
    $scope.today = function () {
      $scope.date = new Date()
    }

    $scope.today()
    $scope.format = 'dd-MMMM-yyyy'

    $scope.open1 = function () {
      $scope.popup1.opened = true
    }

    $scope.clear = function () {
      $scope.date = null
    }

    $scope.popup1 = {
      opened: false
    }

    $scope.submitFoodLog = function () {
      if (!$scope.date || !$scope.log.time) {
        console.log('Error: Missing fields.')
      } else {
        console.log('this is scope log date: ', $scope.log.date)
        NutritionFactory.submitFoodLog($cookies.get('username'), $scope.log.name, $scope.date, $scope.log.time, $scope.log.serving, $scope.log.size, $scope.log.cal, $scope.log.carbs, $scope.log.fat, $scope.log.fiber, $scope.log.sodium, $scope.log.protein, $scope.log.water)
        .then(function (data) {
          console.log($cookies.get('username'), $scope.log.name, $scope.date, $scope.log.time, $scope.log.serving, $scope.log.cal, $scope.log.carbs, $scope.log.fat, $scope.log.fiber, $scope.log.sodium, $scope.log.protein, $scope.log.water)
          swal('Nutritional Facts Saved!', 'Click OK to input another item.', 'success')
          $scope.log = {}
          $scope.asyncSelected = ''
          $scope.results = []
          $state.reload()
        })
      }
    }

    $scope.searchFoodDB = function (query) {
      NutritionFactory.searchFoodDB(query)
      .then(function success (data) {
        $scope.results = data.data.hits
        console.log('$scope.results =', $scope.results)
        return $scope.results
      }, function errorCallback (resp) {
        console.log('Error:', resp)
      })
    }

    $scope.getNutrition = function (item) {
      NutritionFactory.getNutrition(item)
      .then(function (data) {
        console.log('getNutrition data', data)
        var item = data.data
        $scope.log = {name: item.item_name,
                      serving: item.nf_serving_size_qty,
                      size: item.nf_serving_size_unit,
                      cal: item.nf_calories,
                      fat: item.nf_total_fat,
                      fiber: item.nf_dietary_fiber,
                      carbs: item.nf_total_carbohydrate,
                      sodium: item.nf_sodium,
                      protein: item.nf_protein
                     }
      })
    }

    $scope.hoverFn = function () {
      console.log('inside hoverFn')
    // $scope.hoverColor =  {'background-color': '#' + $scope.}
    }
  })
