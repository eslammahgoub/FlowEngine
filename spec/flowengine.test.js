/**
 * [Testing File by jasmine]
 */
describe('Flow Engine', function() {
    var engine,server,mockData;

    beforeEach(function() {
        engine = new app.FlowEngine({
          play: true,
          gameType:'chess',
          moveKing:'forward',
          moveQueen:'left'
        });
        mockData=[
          {"id":"1","title":"Rule 1 playing the Game","body":"function(obj){return obj.play==true;}","true_id":2,"false_id":3},
          {"id":"2","title":"Rule 2 the Game Type","body":"function(obj){return obj.gameType=='chess';}","true_id":3,"false_id":4},
          {"id":"3","title":"Rule 3 the Game rule One","body":"function(obj){return obj.moveKing=='forward';}","true_id":4,"false_id":4},
          {"id":"4","title":"Rule 4 the Game rule Two","body":"function(obj){return obj.moveQueen=='right';}","true_id":null,"false_id":null}
        ];
    });


    it('create an instance of engine class', function() {
        expect(engine).toBeTruthy();
    });
    it('initialize the workflow by loading the JSON file', function() {
        var server = sinon.fakeServer.create();
        server.respondWith("GET", "data/rules.json",
            [200, { "Content-Type": "application/json" },
                JSON.stringify(mockData)]);
        engine.init();
        server.respond();
        expect(engine.rules).toEqual(mockData);

    });

    it('function checkRule to check the currentRule', function() {
      engine.rules=mockData;
      var statusObj = {};
      statusObj.message = "Rule 1 playing the Game (#1), Passed";
      statusObj.messageType = "success";
      statusObj.nextRuleId = 2;
      statusObj.result = 'passed';
      expect(engine.checkRule(1)).toEqual(jasmine.objectContaining(statusObj));
    });

    it('function getRuleById to get CurrentRule By ID',function() {
      engine.rules=mockData;
      var ruleObj = {};
      ruleObj.title = "Rule 2 the Game Type";
      ruleObj.body = "function(obj){return obj.gameType=='chess';}";
      ruleObj.true_id = 3;
      ruleObj.false_id = 4;
      expect(engine.getRuleById(2)).toEqual(jasmine.objectContaining(ruleObj));
    });

    it('function nextRule to execute next Rule', function() {
      engine.rules=mockData;
      var status=engine.checkRule(1);
      expect(engine.nextRule(status)).toEqual(engine.executeRule(status.nextRuleId));
    });

    it('check rule and return status object', function() {
        engine.rules=mockData;
        var status=engine.checkRule(1);
        expect(status).toBeTruthy();
        expect(status.message).toEqual("Rule 1 playing the Game (#1), Passed");
        expect(status.messageType).toEqual("success");
        expect(status.nextRuleId).toEqual(2);
        expect(status.result).toEqual("passed");
    });

    it('select a rule from the object json', function() {
        engine.rules=mockData;
        var rule=engine.getRuleById(2);
        expect(rule).toBeTruthy();
        expect(rule.title).toEqual("Rule 2 the Game Type");
        expect(rule.body).toEqual("function(obj){return obj.gameType=='chess';}");
        expect(rule.true_id).toEqual(3);
        expect(rule.false_id).toEqual(4);
    });
});
