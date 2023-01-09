let users = [];
let user = {};
let singleUser = [{}];
let singleEmail = '';
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
function registerUser () {

    let getEmail = document.getElementById('register-email').value;
    let getPassword = document.getElementById('register-password').value;
    let getConfirmPassword = document.getElementById('register-confirm-password').value;
    if(getEmail !== '' && getPassword !== '' && getConfirmPassword !== '' ){
    if(emailRegex.test(getEmail) == true && passwordRegex.test(getPassword) == true){

        if(getPassword === getConfirmPassword) {
            user = {
                id:Math.floor((Math.random()) * 0x1000000),
                email: getEmail,
                password: getPassword,
                totalBalance: [0]
            }
        
            //users.push(user)
            //console.log(users);
            //alert("user registered")

            let getAllUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '';
            console.log(getAllUsers);
            if(getAllUsers !== ''){
                getAllUsers.push(user)
                console.log(getAllUsers);
                alert("user registered")
                localStorage.setItem('users', JSON.stringify(getAllUsers) );
            }
            else{
                users.push(user)
                console.log(users);
                alert("user registered")
                localStorage.setItem('users', JSON.stringify(users) );
            }
            
            getEmail = document.getElementById('register-email').value = '';
            getPassword = document.getElementById('register-password').value = '';
            getConfirmPassword = document.getElementById('register-confirm-password').value = '';
            
             setTimeout(function(){
                window.location.href = 'login.html';
            }, 2500);
            
        }
        else {
            alert ("Confirm Password doesn't match.")
        }
    } 
    else{
        alert("Please Type Correct Format & length.")
    }   

    }
    else{
        alert("Please fill all fields.");
    }

}

function userLogin () {

    let userEmail = document.getElementById('login-email').value;
    let userPassword = document.getElementById('login-password').value;

    
    let getAllUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : '';
        console.log(getAllUsers)

   getAllUsers.forEach(function(item,index){

        console.log(item)
        if(userEmail == item.email && userPassword == item.password){

            singleUser = item;

        }

    });
    if(userEmail !== '' && userPassword !== ''){
    
    if(userEmail == singleUser.email && userPassword == singleUser.password){
        setTimeout(function(){
            window.location.href = 'index.html';
        }, 2500);
        localStorage.setItem('loggedInUser', JSON.stringify(singleUser) );
        
    }
    else{
        alert("Incorrect Credentials");
    }
    }
    else{
        alert("Please Fill All Fields");
    }

}

function userData(){
    let getLoggedUser = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : '';
        console.log(getLoggedUser);
        if(getLoggedUser !== ''){

            showUserData(getLoggedUser)
        }
        else{
            window.location.href = 'login.html';
        }

}
userData();


function showUserData(data){    
   let totalBalance = 0;
   let userBalance = data.totalBalance;
   userBalance.push(100,200,300,-100,-50)
   console.log(data)
   let accountNo = document.getElementById('acc-no');
    accountNo.innerHTML = data.id;

   userBalance.forEach(function(item){
    let transactionListDiv = document.getElementById('transaction-list');
    let singleTransaction = document.createElement('p');
    singleTransaction.classList.add('single-transaction-list');
    singleTransaction.classList.add('deposit-elements');
        if(item > 0 ){
            totalBalance += item;
            console.log(totalBalance)
            singleTransaction.innerText = `Deposit ${item}`;
        }  
        if(item < 0){
            singleTransaction.classList.add('withdraw-elements');
            singleTransaction.classList.remove('deposit-elements');
            singleTransaction.innerText = `Withdraw ${item}`;
        }
        
        
        transactionListDiv.appendChild(singleTransaction);
        
        

        
   })
   console.log(totalBalance)
   let totalBalanceDiv = document.getElementById("total-balance");
   totalBalanceDiv.innerHTML = totalBalance;

}
function deleteAccount(){
    let getLoggedUser = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : '';
    //let ps = document.getElementById('ps').classList.add("visible")
   // let cps = document.getElementById('cps').classList.add("visible")
    let deletePass = document.getElementById('deleteAccPass').value;
    let deleteConfirmPass = document.getElementById('deleteAccConfirmPass').value;

    if(deletePass !== '' && deleteConfirmPass !== ''){
    
        if(deletePass == getLoggedUser.password && deleteConfirmPass == getLoggedUser.password){
            
            
            localStorage.removeItem("loggedInUser");
            alert("Account Deleted Successfully");
            window.location.href = 'login.html';
            
            
        }
        else{
            alert("Incorrect Credentials");
        }
        }
        else{
            alert("Please Fill All Fields");
        }
    
}