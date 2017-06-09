/**
 * Created by blixit on 07/06/17.
 */
'use strict';

/**
 * @ngdoc function
 * @name galgasWebEditorApp.controller:editorCtrl
 * @description
 * # editorCtrl
 * Controller of the galgasWebEditorApp
 */
app
  .controller('editorCtrl', function ($scope, $route, $location, $rootScope, $routeParams, GWContainer) {

    $scope.defaultComponent = $routeParams.component_type || 'lexicon';
    $scope.component = null;
    $scope.editor = null;
    $scope.console = null;
    $scope.consoleInterface = null;

    $rootScope.hasDrawer = true;
    $rootScope.hasEditor = true;



    $scope.$on('$locationChangeStart', function(event, next, current) {
      $rootScope.hasDrawer = false;
      $rootScope.hasEditor = false;
      console.log($rootScope.hasDrawer);
      console.log($rootScope.hasEditor);
      //event.preventDefault();
      //$scope.$apply();
      //$route.reload();

    });

    $scope.init = function(){

      try{
        $scope.component = GWContainer.get('GWPComponent',[$scope.defaultComponent]);
        $scope.consoleInterface = GWContainer.get('GWConsoleInterface');
        $scope.console = $scope.consoleInterface.getConsole();

      }catch (e){
        $location.path($route.getUndecoratedRoute('error')).search({
          name: e.constructor.name,
          message: e.toString(),
          note: $rootScope.messages.criticalError()
        });
      }

      //TEST
      $scope.component.sourceCode = "{" +
        " get started on "+ $scope.component.name +" ! " +
        "}";

    };

    $scope.onWriterLoaded = function (_editor) {
      // Editor part
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;

      _editor.$blockScrolling = Infinity;


      _editor.setFontSize(20);
      var jeditor = $('#editor');
      jeditor.width($(window).width());
      jeditor.height(0.60 * $(window).height());

      // Options
      _session.setUndoManager(new ace.UndoManager());
      _renderer.setOption('showLineNumbers', true);
      _renderer.setShowGutter(true);

      // Events
      //_editor.on("changeSession", function(){ ... });
      //_session.on("change", function(){ ... });

      $scope.editor = _editor;

    };

    $scope.onConsoleLoaded = function (_editor) {

      $scope.consoleInterface.setHeader("Wellcome to the Galgas Web Console\n");

      $scope.consoleInterface.init(_editor,function (_editor) {

          // Editor part
          var _session = _editor.getSession();
          var _renderer = _editor.renderer;

          _editor.$blockScrolling = Infinity;

          _editor.setFontSize(18);
          _editor.setReadOnly(true);

          var jeditor = $($scope.console.editorId);
          jeditor.width($(window).width());
          jeditor.height(0.25 * $(window).height());

      });



    };

    $scope.eval = function () {

      var start = $scope.console.editor.getSession().getLength();

      $scope.consoleInterface
        .appendLine("----------------------------------------------------")
        .appendLine("At "+(new Date()).toTimeString())
        .appendLine("Error Message here")
        .appendLine("");


      GWEditorInterfaceFactory.highLight($scope.console.editor.getSession(),start,start+1,"console_markers_warning");

      $scope.consoleInterface.scrollToBottom();
    };

    $scope.consoleHeader = function (text) {
      return"Galgas Mini Console\n" +
        "**\n" + text + "\n";
    };

    $scope.toggleConsoleVisibility = function () {
      $scope.consoleInterface.toggleVisibility('#editor');
    };

    $scope.toggleConsoleMode = function () {
      $scope.consoleInterface.toggleMode();
    };

  });
