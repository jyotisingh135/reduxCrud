export default function(state=[],action){
    switch(action.type){
        case 'FETCH_USER':
            return action.res;
            break;
        case 'ADD_USER':
            //return state.concat(action.res);
            return [...state, action.res]

            break;

        case 'DELETE_USER':
            return [...state].filter(u => u._id !== action.res._id);
            break;
        case 'UPDATE_USER':
             var arr=[...state];
             var index=arr.findIndex((u)=>u._id!==action.res._id);
             arr.splice(index,1,action.res);
             return arr;
          break;
          case 'SORTING':
              console.log('sorted data',action.payload);
            return action.payload;
             break;
    }
    return state;
}

//export default function(){
    // fetch('http://localhost:3000/student').then((response)=>{
    //     response.json().then((res)=>{
    //         console.log(res);
    //         return [res];
    //     })
    // })
    // return[{
    //     id:1,
    //     name:'jyoti'
    // },
    //     {
    //         id:2,
    //         name:'pooja'
    //     },{
    //         id:3,
    //         name:'nisha'
    //     },{
    //         id:4,
    //         name:'heena'
    //     }]
//}