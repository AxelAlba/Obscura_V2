$(document).ready(() => {
  var pid = $('#pid').val();
  $.ajax({
    url: `/api/post/${pid}`,
    method: 'GET',
    success: (data, status) => {
      // build image-pane 
      var imagePane = $('.image-pane');
      var img = document.createElement('img');
      $(img).attr('src', data.image);
      imagePane.append(img);
      
      // build info-pane 
      var infoPane = $('.info-pane');
      data.comments.forEach((comment, index) => {
        // call displayComment here
        console.log(comment);
      });
    },
    error: () => {
      console.log('Error in loading post. [js/post.js]');
    }
  })
});

// helper functions
function displayComment(comment, parentDiv) {
  ;
}

