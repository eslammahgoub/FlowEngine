/**
 * INIT FlowEngine
 * :) Start the Game of Your type
 */
(function(){
  var obj={
    play: true,
    gameType:'chess',
    moveKing:'forward',
    moveQueen:'left'
  };
  var engine = new app.FlowEngine(obj);
  engine.init();
})();
