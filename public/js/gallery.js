/* TO RESUE THIS CODE, IT MUST KNOW IF DISCOVER/FOLLOWED
   initial solution: get state in hidden html input if discover/followed
   then use that param for api call (ex. /api/getPosts/discover or /api/getPosts/followed)
*/ 

$(document).ready(() => {
  $.ajax({
    url: '/api/getDiscoverPosts',
    method: 'GET',
    success: (data, status) => {
      var gallery = $('.gallery'); 
      // append images to gallery    
      data.forEach((item, index) => {
        addToGallery(item, gallery);
      });
      // set fancybox instance options
      $('[data-fancybox]').fancybox({
        toolbar: true,
        smallBtn: false,
        buttons: ["close"],
        infobar: false,
        iframe: {
          preload: false
        },
        arrows: false,
        touch: false
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
  // adding attributes1
  $(img).attr('src', item.img);
  $(link).attr('data-fancybox', '');    
  $(link).attr('data-type', 'ajax');
  $(link).attr('data-src', `/api/post/${item._id}`);
  $(link).attr('href', 'javascript:;');
  // appending
  $(link).append(img);
  $(linkDiv).append(link);
  $(parentDiv).append(linkDiv);
}
