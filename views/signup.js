async function signup(e){
    try{
        e.preventDefault();
        const userObj={
            name:e.target.name.value,
            email: e.target.mail.value,
            password: e.target.password.value
        }
        console.log(userObj)
        const response = await axios.post('http://localhost:4000/user/sign-up',userObj)
        if(response.status===201){
            window.location.href='./login.html';
        }else{
            throw new Error('failed to signin');
        }
    }catch(err){
        console.log(err)
    } 
}

async function login(e){
    try{
        e.preventDefault();
        const loginDetails = {
            email: e.target.mail.value,
            password: e.target.password.value
        }

        const response = await axios.post('http://localhost:4000/user/login',loginDetails)
        if(response.status === 201){
            alert('login successfull')
        }else{
            throw new Error('failed to login')
        }
    }
    catch(err){
        console.log(err);
    }
}