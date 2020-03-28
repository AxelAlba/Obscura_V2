/* TO RESUE THIS CODE, IT MUST KNOW IF DISCOVER/FOLLOWED
   initial solution: get state in hidden html input if discover/followed
   then use that param for api call (ex. /api/getPosts/discover or /api/getPosts/followed)
*/ 

$(document).ready(() => {
  $.ajax({
    url: '/api/getPosts',
    method: 'GET',
    success: (data, status) => {
      var gallery = $('.gallery'); 
      // append images to gallery    
      data.forEach((item, index) => {
        addToGallery(item, gallery);
      });
      // set fancybox instance options
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
      console.log('error gallery.js');
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
  // adding attributes
  $(link).attr('data-fancybox', 'gallery');
  $(link).attr('data-type', 'iframe');
  $(link).attr('data-src', `/post/${item.pid}`); //Dan, please implement post.hbs
  $(link).attr('href', 'javascript:;');
  $(img).attr('src', item.image);
  // appending
  $(link).append(img);
  $(linkDiv).append(link);
  $(parentDiv).append(linkDiv);
}
