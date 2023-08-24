const pNumber = document.querySelector('#numbers');
    const pLetter = document.querySelector('#letters');
    const pCase = document.querySelector('#upperCases');
    const pSpecial = document.querySelector('#specialCharacters');
    const submit = document.querySelector('#gPass');
    const passName = document.querySelector('#passName');
    const passList = document.querySelector('#passList');
    // const copyPassword = document.querySelector('#copy');
    const deletePassword = document.querySelector('.delete');

    let USERID = "";
    function sendUID(userID){
        USERID = userID;
    }
    let value = [];
    

    var Ucase = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";  
    var Lcase = "abcdefghijklmnopqrstuvwxyz";  
    var special = "!@#$%^&*()";
    
    
    function generatePassword(e){
        e.preventDefault();
        let random = '';

    if((pLetter.checked || pNumber.checked || pCase.checked || pSpecial.checked) && passName.value != ''){
      
        document.getElementsByName('inlineRadioOptions').forEach(radio =>{
          if(radio.checked){
              while( random.length != radio.value){
                    if(pLetter.checked){
                        random += Lcase.charAt(Math.floor(Math.random()*Lcase.length));
                    }
                    if(pNumber.checked){
                        random += Math.floor((Math.random() * 10));
                    }
                    if(pCase.checked){
                        random += Ucase.charAt(Math.floor(Math.random()*Ucase.length));
                    }
                    if(pSpecial.checked){
                        random += special.charAt(Math.floor(Math.random()*special.length));
                    }
              }
          }
        });



        // firebase.firestore().collection("passwords").doc(USERID).set({
        //     passname : passName.value,
        //     password : random
        // }) 
    

        //Save the name and password.
        value[value.length] = passName.value +" : "+ random;
        let string = JSON.stringify(value)
        localStorage.setItem(USERID,string);

        let retString = localStorage.getItem(USERID);
        let retArray = JSON.parse(retString);
        
        //Create new li under the ul
        let li = document.createElement('li')  
        li.innerHTML = `<span>${retArray[retArray.length-1]}</span>
        <ion-icon name="trash-outline" onclick="deletepassword(this)" class="delete"></ion-icon>`
        li.className = "passListItems";
        passList.appendChild(li);  


//Copy Password Button.
        // document.querySelector('.copy').addEventListener('click', (e)=>{


        //     //Grab the button
        //     let currentBtn = e.currentTarget;       

        //     //Grab the password
        //     const firstChild = currentBtn.parentElement.firstChild;
        //     // const firstChild = parent.firstChild.innerHTML;
        //     console.log(firstChild);
                
        //     // Copy the text inside the text field
        //     navigator.clipboard.writeText(firstChild);
            
        //     // Alert the copied text
        //     alert(firstChild);
        // })
        

    }
    else{
        alert("Please Select Atleast one of the following.")
    }

    passName.value = '';

        //Randomize all the values here.
        // document.getElementById("output").innerHTML = random;  

    };


    function previousData(USERID){

        value = [];
        if(localStorage.getItem(USERID) != null){

        let retString = localStorage.getItem(USERID);
        let retArray = JSON.parse(retString)
        if(retArray.length != 0){

            for(let i=0; i<retArray.length; i++){
                let li = document.createElement('li');  
        li.innerHTML = `<span>${retArray[i]}</span>
        <ion-icon name="trash-outline" class="delete" onclick="deletepassword(this)"></ion-icon>`
        li.className = "passListItems";
        passList.appendChild(li);  

        // localStorage.setItem(USERID,retArray[i]);
        value[i] = retArray[i];
            }
        }
    }else{
        alert("No Records were Found!");
    }
  }


  //Delete Password.
  function deletepassword(e){
    
    if(confirm("Are you sure you want to delete this password?") == true) {

            let arrayElement = e.previousElementSibling.innerHTML;
            let index = value.indexOf(arrayElement);
            
            value.splice(index, 1);
            
            let string = JSON.stringify(value);
            localStorage.setItem(USERID,string);

            e.parentElement.remove()

            alert("Password Deleted successfully !")
        } 
  }


  