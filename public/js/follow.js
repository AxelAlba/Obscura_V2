
$(document).ready(function() {
  $('#follow').hover(function(){
    $button = $(this);
   if($button.hasClass('following')){
       $button.addClass('unfollow');
       $button.text('Unfollow');
   }
 }, function(){
   if($button.hasClass('following')){
       $button.removeClass('unfollow');
       $button.text('Following');
   }
 });

  // #findStudent POST call
$('#follow').click(function() {
  // Get the data from the form
  var url = document.URL;
  var userId = url.substring(url.lastIndexOf('/') + 1);
  var isFollowed;

  var charNum = $('#followers').text();
  var followers = parseInt(charNum);
  $button = $(this);
    if($button.hasClass('following')){
        followers--;
        isFollowed = true;
        //$.ajax(); Do Unfollow
        $.post('/profile/unfollow', { userId: userId }, function(followersArray) {
          console.log(followersArray);
          $('#followers').text(followers);
        });

        $button.removeClass('following');
        $button.removeClass('unfollow');
        $button.text('Follow');
        
    } 
    else {
        followers++;
        isFollowed = false;
        // $.ajax(); Do Follow
        $.post('/profile/follow', { userId: userId }, function(followersArray) {
          console.log(followersArray);
          $('#followers').text(followers);
        });

        $button.addClass('following');
        $button.text('Following');   
    }
  });
});
