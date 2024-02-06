

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
        document.getElementById('header').style.left = '1px';
    }
    
}


const queryString = window.location.search;
console.log('test', queryString);
const urlParams = new URLSearchParams(queryString);

$(document).ready(function () {
  if(urlParams.has('engine')){
    $('#modal-1').modal('show');
  }
});

$(document).ready(function () {
    $('.nav-link').click(function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
});