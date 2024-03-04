let updatedUser = [];
const register = () => {
    event.preventDefault();
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
}
var re = document.getElementById('registered-form');
re.addEventListener('submit', register, false);