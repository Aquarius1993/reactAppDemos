import React, {Component} from 'react';
import $ from 'jquery'
import  './index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
class MovieDes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moviesdes: ''
		}
	}
	componentDidMount() {
		var id = this.props.match.params.id;	
		var _self = this;
		
		var url = 'http://api.douban.com/v2/movie/subject/' + id;	
		$.ajax({
	 		url: url,
            dataType: 'jsonp',
	 		success: function(data) {
	 			console.log(data);
	 			_self.setState({
	 				moviesdes: data
	 			});
	 		}
	 	})
	 	this.props.appActionList.menu({
			location: 2
		});
	}
	render() {
		// var movie = this.state.moviesdes;
		return (
			<div className='moviesdes'>
				{this.state.moviesdes
					?

					<div>
						<h3 style={{textAlign:'center'}}>
							{this.state.moviesdes.title}
						</h3>
						<div className='bigImg'>
							<img src={this.state.moviesdes.images.large} alt=''/>
						</div>
						
						<p className="rating">
							评分：{this.state.moviesdes.rating.average}
						</p>
						<div className="directors">
							导演：
							{this.state.moviesdes.directors.map((val,index) => {
								return (
									<p key={index}>
										<img src={val.avatars.small} alt=""/>
										<span>{val.name}</span>
									</p>	
								)
							})}
						</div>
						<div className='casts'> 
							主演：
							{
								this.state.moviesdes.casts.map((val,index) => {
									return (
										<p key={index}>
											<img src={val.avatars.small} alt=""/>
											<span>{val.name}</span>
										</p>
									)
								})
							}
						</div>
						<p className="genres">类型：{this.state.moviesdes.genres.reduce((val,ind)=>{
							return val + (val == 0 ? "" : '、') + ind
						})}
						</p>
						<p style={{'lineHeight': 1.2,'fontSize': '14px'}}>
							简介：{this.state.moviesdes.summary}
						</p>
					</div>
					:
					<p className='loading'></p>
				}
				
			</div>
		)
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
)(MovieDes)