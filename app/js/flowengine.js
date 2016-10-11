/**
 *
 * FlowEngine is an application that executes a flow consisting of several linked rules
 * in this case against some incoming data (a JSON string that can be parsed to a JavaScript object literal).
 *
 * @author Eslam Muhammad Mahgoub
 * @see github/eslammahgoub/FlowEngine
 * @example create object then put it onto engine and init the engine
 * var engine = new app.FlowEngine(obj);
 * engine.init();
 */
 var app=app || {};
(function(app){
  'use strict';

  /**
   * @var {Object} flowObj [public object]
   * @var {String} rulesURL [url for rules json file]
   */
  var flowObj = {},
      rulesURL = 'data/rules.json';

  /**
   * [FlowEngine Class constructor]
   * @constructor FlowEngine [class for flow engine]
   * @param {Object} flowEngineObj [the object to perform the flow]
   */
  function FlowEngine(flowEngineObj) {
    flowObj = flowEngineObj;
  };

  /**
   * @var {Array} rulesInfomration [rules of FlowEngine class]
   */
  FlowEngine.prototype.rulesInfomration = [];

  /**
   * [init of FlowEngine class by loading the Rules JSON, then invoking the first rule]
   * @function init
   */
  FlowEngine.prototype.init = function() {
    var self = this;

    /**
     * [successFun to handle success]
     * @function successFun
     */
    var successFun = function(rules) {
      if(rules) {
        self.engineMessages('start');
        self.rules = rules;
        self.executeRule(self.rules[0].id);
      }
    };

    /**
     * [failedFun to handle error]
     * @function failedFun
     */
    var failedFun = function(status) {
      app.utilities.logMessage(status + ' Error loading json file','error');
    }

    app.utilities.getRules(rulesURL,successFun,failedFun);
  };

  /**
   * [executeRule for execute rule body function]
   * @function executeRule
   * @param {String} id [id of rule to execute]
   */
  FlowEngine.prototype.executeRule = function(id) {
    var status = this.checkRule(id);

    app.utilities.logMessage(status.message,status.messageType);

    if(status.nextRuleId) {
      this.nextRule(status);
    } else {
      this.engineMessages('end');
    }

  };

  /**
   * [getRuleById for get rule by id]
   * @function getRuleById
   * @param {String} id [id of rule to get All data of]
   */
  FlowEngine.prototype.getRuleById = function(id) {
    for (var i = 0; i < this.rules.length; i++) {
        if (this.rules[i].id == id)
            return this.rules[i];
    }
  };

  /**
   * [nextRule for define next Rule]
   * @function nextRule
   * @param {Object} status [object of status of nextRule to execute]
   */
  FlowEngine.prototype.nextRule = function(status) {
    return this.executeRule(status.nextRuleId);
  };

  /**
   * [perviousRule for define pervious Rule]
   * @function perviousRule
   * @param {Object} status [object of status of perviousRule to execute]
   */
  FlowEngine.prototype.perviousRule = function(status) {
    this.executeRule(status.nextRuleId);
  };

  /**
   * [checkRule for check body rule to pass or fail]
   * @function checkRule
   * @param {String} id [id of Rule to check]
   */
  FlowEngine.prototype.checkRule = function(id) {
    var currentRule = this.getRuleById(id);
    var status = {};
    var func;
    func = eval('('+ currentRule.body +')');
    if(func(flowObj)){
      status.message = currentRule.title + " (#" + id + "), Passed";
      status.messageType="success";
      status.nextRuleId = currentRule.true_id;
      status.result='passed';
    } else {
      status.message = currentRule.title + " (#" + id + "), Failed";
      status.messageType="error";
      status.nextRuleId = currentRule.false_id;
      status.result="failed";
    }
    return status;
  };

  /**
   * [engineMessages messages for engine on start or end]
   * @function engineMessages
   * @param {String} status [status of engine]
   */
  FlowEngine.prototype.engineMessages = function(status) {
    switch (status){
      case 'start':
        return app.utilities.logMessage("Flow Started", "start");
        break;
      case 'end':
        return app.utilities.logMessage("Flow Ended", "end");
        break;
    }
  };

  app.FlowEngine = FlowEngine;
})(app);
