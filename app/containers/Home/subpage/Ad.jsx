import React, {
	Component
} from 'react'
import HomeAd from '../../../components/HomeAd'
import AdData from '../../../../mock/home/ad'
import {
	getAdData
} from '../../../fetch/home/home'

class Ad extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	render(){
		return (
			<div>{
				this.state.data.length 
				?
				<HomeAd data={this.state.data} />
				:
				<div>加载中...</div>
			}	
			</div>
		);
	}
	componentDidMount(){
		var result = getAdData();
		result.then(res => {
			// console.log(res);
			if(res.ok) {
				return res.json();
			}else {
				return AdData;
			}
		}).then(json => {
			const data = json;
			if(data.length) {
				this.setState({
					data: data
				})
			}
		}).catch(err => {
			console.log(err.message);
		})
	}
}

export default Ad