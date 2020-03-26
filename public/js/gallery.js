//THIS SCRIPT IS FOR THE AJAX
$(document).ready(() => {
  $.ajax('getGallery', {
    method: 'GET',
    success: (data, status) => {
      var gallery = $('.gallery');     
      data.forEach((item, index) => {
        addToGallery(item, gallery);
      });

      // set instance options
      $('[data-fancybox]').fancybox({
        toolbar: false,
        smallBtn: true,
        infobar: false,
        iframe: {
          preload: false
        },
        arrows: false
      })
    },
    error: () => {
      // what to do when the request fails?
    }
  });
});

// Helper functions

//this function adds an image to the gallery
function addToGallery(item, parentDiv) {
  // DOM Creation
  var linkDiv = document.createElement('div');
  var link = document.createElement('a');
  var img = document.createElement('img');
  // adding meaning
  $(link).attr('data-fancybox', 'gallery');
  $(link).attr('data-type', 'iframe');
  $(link).attr('data-src', `/viewPost/${item.pid}`); //Dan, please implement post.hbs
  $(link).attr('href', 'javascript:;');
  /*$(link).click(function() {
    $.ajax(`viewPost/${item.pid}`,{
      method: 'GET',
      success: (data, status) => {
        console.log(data);
      }
    });
  })*/
  $(img).attr('src', item.image);

  $(linkDiv).attr('id', item.pid);
  $(linkDiv).attr('class', 'post');
  // appending
  $(link).append(img);
  $(linkDiv).append(link);
  $(parentDiv).append(linkDiv);
}
