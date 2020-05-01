$(document).ready(() => {
  var postId = $('#pid').val(); // get post id of the post you're viewing
  $('#delete-btn').click(function (event) {
    event.preventDefault(); // prevent refresh
    $.ajax({
      url: `/post/${postId}`,
      method: "DELETE",
      success: (data, status) => {
        console.log(data);
      },
      error: () => {
        console.log('error deleting post.');
      }
    })
  });
});