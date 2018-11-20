"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var fetch = require("fetch");
var host = "https://tranquil-everglades-39497.herokuapp.com";
var ConversationViewModel = /** @class */ (function (_super) {
    __extends(ConversationViewModel, _super);
    function ConversationViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userMessage = "";
        _this.chats = new observable_array_1.ObservableArray([]);
        _this.listView = null;
        _this.onSend = function () {
            console.log(_this.userMessage);
            if (_this.userMessage.trim() !== "") { // if it's not an empty message
                _this.chats.push({
                    "who": "user",
                    "message": _this.userMessage
                });
                // Now, fetch a response from the server.
                fetch.fetch(host + "/bot-reply-system", { method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": "user",
                        "message": _this.userMessage
                    })
                })
                    .then(function (response) {
                    if (!response.ok) {
                        var responseObj = response.json();
                        if (!response.error) {
                            responseObj.error = "Something went wrong!";
                            console.log(responseObj.error);
                        }
                        return responseObj;
                    }
                    return response.json();
                })
                    .then(function (response) {
                    var botReply = {
                        "who": "bot",
                        "message": ""
                    };
                    if (response.error) {
                        console.log("Couldn't talk to the bot.");
                        botReply.message = response.error;
                    }
                    else {
                        botReply.message = response.reply;
                    }
                    _this.chats.push(botReply);
                    var count = _this.listView.items.length;
                    _this.listView.scrollToIndex(count - 1);
                });
            }
            _this.set("userMessage", "");
            return _this;
        };
        return _this;
    }
    return ConversationViewModel;
}(observable_1.Observable));
exports.ConversationViewModel = ConversationViewModel;
