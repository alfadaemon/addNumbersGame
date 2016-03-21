var React = require('react');
var ReactDOM = require('react-dom');

var ButtonComponent = React.createClass({
	buttonHandleClick: function(){
		this.props.mainHandleClick(this.props.increment)
	},
	render: function(){
		return(
			<div id="button-component">
				<button className="btn btn-primary" onClick={this.buttonHandleClick}>
					=
				</button>
			</div>
			)
	}
})

var AnswerComponent = React.createClass({
	render: function(){
		return(
			<div id="answer-component">
				<div className='well'>
					{this.props.mainCounter}
				</div>
			</div>
			)
	}
})

var NumbersComponent = React.createClass({
	render: function(){
		var numbers = [];
		for(var i=1; i<=9; i++){
			numbers.push(
				<div className="number">{i}</div>
				)
		}
			
		return(
			<div id="numbers-component">
				<div className='well'>
					{numbers}
				</div>
			</div>
			)
	}
})

var StarsComponent = React.createClass({
	render: function(){
		var numberOfStars = Math.floor(Math.random()*9)+1
		var stars = []

		for(var i =0; i<numberOfStars; i++){
			stars.push(
				<span className="glyphicon glyphicon-star"></span>
				)
		}

		return(
			<div id='stars-component'>
				<div className="well">
					{stars}
				</div>
			</div>
			)
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
				<div className='row'>
					<div className='col-md-5'>
						<StarsComponent />
					</div>
					<div className='col-md-2'>
						<ButtonComponent mainHandleClick={this.handleClick} increment={1} />
					</div>
					<div className='col-md-5'>
						<AnswerComponent mainCounter={this.state.counter} />
					</div>
				</div>
				<div className='row'>
					<NumbersComponent />
				</div>
			</div>
		)
	}
})

ReactDOM.render(<MainComponent />, document.getElementById("app"))