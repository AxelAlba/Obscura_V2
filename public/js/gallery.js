/* TO RESUE THIS CODE, IT MUST KNOW IF DISCOVER/FOLLOWED
   initial solution: get state in hidden html input if discover/followed
   then use that param for api call (ex. /api/getPosts/discover or /api/getPosts/followed)
*/ 

$(document).ready(() => {
  var feedmode = $('#mode').val(); // get mode of the newsfeed
  var finalUrl;
    if (feedmode === "discover")
      finalUrl = 'getDiscoverPosts';
    else if (feedmode === "following")
      finalUrl = 'getFollowingPosts';
    else
      finalUrl = 'getProfilePosts';

    var url = document.URL;
    var userId = url.substring(url.lastIndexOf('/') + 1);
    console.log(userId);
    console.log(finalUrl);
  $.ajax({
    url: '/api/' + finalUrl,
    method: 'GET',
    data: {user: userId},
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
  // adding attributes
  $(img).attr('src', `/post/image/${item.img}`);
  $(link).attr('data-fancybox', '');    
  $(link).attr('data-type', 'ajax');
  $(link).attr('data-src', `/post/${item._id}`);
  $(link).attr('href', 'javascript:;');
  // appending
  $(link).append(img);
  $(linkDiv).append(link);
  $(parentDiv).append(linkDiv);
}
