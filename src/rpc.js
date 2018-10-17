/**
 * @public
 * 
 * @param {*} params.method mehtod name deined in python which we want to call
 */
var _rpc = function (params) {
    return new _rpc.rpc(params);
}
_rpc.rpc = function (params) {
    var self = this;
    // Add loading spinner while calling python method

    var loadingSpinner = document.createElement('div');
    loadingSpinner.className = "loading_spinner";
    loadingSpinner.innerHTML = "Fetching data"
    document.body.appendChild(loadingSpinner);

    var promise = new Promise(function (resolve, reject) {
        self[params.method](params, resolve);
    });
    return promise;
}
/**
 * @private
 * all method name should be same as python's method name
 * just decelare post method and pass your data
 * 
 */
_rpc.prototype = {
    scrap_git_Data : function (params, resolve) {
        var postUrl = "http://" + window.location.hostname + ":5000/" + params.method;
        fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "domain": params.data.domain, 
            },
        }).then(function(response) {
            return response.text();
        }).then(function(text){
            document.body.removeChild(document.getElementsByClassName("loading_spinner")[0]);
            resolve(text);
        });
    }
}
_rpc.rpc.prototype = _rpc.prototype;
module.exports = {
    _rpc: _rpc,
}
