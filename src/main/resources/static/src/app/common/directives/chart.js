// angular.module('common.directives.chart', [])

// .directive('chart', function() {
//     return {
//         restrict: 'A',
//         link: function($scope, $elm, $attr) {
//             // Create the data table.
//             var data = new google.visualization.DataTable();
//             data.addColumn('string', 'Topping');
//             data.addColumn('number', 'Slices');
//             data.addRows([
//                 ['English', 3],
//                 ['Maths', 1],
//                 ['GK', 1],
//                 ['Accounts', 1],
//                 ['Finance', 2]
//             ]);

//             // Set chart options
//             var options = {
//                 'title': 'How Much Marks in each section',
//                 'width': 400,
//                 'height': 300
//             };

//             // Instantiate and draw our chart, passing in some options.
//             var chart = new google.visualization.PieChart($elm[0]);
//             chart.draw(data, options);
//         }
//     }
// });
