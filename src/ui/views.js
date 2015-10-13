define([],{init:function($templateCache){  'use strict';

  $templateCache.put('ui/board/board.html',
    "<div class=board><div class=board-row ng-repeat=\"i in getCollectionOfSize(size) track by $index\"><div class=board-cell ng-repeat=\"i in getCollectionOfSize(size) track by $index\" hi-cell cell-row={{$parent.$index}} cell-index={{$index}}></div></div></div>"
  );


  $templateCache.put('ui/cell/cell.html',
    "<div class=\"cell {{state}}\" ng-click=changeState()></div>"
  );
}});