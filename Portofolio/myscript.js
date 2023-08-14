

var x = window.matchMedia("(max-width: 991px)")
var is_hidden = true;

function mymobnav(){
    if (x.matches) { // If media query matches
        if (is_hidden){
            document.getElementById('header').style.left = '0';
            is_hidden = false;
        }
        else{
            document.getElementById('header').style.left = '-300px';
            is_hidden = true;
        }
    }
    else{
        document.getElementById('header').style.left = '0';
    }
    
}