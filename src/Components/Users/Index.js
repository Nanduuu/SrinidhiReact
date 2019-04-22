import React from 'react';
import {connect} from 'react-redux';
import UserDetails from './UserDetails';
import PasswordReset from './PasswordReset';
import { Collapse ,Divider} from 'antd';
import {Redirect} from 'react-router-dom';


const Panel = Collapse.Panel;

const Namebar = (props)=>{
	return (<Divider orientation="left" style={{margin:0}}>
						<span>{props.text}</span> 
			</Divider> )
}

const mapStateToProps = (state)=>{
	return{
		role : state.Reducer.user.Role,
		UserId : state.Reducer.user.UserId,
		
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		
		
	}

}



class Invoice extends React.Component{
	constructor(props){
		super(props);
	}

	isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}
	render(){
		return(
				<div>
					{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
					<Collapse accordion >
					<Panel header =  { <Namebar text= {"UserDetails"} />} key="1">
						<UserDetails/>
					</Panel>
				
					<Panel header = { <Namebar text= { "Password Reset"} />} key="2">
						<PasswordReset/>
					</Panel>
										
				</Collapse>


				</div>
			)
	}
}



export default connect( mapStateToProps,mapDispatchToProps) (Invoice);