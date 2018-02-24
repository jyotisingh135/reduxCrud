import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../../actions/index';
import FormModal from './modal';
import {addUser, addValues, deleteUser, editUser, pageAction, sortAction} from "../../actions/useraction";
import * as action from '../../actions/useraction';
class UserList extends Component{

    // componentDidMount(){
    //     console.log('component mounted');
    //
    //     console.log(this.props.fetchUser());
    //    // this.props.dispatch.fetchUser();
    //     //console.log('data',data);
    // }
    // componentWillReceiveProps(){
    //     //console.log(this.props.fetchUser());
    //  //y   console.log(this.props.fetchUser());
    // }
    handleSort=(e)=>{
            console.log(e.target.innerText);
            var fieldname=e.target.innerText;
            var sortArr=[...this.props.user];
            sortArr.sort((a,b)=>a[fieldname]>b[fieldname]);
            //console.log('sorted Data',sortArr);
            this.props.sortAction(sortArr);
    }
   editUser=(v)=>{
       var valobj={
           'id':v._id,
           'name':v.name,
           'age':v.age,
           'gender':v.gender,
           'state':v.state,
           'city':v.city,
           'language':v.language.split(","),
           'email':v.email,
           'profileimage':v.profileimage,
           'isEdit':true

       }
       this.props.addValues(valobj);
    }

    render(){
        console.log("users",this.props.user);
        console.log('from render page ',this.props.page);
        console.log(this.props.page.limit);
        var last=this.props.page.pagenum*this.props.page.limit;
        var start=last-this.props.page.limit;
        var pageArr=[];
        var totalPages=Math.ceil(this.props.user.length/this.props.page.limit);
        for(var i=1;i<=totalPages;i++){
            pageArr.push(i);
        }
        const pages=pageArr.map((v)=>{
            return <a href={'#'} onClick={(e)=>{
                e.preventDefault();
                this.props.pageAction(v,this.props.page.limit);
            }}>{v}</a>
        })
        var currentRec=this.props.user.slice(start,last);

        return(

            <div>
                <button className='btn btn-info'  data-target='#formModal' data-toggle='modal'>Add New</button>
                <FormModal/>
                <div className='navbar bg-dark'>
                    <select className='form-control col-1' onChange={(e)=>{this.props.pageAction(1,e.target.selectedOptions[0].innerText)}}>

                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                </div>
                <table className='table table-bordered'>
                    <tbody>
                    <tr>
                        <th onClick={this.handleSort}>Name</th>
                        <th onClick={this.handleSort}>age</th>
                        <th onClick={this.handleSort}>state</th>
                        <th onClick={this.handleSort}>city</th>
                        <th onClick={this.handleSort}>language</th>
                        <th onClick={this.handleSort}>email</th>
                        <th>profileImage</th>
                        <th colSpan={2}>Remove/Edit</th>
                    </tr>
                    { currentRec.map((v,i)=>{
                        return <tr key={i}>
                        <td onClick={()=>this.props.selectUser(v)}>{v.name}</td>
                        <td onClick={()=>this.props.selectUser(v)}>{v.age}</td>
                        <td onClick={()=>this.props.selectUser(v)}>{v.state}</td>
                        <td onClick={()=>this.props.selectUser(v)}>{v.city}</td>
                            <td onClick={()=>this.props.selectUser(v)}>{v.language}</td>
                            <td onClick={()=>this.props.selectUser(v)}>{v.email}</td>
                            <td onClick={()=>this.props.selectUser(v)}><img src={v.profileimage}/></td>
                        <td onClick={()=>this.props.selectUser(v)}>
                        <button className='btn btn-info' id={v._id} onClick={()=>{this.editUser(v)}}  data-target='#formModal' data-toggle='modal'>Edit</button>
                        </td>
                        <td onClick={()=>this.props.selectUser(v)}>
                        <button className='btn btn-danger' id={v._id} onClick={()=>{this.props.deleteUser(v._id)}}>delete</button>
                        </td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <div align='center'>
                    {pages}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return{
        user:state.user,
        page:state.page
    }

}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser:selectUser,
        deleteUser:deleteUser,
        editUser:editUser,
        addValues:addValues,
        pageAction:pageAction,
        sortAction:sortAction
        },
        dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(UserList);