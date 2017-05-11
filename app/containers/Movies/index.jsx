import React, {Component} from 'react';
import 'whatwg-fetch'
import 'es6-promise'
import './index.scss';
import $ from 'jquery'
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moviesList: [],
			isLoadingMore: false,
			page: 0
		}
		
	}
	loadMoreFn() {
		var _self = this;
		this.setState({
            isLoadingMore: true
        });

        var url = 'http://api.douban.com/v2/movie/top250?start=' + this.state.page *20;
		$.ajax({
	 		url: url,
            dataType: 'jsonp',
	 		success: function(data) {
	 			console.log(data);
	 			_self.setState({
	 				moviesList: _self.state.moviesList.concat(data.subjects),
	 				isLoadingMore: false
	 			});
	 		}
	 	});
	 	const page = this.state.page
        this.setState({
            page: page + 1
        })
	}
	componentDidMount() {
		var _self = this;
		this.props.appActionList.menu({
			location: 2
		});
	 	this.loadMoreFn();
	 	const wrapper = this.refs.wrapper;
	 	
	 	function callback(){
			const top = wrapper.getBoundingClientRect().top
			const windowHeight = window.screen.height

			if(top && top < windowHeight){
				_self.loadMoreFn();
			}
		}

		//滚动事件
		let timeAction;
		window.addEventListener('scroll',()=>{
			if(this.props.isLoadingMore){
				return;
			}

			if(timeAction){
				clearTimeout(timeAction);
			}

			timeAction = setTimeout(callback,50);
		});
	}
	directors(directors){
		var dis = '';
		for (var i = 0; i < directors.length ; i++) {
			dis =  dis + ((i == 0 )? "" : '、') + directors[i].name
		}
		return dis;
	}
	loadMoreHandle() {

	}
	render() {
		
		return (
			<div>
				{	this.state.moviesList.length 
					? 
					this.state.moviesList.map((value, index) => {
						return (
							<Link key={index}  to={{pathname:'/moviesdes/'+value.id}}>
								<div className="list-value clear-fix">
									<div className="item-img-container float-left">
										<img src={value.images.medium} alt={value.alt}/>
									</div>
									<div className="movie-content">
										<div className="movieName clear-fix">
											<h3 className="float-left">{value.title}</h3>
											<span className="float-left">/{value.year}</span>
										</div>
										<p className="directorname">
											导演：{this.directors(value.directors)}
										</p>
										<p className="rating">评分：{value.rating.average}</p>
										<p className="genres">类型：{value.genres.reduce((val,ind)=>{
											return val + (val == 0 ? "" : '、') + ind
										})}</p>
										
									</div>
								</div>
							</Link>
							
						)
					})
					:
					''
				}
				<div ref="wrapper">{
					this.state.moviesList.length%20!=0 
					?
					<span>没有更多了</span>
					:
						<div>
						{
							this.state.isLoadingMore
							? 
							<p className='loading'></p>
							: 
							this.state.moviesList.length 
							?
							<div className="load-more">
								<span onClick={this.loadMoreFn}>加载更多</span>
							</div>
							:
							<span className='hidden'></span>
						}
						</div>

				}
				</div>
					
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		userinfo:state.userinfo
	}
}

function mapDispatchToProps(dispatch){
	return {
		appActionList:bindActionCreators(appActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Movies)