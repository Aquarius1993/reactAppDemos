import React,{Component} from 'react'
import {Link} from 'react-router-dom'
// import SearchInput from '../SearchInput'
import './style.less'

class HomeHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		}
	}
	render() {
		return (
			<div>
				<div id="home-header" className="clear-fix">
					<div className="home-header-left float-left">
						<Link to="/city">
						<span>{this.props.cityName}</span>
						&nbsp;
						<i className="icon-angle-down"></i>
						</Link>
					</div>
					<div className="home-header-right float-right">
						<Link to="/user">
						<i className="icon-user"></i>
						</Link>
					</div>
					{/*<SearchInput 
						value=""
						enterHandle={this.enterHandle.bind(this)}
					/>*/}
				</div>
			</div>
		);
	}
}
export default HomeHeader