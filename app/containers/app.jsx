import React, {Component} from 'react';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
// Switch ：监听空路由
// Route： 路由调转
// Redirect： 重定向
import createBrowserHistory from 'history/createBrowserHistory'
//redux流
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFiles from '../actions/userinfo'

//本地缓存配置
import { CITYNAME } from '../config/localStorekey'
import LocalStore from '../util/localStore'
// 路由配置
import Home from './Home'
import City from './City'
import Search from './Search'
import Footer from '../components/Footer'
import Movies from './Movies'
import MoviesDes from './MoviesDes'
import TodoList from './TodoList'
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initDone: false
		}
	}
	render() {
		const history = createBrowserHistory();
		return (
			<Router>
				{
					this.state.initDone 
					?
					<div id='app'>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route exact path="/city" component={City}/>
							<Route exact path="/search/:category/:keyword?" component={Search}/>
							<Route exact path="/movies" component={Movies}/>
							<Route exact path="/moviesdes/:id" component={MoviesDes}/>
							<Route exact path="/todolist" component={TodoList}/>
						</Switch>
						<Footer history={history}/>
					</div> 
					:
					<div>
						正在加载。。。
					</div>
				}
			</Router>
		)
		
	}
	componentDidMount() {
			let cityName = LocalStore.getItem(CITYNAME);
			if(cityName == null) {
				cityName = '北京';
			}
			this.props.userInfoActions.update({
				cityName: cityName
			});
			this.setState({
				initDone:true
			})
		}
}


// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的
function mapStateToProps(state){
	return {
	}
}
// 哪些 action 创建函数是我们想要通过 props 获取的
function mapDispatchToProps(dispatch) {
	return {
		userInfoActions: bindActionCreators(userInfoActionsFromOtherFiles,dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);