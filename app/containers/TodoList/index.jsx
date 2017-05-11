import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoActions from '../../actions/todolist';
import {VisibilityFilters} from  '../../constants/todolist'
import * as appActions from '../../actions/app'
import './index.scss'
class TodoList extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let _this = this; //缓存this
		// const { dispatch, visibleTodos, visibilityFilter } = this.props;
		return (
			 <div className='todos'>
		        <input type="text" ref='input' onKeyUp={this.handlerKeyUp.bind(this)}/> 
		        <button onClick={this.addTodos.bind(this)}>Add</button>
		        <ul className="option">
		          <li onClick={this.setVisibility.bind(this,'SHOW_ALL')}>
		            <span style={{textDecoration: this.props.visibilityFilter!='SHOW_ALL' ? 'underline' : 'none'}}>ShowAll</span>
		          </li>
		          <li onClick={this.setVisibility.bind(this,'SHOW_ACTIVE')}>
		            <span style={{textDecoration: this.props.visibilityFilter!='SHOW_ACTIVE' ? 'underline' : 'none'}}>ShowActive</span>
		          </li>
		          <li onClick={this.setVisibility.bind(this,'SHOW_COMPLETED')}>
		            <span style={{textDecoration: this.props.visibilityFilter!='SHOW_COMPLETED' ? 'underline' : 'none'}}>ShowCompleted</span>
		          </li> 
		        </ul>
		        <ul className="list">
		          {
		          	this.props.visibleTodos.length 
		          	?
		            this.props.visibleTodos.map(function(item, index){ 
		            	//通过list数组map映射为虚拟DOM节点
		              return <li key={index} >
		                        <span style={{textDecoration: item.completed ? 'line-through': 'none'}} onClick={_this.completeTodos.bind(_this,index)}>
		                        	{index+1} : {item.text}
		                        </span>
		                     </li>
		            })
		            :
		            ''
		          }
		        </ul>
		      </div>
		)
	}
	handlerKeyUp(event){
        if(event.keyCode === 13){
            this.addTodos();
        }
    }
	addTodos() {
		const inputNode = this.refs.input;
	    const text = inputNode.value.trim();
	    this.props.todoActionList.addTodo(text);
	    inputNode.value = '';
	}
	setVisibility(val) {
		this.props.todoActionList.setVisibilityFilter(val)
	}
	componentDidMount() {
		this.props.appActionList.menu({
			location: 4
		});
		// console.log(this.props.visibleTodos);
	}
	completeTodos(e,index) {
		this.props.todoActionList.completeTodo(e)
	}
}
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

function mapStateToProps(state){
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    	visibilityFilter: state.visibilityFilter
	}
}

function mapDispatchToProps(dispatch){
	return {
		appActionList:bindActionCreators(appActions,dispatch),
		todoActionList:bindActionCreators(todoActions,dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(TodoList);