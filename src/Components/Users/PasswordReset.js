import React from 'react';
import { Button } from 'antd';
import {Row, Col } from 'antd';
import {Input,Select,message} from 'antd';
import axios from 'axios';
import {connect} from 'react-redux';

const LabelStyle = {
  textAlign:"left",
  paddingTop:"10px",
}

const success = (text)=>{
  message.success(text)
}

const error = (text)=>{
  message.error(text)
}

const mapStateToprops = (state)=>{
  return{
    userDetails : state.Reducer.user,
  }
}

class PasswordReset extends React.Component{

  constructor(props){
    super(props);
    this.state={
      user_details_disabled : true,
      Fname : null,
      Lname: null,
      Email:null,
      Tel :null,
      oldPassword: null,
      newPassword:null,
      confirmPassword:null,
    }
  }

  enable = ()=>{
    this.setState({user_details_disabled   : !this.state.user_details_disabled  })
  }

  user_details_clear = ()=>{
      this.setState  ({
        Fname : null,
        Lname: null,
        Email:null,
        Tel :null,
      })
  }

  password_clear = ()=>{
    this.setState  ({
        oldPassword: null,
        newPassword:null,
        confirmPassword:null,

    })
  }

  OnChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value,
    })
  }

  componentDidMount(){

    this.setState({
      Fname : this.props.userDetails.Fname,
      Lname:this.props.userDetails.Lname,
      Email:this.props.userDetails.Email,
      Tel :this.props.userDetails.Tel,
    })
  }

  updateDetails =()=>{

    var re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = false;
    console.log(re.test(this.state.Email))

    if(this.state.Email==''){
      error('Please enter Email ID');
    }else if (!this.state.Fname){
      error('First name cannot be empty');
    }else if (!this.state.Tel){
      error('Telephone number cannot be empty');
    }else if(re.test(this.state.Email)){
        var state = this.state;
        var data = {
          Email : state.Email,
          Fname : state.Fname,
          Lname : state.Lname,
          Tel : state.Tel,
          userid : this.props.userDetails.UserId
        }  
        
        axios.post('/api/updateUserDetails/',data).then(function(res){
          console.log(res)
          if(res.data.success){
            success(res.data.msg)
            
            this.enable();

          }else{
            error(res.data.msg)
          }

        }.bind(this)).catch(function(err){
          error('Error at Serevr connection')
          console.log(err);
        })
    }else{
      error('Please enter proper email Id');
    }
    console.log(flag);
    
    
  }

  password_set =() =>{

    if(!this.state.oldPassword){
      error('Enter old password');
    }else if(!this.state.newPassword){
      error('Enter New password');

    }else if(!this.state.confirmPassword){
      error('Enter Confirm password');
    }else if( this.state.newPassword !== this.state.confirmPassword){
      error('Passwords not matching');
    }else{

      var data = {
        newPassword : this.state.newPassword,
        oldPassword : this.state.oldPassword,
        userid : this.props.userDetails.UserId,
      }
      axios.post('/api/updatePassword',data).then(function(res){
          console.log(res)
          if(res.data.success){
            success(res.data.msg)
            
            this.password_clear();

          }else{
            error(res.data.msg)
          }

      }.bind(this)).catch(function(err){
        if(err){
          error('Issue at Internet connection')
        }
      })
    }

  }

render(){

  return(
      <div style={{margin:"5px"}}>
           <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
               </Col>
           <Col xs={24} sm={20} md={16} lg={14} xl={14}> 
        
               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle}>
                   <lable > <b>Email Id </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Input name='Email' onChange= {this.OnChange} value = {this.state.Email} disabled = {this.state.user_details_disabled} />
                 </Col>
                 
               </Row>
               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle}>
                   <lable>  <b> First Name </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                   <Input name='Fname' onChange= {this.OnChange} value = {this.state.Fname} disabled = {this.state.user_details_disabled  } />
                 </Col>
                 
               </Row>
               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle}>
                   <lable> <b> Last Name </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10} >
                   <Input name='Lname' onChange= {this.OnChange} value = {this.state.Lname} disabled = {this.state.user_details_disabled  } />
                 </Col>
               </Row>
               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle} >
                   <lable> <b> Tele Phone </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                   <Input name = 'Tel' onChange= {this.OnChange} value = {this.state.Tel} disabled = {this.state.user_details_disabled  } />
                 </Col>
               </Row>
               
               
               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6}>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                   <Button type="primary" onClick = {this.enable} style={{margin:'10px'}} > 
                       {this.state.user_details_disabled ? 'Edit' : 'Cancel'}  
                    </Button>
                   <Button type="primary" onClick={this.updateDetails} style={{margin:'10px'}}  disabled = {this.state.user_details_disabled}> 
                       Update 
                   </Button>
      
                 </Col>
                 <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                 </Col>
               </Row>

               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle}>
                   <lable> <b> Old Password </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                   <Input type='password' name='oldPassword' onChange= {this.OnChange} value = {this.state.oldPassword} />
                 </Col>
                 
               </Row>

               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle}>
                   <lable> <b> New Password </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                   <Input type='password' name = 'newPassword' onChange= {this.OnChange} value = {this.state.newPassword}/>
                 </Col>
                 
               </Row>
               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6} style={LabelStyle}>
                   <lable> <b> Confirm Password </b> </lable>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                   <Input type='password' name='confirmPassword' onChange= {this.OnChange} value = {this.state.confirmPassword}/>
                 </Col>
               </Row>

               <Row>
                 <Col xs={10} sm={10} md={10} lg={6} xl={6}>
                 </Col>
                 <Col xs={10} sm={10} md={10} lg={10} xl={10} >
                   <Button onClick={this.password_set} type="primary" style={{margin:'10px'}} > Update </Button>
                   <Button onClick={this.password_clear } style={{margin:'10px'}} > Clear </Button>
                 </Col>
                 <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                 </Col>
               </Row>



           </Col>
           <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
               </Col>
      </div>
    )
  }
}

export default connect(mapStateToprops,null)(PasswordReset);