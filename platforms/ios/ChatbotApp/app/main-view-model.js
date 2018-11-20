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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELDRGQUEwRjtBQUMxRiw2QkFBK0I7QUFDL0IsSUFBTSxJQUFJLEdBQUcsaURBQWlELENBQUM7QUFFL0Q7SUFBMkMseUNBQVU7SUFBckQ7UUFBQSxxRUE0RUM7UUExRUcsaUJBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsV0FBSyxHQUFHLElBQUksa0NBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxjQUFRLEdBQUcsSUFBSSxDQUFDO1FBRVQsWUFBTSxHQUFHO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsSUFBRyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLCtCQUErQjtnQkFFaEUsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1osS0FBSyxFQUFHLE1BQU07b0JBQ2QsU0FBUyxFQUFHLEtBQUksQ0FBQyxXQUFXO2lCQUMvQixDQUFDLENBQUM7Z0JBRUgseUNBQXlDO2dCQUN6QyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxtQkFBbUIsRUFDbEMsRUFBQyxNQUFNLEVBQUUsTUFBTTtvQkFDZixPQUFPLEVBQUc7d0JBQ04sY0FBYyxFQUFHLGtCQUFrQjtxQkFDdEM7b0JBQ0QsSUFBSSxFQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQ2xCLFVBQVUsRUFBRyxNQUFNO3dCQUNuQixTQUFTLEVBQUcsS0FBSSxDQUFDLFdBQVc7cUJBQy9CLENBQUM7aUJBQ0wsQ0FBQztxQkFDRCxJQUFJLENBQUMsVUFBQyxRQUFRO29CQUVYLElBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO3dCQUViLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDcEMsSUFBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7NEJBRWhCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7NEJBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUVsQzt3QkFFRCxPQUFPLFdBQVcsQ0FBQztxQkFFdEI7b0JBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRTNCLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsVUFBQyxRQUFRO29CQUVYLElBQU0sUUFBUSxHQUFHO3dCQUNiLEtBQUssRUFBRyxLQUFLO3dCQUNiLFNBQVMsRUFBRyxFQUFFO3FCQUNqQixDQUFDO29CQUVGLElBQUcsUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFFZixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7d0JBQ3pDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztxQkFFckM7eUJBQU07d0JBRUgsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO3FCQUVyQztvQkFFRCxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDMUIsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLENBQUMsQ0FBQyxDQUFDO2FBRU47WUFFRCxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QixPQUFPLEtBQUksQ0FBQztRQUVoQixDQUFDLENBQUE7O0lBRUwsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FBQyxBQTVFRCxDQUEyQyx1QkFBVSxHQTRFcEQ7QUE1RVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCAqIGFzIGZldGNoIGZyb20gXCJmZXRjaFwiO1xuY29uc3QgaG9zdCA9IFwiaHR0cHM6Ly90cmFucXVpbC1ldmVyZ2xhZGVzLTM5NDk3Lmhlcm9rdWFwcC5jb21cIjtcblxuZXhwb3J0IGNsYXNzIENvbnZlcnNhdGlvblZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgdXNlck1lc3NhZ2UgPSBcIlwiO1xuICAgIGNoYXRzID0gbmV3IE9ic2VydmFibGVBcnJheShbXSk7XG4gICAgbGlzdFZpZXcgPSBudWxsO1xuXG4gICAgcHVibGljIG9uU2VuZCA9ICgpID0+IHsgLy8gZ2V0cyBjYWxsZWQgd2hlbiB0aGUgdXNlciB0YXBzIHRoZSBcInNlbmRcIiBidXR0b25cbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyTWVzc2FnZSk7XG4gICAgICAgIGlmKHRoaXMudXNlck1lc3NhZ2UudHJpbSgpICE9PSBcIlwiKSB7IC8vIGlmIGl0J3Mgbm90IGFuIGVtcHR5IG1lc3NhZ2VcblxuICAgICAgICAgICAgdGhpcy5jaGF0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBcIndob1wiIDogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB0aGlzLnVzZXJNZXNzYWdlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTm93LCBmZXRjaCBhIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cbiAgICAgICAgICAgIGZldGNoLmZldGNoKGhvc3QgKyBcIi9ib3QtcmVwbHktc3lzdGVtXCIsIFxuICAgICAgICAgICAgICAgIHttZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnMgOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keSA6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiIDogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiIDogdGhpcy51c2VyTWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZighcmVzcG9uc2Uub2spIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZU9iaiA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlT2JqLmVycm9yID0gXCJTb21ldGhpbmcgd2VudCB3cm9uZyFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlT2JqLmVycm9yKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlT2JqO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYm90UmVwbHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwid2hvXCIgOiBcImJvdFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkbid0IHRhbGsgdG8gdGhlIGJvdC5cIik7XG4gICAgICAgICAgICAgICAgICAgIGJvdFJlcGx5Lm1lc3NhZ2UgPSByZXNwb25zZS5lcnJvcjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYm90UmVwbHkubWVzc2FnZSA9IHJlc3BvbnNlLnJlcGx5O1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0cy5wdXNoKGJvdFJlcGx5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubGlzdFZpZXcuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFZpZXcuc2Nyb2xsVG9JbmRleChjb3VudCAtIDEpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXQoXCJ1c2VyTWVzc2FnZVwiLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbn0iXX0=