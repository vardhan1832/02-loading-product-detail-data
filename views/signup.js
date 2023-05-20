async function signup(e){
    try{
        e.preventDefault();
        const userObj={
            name:e.target.name.value,
            email: e.target.mail.value,
            password: e.target.password
        }
        const response = await axios.post('http://localhost:3000/user/sign-up',userObj)
        if(response.status===201){
            window.location.href='./login.html';
        }else{
            throw new Error('failed to login');
        }
    }catch(err){
        console.log(err)
    } 
}