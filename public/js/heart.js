$(document).ready(function() {
  /* when a user clicks, toggle the 'is-animating' class */
  $(".heart").on('click touchstart', function(){
    $(this).toggleClass('is_animating');

    //ajax here
    var postId = $('#pid').val();
    var charNum = $('.hearts').text();
    var hearts = parseInt(charNum);
    hearts++;
    $('.hearts').text(hearts);
    
    $.post('/post/heart', { postId: postId, hearts: hearts}, function(model) {
      console.log('new likes in ajax: ' + model.likes);
    });
    
  });

  /*when the animation is over, remove the class*/
  $(".heart").on('animationend', function(){
    $(this).toggleClass('is_animating');
  });
});
