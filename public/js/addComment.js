/*
  Functions related to Posts goes here.
*/

$(document).ready(() => {
  var commentBox = $('#comment-box'); // get comment box
  var postId = $('#pid').val(); // get post id of the post you're viewing

  // Add click event handler
  $('#comment-btn').click(function(event) {
    event.preventDefault(); // prevent refresh
    addCommentHandler(postId, commentBox);
  });
});

// Create comment to DB
function addCommentHandler(postToCommentOn, commentBox) {
  // get comment value
  var comment = commentBox.val();

  // if empty string, don't execute further
  if (comment == '') { return }

  // if not empty string, execute ajax POST 
  $.ajax({
    url: `/api/post/${postToCommentOn}/comment/create`,
    method: "POST",
    data: {
      commenter: "5e8b098057612101fcfee99f", // temporary user_id 
      comment: comment
    },
    success: (data, status) => {
      renderComment(data);      
      scrollToBottom();         
      resetCommentBox(commentBox);
    },
    error: () => {
      console.log('error submitting comment.');
    }
  });
}

// Resets comment box to empty string
function resetCommentBox(commentBox) {
  commentBox.val('');
}

// Scroll to the most bottom part of the modal
function scrollToBottom() {
  // big enough to ensure that it scrolls down to the bottom
  var height = $("#comments-section").height() * 5;

  // scroll to bottom to see latest comment
  $(".modal-container").animate({ scrollTop: height }, "slow");
}

// Append comment to DOM
function renderComment(data) {
  var parentDiv = $("#comments-section");
  var ul = document.createElement('ul');
  var divRowParent = document.createElement('div');
  var divProfilePicCol = document.createElement('div');
  var profilePic = document.createElement('img');
  var divCommentDetailsCol = document.createElement('div');
  var divUsernameRow = document.createElement('div');
  var linkUsername = document.createElement('a');
  var username = document.createElement('h5');
  var divCommentRow = document.createElement('div');
  var comment = document.createElement('p');

  // Add attributes, bootstrap classes, src
  $(ul).attr('class', 'px-3');
  $(divRowParent).attr('class', 'row mx-auto');
  $(divProfilePicCol).attr('class', 'col-2 pr-2');
  $(profilePic).attr({
    src: data.commenter.profilePic,
    class: 'profile-pic mb-0 rounded-circle'
  });
  $(divCommentDetailsCol).attr('class', 'col-10');
  $(divUsernameRow).attr('class', 'row mx-auto');
  $(linkUsername).attr({
    href: `/profile/others/${data.commenter._id}`,
    class: 'no-underline'
  });
  $(username).attr('class', 'my-0 primary-color-light');
  $(username).text(data.commenter.username);
  $(divCommentRow).attr('class', 'row mx-auto');
  $(comment).attr('class', 'my-0');
  $(comment).text(data.comment);

  // Appending, child --> Parent (low to high, 1 == highest)
  // Level 3
  $(divCommentRow).append(comment);
  $(linkUsername).append(username);
  $(divUsernameRow).append(linkUsername);
  $(divCommentDetailsCol).append(divUsernameRow);
  $(divCommentDetailsCol).append(divCommentRow);
  $(divProfilePicCol).append(profilePic);

  // Level 2
  $(divRowParent).append(divProfilePicCol);
  $(divRowParent).append(divCommentDetailsCol);

  // Level 1
  $(ul).append(divRowParent);
  
  // Render comment to comments section
  $(parentDiv).append(ul);
}
