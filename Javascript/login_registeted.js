//Kiểm tra Username nhap vao

const login = () => {
  event.preventDefault();
  const userData = JSON.parse(localStorage.getItem('nUser'));

  if(userData === null) {
    alert('Tai khoan khong hop le')
    return;
  }
  const id = document.getElementById('txtUser').value;
  const password = document.getElementById('txtPassword').value;

  let chkU = false;
  let chkP = false;

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id === id) {
        chkU = true;
        if (userData[i].password === password) {
            chkP = true;
            alert('Đăng nhập thành công');
            window.location.href = "index.html"
            break; // Thoát vòng lặp khi tìm thấy thông tin đúng
        } else {
            alert('Mat khau khong hop le');
            break; // Thoát vòng lặp khi tìm thấy id nhưng mật khẩu sai
        }
    }
    else {
      alert('Tai khoan khong hop le')
      break
    }
  }
}

function checkUsername() {                        // Declare function
  var username = el.value;                        // Store username in variable
  if (username.length < 9) {                      // If username < 5 characters
    elMsg.className = 'warning';                  // Change class on message
    elMsg.textContent = 'Username không hợp lệ';// Update message
  }
  else if(username.length >= 9){
    elMsg.className = 'successful';                  // Change class on message
    elMsg.textContent = 'Username hợp lệ';
  }
  else {                                        // Otherwise
    elMsg.textContent = '';                       // Clear the message
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
    elPMsg.textContent = 'Password quá ngắn';      // Update message
  }else{
    elPMsg.textContent = ''; 
  }
}

var submit = document.getElementById('frmDangNhap');

var el = document.getElementById('txtUser');     // Username input
var elMsg = document.getElementById('feedback_1');  // Element to hold message

var elP = document.getElementById('txtPassword');     // Password input
var elPMsg = document.getElementById('feedback_2'); 
// When the username input gains / loses focus call functions above:
submit.addEventListener('submit', login, false);
el.addEventListener('focus', tipUsername, false); // focus call tipUsername()
el.addEventListener('blur', checkUsername, false);// blur call checkUsername()
elP.addEventListener('blur', checkPassword, false);// blur call checkUsername()
