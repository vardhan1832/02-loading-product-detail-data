let itemList = document.getElementById('items');

async function save(event){   
    try{
        const token = localStorage.getItem('token')
        event.preventDefault();
        let userObj={        
          amount : event.target.Amount.value,
          categry: event.target.category.value,
          descript : event.target.description.value,    
        }
        const response = await axios.post('http://localhost:4000/user/add-expense',userObj,{ headers: { "Authorization" : token}})
        if(response.status === 201){
            newlist(response.data.userexpense);
        }          
    }catch(err){
        document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`
    }      
} 

document.getElementById('rzp-button1').onclick = async function (e){
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4000/purchase/premiumMembership',{ headers: { "Authorization" : token}})
    console.log(response)
    let options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response){
            await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            },{ headers: { "Authorization" : token}} )
            alert('You are a Premium User Now')
        }
    }
    const rzp1 = new Razorpay(options)
    rzp1.open()
    e.preventDefault()

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('Payment failed')
    })
}

function newlist(e){
      const token = localStorage.getItem('token')
      let li = document.createElement('li');
      li.className='list-group-item';
      let userInfo = `${e.amount} - ${e.category}, ${e.description}` ;
      li.id = e.id;
      li.style.backgroundColor = 'rgba(250, 242, 255, 0.979)'

      li.appendChild(document.createTextNode(userInfo));

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn float-right delete ';
      deleteBtn.style.backgroundColor = 'rgb(241, 199, 199)';        
      deleteBtn.appendChild(document.createTextNode('delete'));
      li.appendChild(deleteBtn);

      var editBtn = document.createElement('button');
      editBtn.className = 'btn  float-right edit';       
      editBtn.appendChild(document.createTextNode('edit'));
      li.appendChild(editBtn);
      editBtn.style.backgroundColor = 'rgb(241, 199, 199)';
      itemList.appendChild(li);

      deleteBtn.onclick=async ()=>{   
        try{
            const res = await axios.delete( `http://localhost:4000/user/add-expense/${li.id}`,{ headers: { "Authorization" : token}})
            console.log(res)
            if(res.status === 201){
                itemList.removeChild(li); 
            }else{
                throw new Error(res.data.message)
            }  
        }
        catch(err){
            document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`
        }            
      }
      editBtn.onclick=async ()=>{
        try{
            document.getElementById('expAmt').value = e.amount;
            document.getElementById('selectcategory').value = e.category;
            document.getElementById('desc').value = e.description;
            const res = await axios.delete( `http://localhost:4000/user/add-expense/${li.id}`,{ headers: { "Authorization" : token}})
            console.log(res)
            if(res.status === 201){
                itemList.removeChild(li); 
            }else{
                throw new Error(res.data.message)
            }  
        }catch(err){
            document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`   
        }
           
      }
}
window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:4000/user/add-expense',{ headers: {"Authorization": token}})
        console.log(response)
        if(response.status === 201){
            for(var i=0;i<response.data.allexpenses.length;i++){
                newlist(response.data.allexpenses[i]);
            }
        }
    }catch(err){
        document.body.innerHTML += `<section class="container"><div style="color:red;">${err.message}</div></section>`   
    }

})    
