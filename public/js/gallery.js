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

  $(link).attr('data-type', 'inline');
  $(link).attr('data-src', `#post-view`); //Dan, please implement post.hbs
  
    /*
  $(link).attr('data-type', 'ajax');
  $(link).attr('data-src', `/api/test`);*/
  
  $(link).attr('href', 'javascript:;');
  $(link).click(function() {
    console.log(`hello ${item.caption}`);
    /*$.ajax({
      url: `/api/viewPost/${item}`,
      method: 'GET',
      success: (data, status) => {
        // build image-pane 
        var imagePane = $('#post-image-pane');
        var img = document.createElement('img');
        $(img).attr('src', data.image);
        imagePane.append(img);

        // build info-pane 
        var infoPane = $('#post-info-pane');
        data.comments.forEach((comment, index) => {
          // call displayComment here
          console.log(comment);
        });
      },
      error: () => {
        console.log('Error in loading post. [js/post.js]');
      }
    })*/

    
    var imagePane = $('#post-image-pane');
    $(imagePane).empty();
    var img = document.createElement('img');
    $(img).attr('src', item.img);
    $(img).attr('id', 'post-image');
    $(img).css({ "max-width": "100%", "max-height": "100%", "width": "auto", "height": "auto", "margin": "0"});
    imagePane.append(img);

  });
  // appending
  $(link).append(img);
  $(linkDiv).append(link);
  $(parentDiv).append(linkDiv);
}
