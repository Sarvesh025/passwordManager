
const userName = document.querySelector('#user');

async function signup(event){
    event.preventDefault();
    const name = document.querySelector('#username')
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

   try{
       const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    //    alert("Welcome " + result.user.email);
    await result.user.updateProfile({
        displayName: name.value
    })

    //Toast.
    const toast = new bootstrap.Toast("login success!");
    toast.show();

    //close the wrapper after signIn.
    wrapper.classList.remove('active-login');


    //Toggle b/w login/logout button.
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";


    //Uncheck all the checked checkboxes.
    if(pNumber.checked || pLetter.checked || pCase.checked || pSpecial.checked){
        pNumber.checked = false;
        pLetter.checked = false;
        pCase.checked = false;
        pSpecial.checked = false;
    }


    //storing the user's name into firestore.
    firebase.firestore().collection("users").doc(result.user.uid).set({
        name : result.user.displayName
    }) 


    //Retriving the user's name.
    const userInfoSnap = await firebase.firestore().collection("users").doc(result.user.uid).get();
    const userInfo = userInfoSnap.data();
    userName.innerHTML = userInfo.name;


    //Sending the user's ID to createPassword file.
    sendUID(result.user.uid);    

    //Clear the list.
    passList.innerHTML = '';


   }

   catch(error){
    // M.toast({html: error.message, classes : "red"})
    alert("email already registered");
   }

   //Empty the Input box after submision.
   name.value = "";
   email.value = "";
   password.value = "";
  
}


async function logIn(e){
    e.preventDefault();
    const email = document.querySelector('#login_email');
    const password = document.querySelector('#login_password');

   try{
       const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
       // M.toast({html: 'Signin Successfully', classes : "green"})
       
       //close the wrapper after login.
       wrapper.classList.remove('active-login');
       
       
       //Show Name of already logedIn users.
       const userInfoSnap = await firebase.firestore().collection("users").doc(result.user.uid).get();
       const userInfo = userInfoSnap.data();
       userName.innerHTML = userInfo.name;


       //Toggle b/w login/logout button.
       loginBtn.style.display = "none";
       logoutBtn.style.display = "inline-block";


       //Uncheck all the checked checkboxes.
    if(pNumber.checked || pLetter.checked || pCase.checked || pSpecial.checked){
        pNumber.checked = false;
        pLetter.checked = false;
        pCase.checked = false;
        pSpecial.checked = false;
    }


       //Sending the user's ID to createPassword file.
        sendUID(result.user.uid);

        //Show previous password of the User.
        passList.innerHTML = '';
        previousData(result.user.uid);




       //alert message after login.
       alert(`Welcome back ${result.user.email}`);


   }
   catch(error){
    alert("Please cheak your email/password");
    // M.toast({html: error.message, classes : "red"})
   }

   //Empty the Input box after submision.
   email.value = "";
   password.value = "";
  
}

function logOut(){
    firebase.auth().signOut();

    //Toggle b/w login/logout button after logout.
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";

    //Change the user name to default.
    userName.innerHTML = "user";

   //Empty the Input box after logout.
    passName.value = '';


    //Clear the saved password after logout. 
    passList.innerHTML = '';


    //Uncheck all the checked checkboxes.
    if(pNumber.checked || pLetter.checked || pCase.checked || pSpecial.checked){
        pNumber.checked = false;
        pLetter.checked = false;
        pCase.checked = false;
        pSpecial.checked = false;
    }

    //alert message after logout.
    alert("logout successfull");
}