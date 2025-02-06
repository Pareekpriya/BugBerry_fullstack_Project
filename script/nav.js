
const placeholderTexts = [
    "Search for Perfumes...",
    "Search for Shower Gel...",
    "Search for Body Mist...",
    "Search for CEO...",
    "Search for Attars..."
];

const searchBar = document.getElementById("search-bar");

let index = 0;

function changePlaceholder(){
   searchBar.placeholder = placeholderTexts[index];
   index = (index+1)%placeholderTexts.length; 
}

setInterval(changePlaceholder,1000);


document.getElementById("menu-dropdown").addEventListener("change", function() {
    let selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue; 
    }
});