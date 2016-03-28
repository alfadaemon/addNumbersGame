var React = require('react');
var ReactDOM = require('react-dom');

var ButtonComponent = React.createClass({
	buttonHandleClick: function(){
		this.props.mainHandleClick(this.props.increment)
	},
	render: function(){
		var disabled, button, correct = this.props.correct
		switch( correct ){
			case true:
				button = (<button 
							className="btn btn-success btn-lg"
							onClick={this.props.acceptAnswer} >
								<span className="glyphicon glyphicon-ok"></span>
							</button>
						)
			break;
			case false:
				button = (<button 
							className="btn btn-danger btn-lg"
							disabled={disabled} >
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						)
			break;
			default:
				disabled = this.props.selectedNumbers.length === 0
				button = (<button 
							className="btn btn-primary btn-lg"
							disabled={disabled} 
							onClick={this.props.checkAnswer}>
							=
							</button>
						)
			break;

		}
		return(
			<div id="button-component">
				{button}
				<br /><br />
				<button 
					className="btn btn-warning btn-xs"
					onClick={this.props.redraw}
					disabled={this.props.redraws=0}>
					<span className="glyphicon glyphicon-refresh">
					</span>
					&nbsp;
					{this.props.redraws}
				</button>
			</div>
			)
	}
})

var AnswerComponent = React.createClass({
	render: function(){
		var props = this.props
		var selectedNumbers = props.selectedNumbers.map(function(i){
			return(
				<span className="number" onClick={props.unselectNumber.bind(null, i)}>
					{i}
				</span>
				)
		})


		return(
			<div id="answer-component">
				<div className='well'>
					{selectedNumbers}
				</div>
			</div>
			)
	}
})

var NumbersComponent = React.createClass({
	render: function(){
		var numbers = [], 
			selectNumber = this.props.selectNumber,
			usedNumbers = this.props.usedNumbers,
			className,
			selectedNumbers = this.props.selectedNumbers;
		for(var i=1; i<=9; i++){
			className = "number selected-"+(selectedNumbers.indexOf(i)>=0)
			className += " used-"+(usedNumbers.indexOf(i)>=0)
			numbers.push(
				<div className={className} 
					onClick={selectNumber.bind(null, i)}>
					{i}
				</div>
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
		var stars = []

		for(var i =0; i<this.props.numberOfStars; i++){
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
		return {
			numberOfStars : Math.floor(Math.random()*9)+1, 
			selectedNumbers: [],
			usedNumbers: [],
			redraws: 5,
			correct: null
		}
	},
	randomNumber: function(){
		this.setState({
			numberOfStars: Math.floor(Math.random()*9) + 1
		})
	},
	selectNumber: function(clickedNumber){
		if(this.state.selectedNumbers.indexOf(clickedNumber) < 0){
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
				correct: null
			})
		}
	},
	unselectNumber: function(clickedNumber){
		var selectedNumbers = this.state.selectedNumbers,
			indexOfNumber = selectedNumbers.indexOf(clickedNumber)

		selectedNumbers.splice(indexOfNumber, 1)

		this.setState({ 
				selectedNumbers: selectedNumbers,
				correct: null
			})
	},
	sumOfSelectedNumbers: function(){
		return this.state.selectedNumbers.reduce(function(previous, next){
			return previous+next
		}, 0)
	},
	checkAnswer: function(){
		var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers())
		this.setState({ correct: correct})
	},
	acceptAnswer: function(){
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers)
		this.setState({ 
			usedNumbers: usedNumbers,
			selectedNumbers: [],
			correct: null,
		})
		this.randomNumber()
	},
	redraw: function(){
		if(this.state.redraws==0){
			this.setState({//Reset all states
				correct: null,
				selectedNumbers: [],	
				redraws: 5,
				usedNumbers: []
			})
			alert('You loose!')
		} else {
			this.setState({
				correct: null,
				selectedNumbers: [],	
				redraws: this.state.redraws-1
			})
		}
		this.randomNumber()
	},
	render: function(){
		var selectedNumbers = this.state.selectedNumbers,
			numberOfStars = this.state.numberOfStars,
			usedNumbers = this.state.usedNumbers,
			redraws = this.state.redraws,
			correct = this.state.correct
		return(
			<div>
				<div className='row'>
					<div className='col-md-5'>
						<StarsComponent numberOfStars={numberOfStars} />
					</div>
					<div className='col-md-2'>
						<ButtonComponent 
							selectedNumbers={selectedNumbers}
							correct={correct}
							redraws={redraws}
							checkAnswer={this.checkAnswer}
							acceptAnswer={this.acceptAnswer}
							redraw={this.redraw} />
					</div>
					<div className='col-md-5'>
						<AnswerComponent 
							selectedNumbers={selectedNumbers}
							unselectNumber={this.unselectNumber} />
					</div>
				</div>
				<div className='row'>
					<NumbersComponent 
						selectedNumbers={selectedNumbers} 
						usedNumbers = {usedNumbers}
						selectNumber={this.selectNumber}/>
				</div>
			</div>
		)
	}
})

ReactDOM.render(<MainComponent />, document.getElementById("app"))