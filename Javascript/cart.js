/*Hàm kiểm tra sản phẩm tồn tại trong giỏ hàng (arrCart) chưa. Nếu có thì
trả về chỉ số của nó trong mảng arrCart, ngược lại trả về -1 (không tìm thấy/ chưa tồn
tại trong giỏ hàng). Sinh viên nên sử dụng hàm Array.findIndex() */
function isExistedInCart(item, arrCart){
    let myIndex = -1;
    arrCart.forEach((itemCard, index) => {
        if(item.id == itemCard.id) myIndex = index;
    });
    return myIndex;
}

function loadShoppingCart(){
    let updatedCart = []; //chứa mặt hàng hiện có của giỏ hàng
    const selectedItems = (evt) => {
        const linkClicked = evt.target;
        alert("Item-id:" + linkClicked.parentElement.parentElement.children[1].textContent);
        if(typeof(Storage) !== "undefined"){
            // kiểm tra hỗ trợ trình duyệt cho localStorage
            let newItem = {
                id: linkClicked.parentElement.parentElement.children[1].textContent,
                name: linkClicked.parentElement.parentElement.children[2].textContent,
                price: linkClicked.parentElement.parentElement.children[4].textContent,
                quantity: 1
            };
            //Kiểm tra tồn tại trong localstore chưa, nếu chưa thì tạo mới.
            if(JSON.parse(localStorage.getItem('cartItems')) === null){
                updatedCart.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                window.location.reload();
            }else{
                //localstorage đã tồn tại
                const updatedCart = JSON.parse(localStorage.getItem('cartItems'));
                //neu ton tai thi cap nhat so luong
                if((index = isExistedInCart(newItem, updatedCart)) >= 0){
                    updatedCart[index].quantity++;
                    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                    window.location.reload();
                //neu item chua co trong gio hang thi tao moi
                }else{
                    updatedCart.push(newItem);
                    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                    window.location.reload();
                }
            }
            debugger;
        }else{
            alert('Local storage is  not working on your browser');
        }
    }

    const attachingEvent = evt => evt.addEventListener('click', selectedItems);

    const add2CartLinks = document.getElementsByClassName('btn-add');
    let arrCartLinks = Array.from(add2CartLinks);
    arrCartLinks.forEach(attachingEvent);

    const shoppingCard = document.querySelector('.nav__list');
    shoppingCard.addEventListener("click", function(){
        window.location.href = "gio-hang.html";
    });

    //cap nhat so item trong gio hang tren trang chu
    if(localStorage.getItem('cartItems') !== null){
        const numberOrderedItems = document.querySelector('.item-style-h .no-ordered-items');
        let numberOfItems = 0;
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
        custommerCart.forEach(item => {
            numberOfItems += item.quantity;
        });
        numberOrderedItems.innerHTML = numberOfItems;
    }
}

function showCart(){
    if(localStorage.cartItems == undefined){
        alert('Your cart is empty. Please go back homepage to order items.');
        window.location.href = "index.html";
    }else{
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'));

        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblHFoot = document.getElementsByTagName('tfoot')[0];

        let headColumns = bodyRows = footColumns = '';

        headColumns += '<tr><th>STT</th><th>Mã sản phẩm</th><th>Tên sản phẩm</th> <th>Số lượng</th><th>Đơn giá</th><th>Xóa</th></tr>';
        
        tblHead.innerHTML = headColumns;
        vat = total = amountPaid = 0;
        no = 0; /* ordinalNumber = 0; */
        if(custommerCart[0] === null){
            bodyRows += '<tr><td colspan="5">Không có sản phẩm</td></tr>'
        }else{
            custommerCart.forEach(item => {
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g,""));
                bodyRows += '<tr><td>'+ ++no +'</td><td>' + item.id + '</td><td>' 
                + item.name + '</td><td>' + item.quantity + '</td><td>' + formatCurrency(
                item.price.replace(/[^0-9]/g, "")) + '</td><td><a style="color: red;" href="#" onclick=deleteCart(this);>Xóa</a></td></tr>';
            });
        }

        tblBody.innerHTML = bodyRows;
        footColumns += '<tr><td colspan="4">Tổng: </td> <td>' + formatCurrency(total)
                            + '</td><td rowspan="3"></td></tr>';
        footColumns += '<tr><td colspan="4">Thuế (10%):</td> <td>' + formatCurrency(Math.floor(total*0.1))
                            + '</td></tr>';
        footColumns += '<tr><td colspan="4">Thành tiền: </td> <td>' + formatCurrency(Math.floor(total*1.1))
                            + '</td></tr>';
        tblHFoot.innerHTML = footColumns;
    }
}

function deleteCart(evt){
    let updatedCart = [];
    
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    custommerCart.forEach(item => {
        if(item.id != evt.parentElement.parentElement.children[1].textContent){
            updatedCart.push(item);
        }
    });
    if(updatedCart.length === 0){
        localStorage.removeItem('cartItems');
    }
    else localStorage.setItem('cartItems',JSON.stringify(updatedCart));
    window.location.reload();
};
    ////------------Currency & Percentage format-------------------------
const formatPercentage = (value, locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(value);
};

const formatCurrency = (amount, locale = "vi-VN") => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};

function exportToExcel() {
    /* Get table element */
    var table = document.getElementById("list-items");

    /* Convert table to workbook */
    var workbook = XLSX.utils.table_to_book(table);

    /* Save workbook to file */
    XLSX.writeFile(workbook, "data.xlsx");
};