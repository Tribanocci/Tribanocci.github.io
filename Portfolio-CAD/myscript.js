

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

$(document).ready(function () {
    $('.nav-link').click(function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
});


/*------GEAR------------*/
var gear1 = document.querySelector(".gear1").style;
    gear2 = document.querySelector(".gear2").style;
window.onscroll = function rotateGear () {
  gear1.transform = "rotate(" + (window.scrollY * 2.5) + "deg)";
  gear2.transform = "rotate(-" + (window.scrollY * 2.5) + "deg)";
}


$(document).ready(function () {
    $('.thumbnail').click(function () {
    // Find the common parent (the row) of the clicked thumbnail
    var row = $(this).closest('.row');
    
    // Select all .thumbnail elements within the same row
    var thumbnailsInRow = row.find('.thumbnail');
    
    // Now, you can work with the thumbnailsInRow as needed
    thumbnailsInRow.removeClass('active-thumbnail');
    $(this).addClass('active-thumbnail');
      // Check if the 'data-main-image' attribute exists in the clicked thumbnail
      if ($(this).data('main-image')) {
        console.log('einai');
        // Get the 'data-main-image' and 'data-main-image-id' attributes from the clicked thumbnail
        var mainImageSrc = $(this).data('main-image');
        var mainImageID = $(this).data('main-image-id');
        
        // Update the 'src' attribute of the main image using the 'mainImageID' selector
        $('#' + mainImageID).attr('src', mainImageSrc);
      } else{
        
        var prefix = "//sharecad.org/cadframe/load?url=konstantinos.pythonanywhere.com/static/photos/";
        var filename = $(this).data('filename');
        console.log(prefix + filename);
        var i_url = prefix + filename
        $('#cadFrame').attr('src', i_url);
      }
       
    });
  });
  

  $(document).ready(function () {
    $('.bx-zoom-in').click(function () {
            console.log('zooooom');
       
    });
  });


const queryString = window.location.search;
console.log('test', queryString);
const urlParams = new URLSearchParams(queryString);

$(document).ready(function () {
  if(urlParams.has('pdf')){
    $('#lightboxModal4').modal('show');
  }
});

//IFRAME LOADERS (add src dynamically, when button clicked)

//Bedplate
document.getElementById('bedplate_iframe').addEventListener('click', function() {
  var iframe = document.getElementById('lightboxIframe1');
  iframe.src = 'https://v3d.net/rbs';
});