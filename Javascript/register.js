let updatedUser = [];
const register = () => {
    event.preventDefault();
    if((checkUsername() == true) && (checkPassword() == true)){
        var newUser = {
            id: document.getElementById('txtUser').value,
            name: document.getElementById('txtPassword').value,
            email: document.getElementById('txtEmail').value,
          };
           
      
          if(JSON.parse(localStorage.getItem('nUser')) === null){
              updatedUser.push(newUser);
              localStorage.setItem('nUser', JSON.stringify(updatedUser));
              window.location.reload();
          }else{
              //localstorage đã tồn tại
              const updatedUser = JSON.parse(localStorage.getItem('nUser'));
              updatedUser.push(newUser);
              localStorage.setItem('nUser', JSON.stringify(updatedUser));
              window.location.reload();
          }
          alert('Dang Ky Thanh Cong');
          window.location.href = "dang-nhap.html"
    }
    else alert('Dang ky khong thanh cong')
}

function checkUsername() {                        // Declare function
    var username = el.value;  
                    // Store username in variable
    if (username.length < 9) {                      // If username < 5 characters
      elMsg.className = 'warning';                  // Change class on message
      elMsg.textContent = 'Username không hợp lệ';
      return false;// Update message
    }
    else if(username.length >= 9){
      elMsg.className = 'successful';                  // Change class on message
      elMsg.textContent = 'Username hợp lệ';
      console.log(username)  
      return true;
    }
}
  
  function tipUsername() {                          // Declare function
    elMsg.className = 'tip';                        // Change class for message
    elMsg.innerHTML = 'Username phải có ít nhất 9 kí tự'; // Add message
  }
  //Kiểm tra mật khẩu nhập vào
  function checkPassword() {                        // Declare function
    var password = elP.value;                        // Store username in variable
    if (password.length < 9) {                      // If username < 5 characters
      elPMsg.className = 'warning';                  // Change class on message
      elPMsg.textContent = 'Password quá ngắn';
      return false;   // Update message
    }else{
      elPMsg.textContent = '';
      console.log(password) 
      return true;
    }
  }


var re = document.getElementById('registered-form');
re.addEventListener('submit', register, false);

var el = document.getElementById('txtUser'); 
var elMsg = document.getElementById('feedback_1');  // Element to hold message

var elP = document.getElementById('txtPassword');     // Password input
var elPMsg = document.getElementById('feedback_2'); 
// When the username input gains / loses focus call functions above:
el.addEventListener('focus', tipUsername, false); // focus call tipUsername()
el.addEventListener('blur', checkUsername, false);// blur call checkUsername()
elP.addEventListener('blur', checkPassword, false);// blur call checkUsername()
// elP.addEventListener('blur', tipPassword, false);
