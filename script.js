const addItemBtn = document.getElementById('add-item-btn');

const itemList = document.getElementById('item-list');

const clearBtn = document.getElementById('clear');

const filter = document.getElementById('filter');


function addItemToList(ev){

    ev.preventDefault();

const newItem = document.getElementById('item-input').value;


if (newItem == '' || newItem == ' '){
    alert('Please Enter an item !')
    return 0 ;
}else{

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = creatBtn();
    const icon = createIcon();
    
    button.appendChild(icon);
    li.appendChild(button);
    
    addItemToDom(li);
    addToLocalStr(newItem);

    document.getElementById('item-input').value = "";

}


};

function creatBtn(){

    const button =document.createElement('button');
    button.className = "remove-item btn-link text-red";

    return button ;

}

function createIcon(){
    const i =document.createElement('i');

    i.className = "fa-solid fa-xmark";

    return i ;
}

function addItemToDom(item){

    itemList.appendChild(item);

    checkUI();

}

addItemBtn.addEventListener('click' , addItemToList);

function clearAllItems(){
    while(itemList.firstElementChild){
        itemList.firstElementChild.remove();
    }
    checkUI();
    clearLocalStr();
};

clearBtn.addEventListener('click' , clearAllItems)

function removeItem(ev){

    if(ev.target.parentElement.classList.contains('remove-item')){
        ev.target.parentElement.parentElement.remove();
        removeItemFromLocalStr(ev.target.parentElement.parentElement.textContent)
    }
    checkUI();

}

itemList.addEventListener('click' , removeItem)

function checkUI(){
    const items = itemList.querySelectorAll('li');

    if(!items.length){
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}

checkUI();
displayFromLocalStr();

function filterItem (){ 
    const items = itemList.querySelectorAll('li');

    const value = filter.value.toLowerCase();

    items.forEach(item => {
        if(item.textContent.toLowerCase().indexOf(value) == -1){
            item.style.display = 'none';

        }else{
            item.style.display= 'flex';
        }
})
}

filter.addEventListener('input' , filterItem)

 function getFromLocalStr(){
    let listFromStr;

    if(localStorage.getItem('items')){
        listFromStr = JSON.parse(localStorage.getItem('items'))
    }else{
        listFromStr =[];
    }
    return listFromStr;
 }

 function addToLocalStr(item){
let listFromStr = getFromLocalStr();

if(listFromStr.indexOf(item) !== -1){
    alert('Item already exists!!!')
    return 0;
}else{
    listFromStr.push(item);
    localStorage.setItem('items' , JSON.stringify(listFromStr));
}

}

function createLi(new_item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(new_item));
const button = creatBtn();
const icon = createIcon();

button.appendChild(icon);
li.appendChild(button);

addItemToDom(li);
}

function displayFromLocalStr(){

let listFromStr = getFromLocalStr();

 listFromStr.forEach(item =>{
    createLi(item);
 })

}

function clearLocalStr(){
    localStorage.clear();
}

function removeItemFromLocalStr(item){
    let listFromLocalStr = getFromLocalStr(); 
    let indexItem = listFromLocalStr.indexOf(item)

 listFromLocalStr.splice(indexItem , 1);

    if(listFromLocalStr.length == 0){
        localStorage.removeItem('items')
        return 0 ;
    }else{
        localStorage.setItem('items' , JSON.stringify(listFromLocalStr))
    }

}