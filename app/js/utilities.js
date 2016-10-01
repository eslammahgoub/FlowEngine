/**
 * [Global app]
 */
var app=app || {};

/**
 * [utilities extra functions]
 */
app.utilities = {
  /**
   * [getRules function for get json file]
   * @param {string} url [url for json file]
   * @param {function} successHandler [callback for success function]
   * @param {function} errorHandler [error for error function]
   */
  getRules: function(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        var status;
        var data;
        if (xhr.readyState == 4) {
            status = xhr.status;
            statusText = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler(data);
            } else {
                errorHandler(statusText);
            }
        }
    };
    xhr.send();
  },
  /**
   * [logMessage function for Write colorful console log messages]
   * @param {String} message [the message to be logged]
   * @param {String} status  [the status w'll be success or error or end]
   */
  logMessage:function(message,status) {
      var color;
      switch (status){
          case 'success':
            color="green";
            break;
          case 'error':
            color="red";
            break;
          case 'start':
            color="gray";
            break;
          case 'end':
            color="blue";
            break;
          default:
            color="black";
      }
      console.log("%c" + message,"color: "+ color +"; font-size: medium");
  }
};
