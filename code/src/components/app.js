import React from "react"
import { LineChart, Line, Tooltip, YAxis } from "recharts"
import openGdaxWebsocket from "../gdax-websocket"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tickerMessages: []
    }
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    newTickerMessage.price = parseInt(newTickerMessage.price, 10)
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  // render() {
  //   return (
  //     <div>
  //       {this.state.tickerMessages.map(msg => (
  //         <div key={msg.sequence}>
  //           {msg.time}: <strong>{msg.price} EUR</strong>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

  render() {
    return (
      <LineChart width={800} height={400} data={this.state.tickerMessages}>
        <Line type="monotone" dataKey="price" stroke='#8884d8' strokeWidth={2} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />
        <Tooltip />
      </LineChart>
    )
  }

}

export default App
