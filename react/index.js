import React from 'react'
import { Connector } from 'mqtt-react'

import MessageList from './subscribe'

export default function HelloWorld() {
	return (
		<Connector mqttProps="tcp://mqtt-broker.vtex.com.br/">
			<MessageList />
		</Connector>
	)
}
