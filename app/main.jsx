var React = require('react');
var ReactDOM = require('react-dom');

var ButtonComponent = React.createClass({
	buttonHandleClick: function(){
		this.props.mainHandleClick(this.props.increment)
	},
	render: function(){
		var disabled
		disabled = this.props.selectedNumbers.length === 0
		return(
			<div id="button-component">
				<button 
					className="btn btn-primary btn-lg"
					disabled={disabled} 
					onClick={this.buttonHandleClick}>
					=
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
			className,
			selectedNumbers = this.props.selectedNumbers;
		for(var i=1; i<=9; i++){
			className = "number selected-"+(selectedNumbers.indexOf(i)>=0)
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
			selectedNumbers: []
		}
	},
	selectNumber: function(clickedNumber){
		if(this.state.selectedNumbers.indexOf(clickedNumber) < 0){
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
			})
		}
	},
	unselectNumber: function(clickedNumber){
		var selectedNumbers = this.state.selectedNumbers,
			indexOfNumber = selectedNumbers.indexOf(clickedNumber)

		selectedNumbers.splice(indexOfNumber, 1)

		this.setState({ selectedNumbers: selectedNumbers })
	},
	render: function(){
		var selectedNumbers = this.state.selectedNumbers,
			numberOfStars = this.state.numberOfStars
		return(
			<div>
				<div className='row'>
					<div className='col-md-5'>
						<StarsComponent numberOfStars={numberOfStars} />
					</div>
					<div className='col-md-2'>
						<ButtonComponent 
							selectedNumbers={selectedNumbers}
							mainHandleClick={this.handleClick} increment={1} />
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
						selectNumber={this.selectNumber}/>
				</div>
			</div>
		)
	}
})

ReactDOM.render(<MainComponent />, document.getElementById("app"))