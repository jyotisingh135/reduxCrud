import React,{Component} from 'react';
class Login extends Component{
    render(){
        return(

            <div className='container-fluid w-25 bg-light'>
                <div className='navbar'></div><br/>
                <div className='jumbotron'>
                    <h2>Login</h2>
                </div>
                <form className='bg-light'>
                    <div>
                        <input type='text' className='form-control' placeholder='username'/>
                    </div>
                    <br/>
                    <div>
                        <input type='password' className='form-control'  placeholder='password'/>
                    </div>
                    <br/>
                    <div>
                        <button className='btn btn-info float-right'>LOGIN</button>
                    </div>
                </form>
            </div>

        );
    }
}

export default Login;