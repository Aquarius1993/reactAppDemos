import React,{Component} from 'react'
import './style.less'
class CurrentCity extends Component{
	constructor(props) {
	  super(props);
	}
	render(){
		return (
				<div className="current-city">
					{this.props.cityName}
				</div>
			)
	}
}
export default CurrentCity