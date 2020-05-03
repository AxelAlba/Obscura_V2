$(document).ready(() => {
  var postId = $('#pid').val(); // get post id of the post you're viewing
  $('#delete-btn').click(function (event) {
    event.preventDefault(); // prevent refresh

    if (!confirm("Do you want to delete this post?")) {
      return false;
    }

    $.ajax({
      url: `/post/${postId}`,
      method: "DELETE",
      success: (data, status) => {
        $(location).attr('href', '/profile');
      },
      error: () => {
        console.log('error deleting post.');
      }
    })
    // render indeterminate progress bar
    renderDeleteProgressBar();
  });
});

// Renders bootstrap indeterminate progress bar
function renderDeleteProgressBar() {
  var parentDiv = $("#post-modal");
  var div = document.createElement('div');
  $(div).attr('class', 'progress');
  var div2 = document.createElement('div');
  $(div2).attr('class', 'progress-bar progress-bar-striped progress-bar-animated');
  $(div2).attr({
    role: "progressbar",
    "aria-valuenow": "75",
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  });
  $(div2).css("width", "100%");

  $(div).append(div2);
  $(parentDiv).append(div);
}