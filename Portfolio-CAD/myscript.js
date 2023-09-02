

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



$(document).ready(function () {
    $('.thumbnail').click(function () {
        $('.thumbnail').removeClass('active-thumbnail');
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
  