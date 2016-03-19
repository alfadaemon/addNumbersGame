var React = require('react');
var ReactDOM = require('react-dom');

var ButtonComponent = React.createClass({
	buttonHandleClick: function(){
		this.props.mainHandleClick(this.props.increment)
	},
	render: function(){
		return(
			<button onClick={this.buttonHandleClick}>+{this.props.increment}</button>
			)
	}
})

var ResultComponent = React.createClass({
	render: function(){
		return(<div>{this.props.mainCounter}</div>)
	}
})

var MainComponent = React.createClass({
	getInitialState: function(){
		return {counter: 0}
	},
	handleClick: function(increment){
		this.setState({ counter: this.state.counter+increment})
	},
	render: function(){
		return(
			<div>
				<ButtonComponent mainHandleClick={this.handleClick} increment={1} />
				<ButtonComponent mainHandleClick={this.handleClick} increment={5} />
				<ButtonComponent mainHandleClick={this.handleClick} increment={10} />
				<ButtonComponent mainHandleClick={this.handleClick} increment={100} />
				<ResultComponent mainCounter={this.state.counter} />
			</div>
		)
	}
})

ReactDOM.render(<MainComponent />, document.getElementById("app"))