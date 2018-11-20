import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import * as fetch from "fetch";
const host = "https://tranquil-everglades-39497.herokuapp.com";

export class ConversationViewModel extends Observable {

    userMessage = "";
    chats = new ObservableArray([]);
    listView = null;

    public onSend = () => { // gets called when the user taps the "send" button
        console.log(this.userMessage);
        if(this.userMessage.trim() !== "") { // if it's not an empty message

            this.chats.push({
                "who" : "user",
                "message" : this.userMessage
            });

            // Now, fetch a response from the server.
            fetch.fetch(host + "/bot-reply-system", 
                {method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    "username" : "user",
                    "message" : this.userMessage
                })
            })
            .then((response) => {

                if(!response.ok) {

                    const responseObj = response.json();
                    if(!response.error) {

                        responseObj.error = "Something went wrong!";
                        console.log(responseObj.error);

                    }

                    return responseObj;

                }

                return response.json();

            })
            .then((response) => {

                const botReply = {
                    "who" : "bot",
                    "message" : ""
                };

                if(response.error) {

                    console.log("Couldn't talk to the bot.");
                    botReply.message = response.error;

                } else {

                    botReply.message = response.reply;

                }

                this.chats.push(botReply);
                const count = this.listView.items.length;
                this.listView.scrollToIndex(count - 1);

            });

        }

        this.set("userMessage", "");
        return this;

    }

}