// getting all required elements 

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const searchIcon = searchWrapper.querySelector(".icon .fa-search");


let savedSuggestions = localStorage.getItem('savedSuggestions');
if (savedSuggestions == null) savedSuggestions = localStorage.setItem('savedSuggestions', JSON.stringify(suggestions));
else suggestionsObj = JSON.parse(savedSuggestions);

console.log(suggestionsObj)

// if user press any key and release 

inputBox.onkeyup = (e) => {
    let userData = e.target.value // user entered data 
    let emptyArray = [];

    if (userData){
        emptyArray = suggestionsObj.filter((data)=>{
            // Filtering array value and user char to lowercase and return only those words /sentence that starts with user entered words.
           
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            return  data = '<li>' +data+ '</li>';
        })

        searchWrapper.classList.add('active'); //show auto complete
        showSuggestions(emptyArray.slice(0, 5));
        let allList  = suggBox.querySelectorAll('li');
        for (let i = 0; i < allList.length; i++) {
            // adding onclick attribute to all li tags
            allList[i].setAttribute('onclick', 'select(this)')
        }   

       
} else {
        searchWrapper.classList.remove('active'); //hide auto complete
    }
}

function select(element){
    let selectUserData = element.textContent;
    inputBox.value = selectUserData; // passing the user selected list value to the input box  
    searchWrapper.classList.remove('active'); //hide auto complete 

    let google = element.textContent.replace(/\s+/g, '+');
    window.open("https://www.google.com/m?q="+google+"&channel=new", "_blank");
 }

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue  = inputBox.value;
        listData = '<li>' +userValue+ '</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}   

// when search icon is clicked perform the following actions 

searchIcon.addEventListener('click' ,function(){
    if (inputBox.value.length < 5 && inputBox.value.length > 0){
        let google = inputBox.value.replace(/\s+/g, '+');
        window.open("https://www.google.com/m?q="+google+"&channel=new", "_blank");
        inputBox.value = "";
    }else if (inputBox.value.length < 1){
        return;
    } else {
        suggestionsObj.push(inputBox.value);
        let google = inputBox.value.replace(/\s+/g, '+');
        window.open("https://www.google.com/m?q="+google+"&channel=new", "_blank");
        localStorage.setItem('savedSuggestions' , JSON.stringify(suggestionsObj));
        inputBox.value = "";
    }
})
