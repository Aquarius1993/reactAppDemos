import React,{Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import './style.less'

class Footer extends Component{
	constructor(props) {
	  super(props);
	}
	render(){
		const menu = this.props.app.location;
		return (
				<div>
				{
					menu === 0
					?   ''
					:   <div id="common-footer">
							<ul className="footer-list">
								<li>
									{
										menu === 1
										? <span className="active">首页</span>
										: <Link to="/"><span>首页</span></Link>
									}							
								</li>
								<li>
									{
										menu === 2
										? <span className="active">电影</span>
										: <Link to='/movies'><span>电影</span></Link>
									}
								</li>
								<li>
									{
										menu === 3
										? <span className="active">发现</span>
										: <Link to="/search/all"><span>发现</span></Link>
									}
								</li>
								<li>
									{
										menu === 4
										? <span className="active">todoList</span>
										: <Link to="/todolist"><span>todoList</span></Link>
									}
								</li>
							</ul>
					    </div>
				}
				</div>
			)
	}
	componentDidMount(){
		
	}
}

function mapStateToProps(state){
	return {
		app:state.app
	}
}

function mapDispatchToProps(dispatch){
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)