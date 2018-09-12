import React, { Component } from 'react'
import mqtt from 'mqtt'

const client = mqtt.connect('tcp://mqtt-broker.vtex.com.br')

client.on('connect', function() {
    client.subscribe("vtex/falco/1/instore/checkin");
});

export default class HelloWorld extends Component {
	render() {
		return (
			<div>
				<MessageList />
			</div>
		)
	}
}

class MessageList extends Component {
	addMessage(message) {
        var updated = this.state.messages;
        updated.push(message);
        this.setState({messages: updated});
    }

    getInitialState() {
        return { messages: [] };
    }

    componentDidMount() {
        var self = this;

        client.on('message', function(topic, payload, packet) {
            self.addMessage({
                key: Date.now(),
                topic: topic,
                payload: payload.toString()
            });
        });
    }

    render() {
        const messageNodes = this.state.messages.map(function(message) {
            return (
                <li key={message.key}>{message}</li>
            );
		});

        return (
            <div id="messageList" className="table-block footer-push">
                <h1>Channel Name</h1>
                <ul className="messages">{messageNodes}</ul>
            </div>
        );
    }
}