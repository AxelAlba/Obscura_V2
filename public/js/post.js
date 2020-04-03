$(document).ready(() => {
  $('#comment-btn').click(function(event) {
    event.preventDefault(); // PREVENT REFRESH
    // get post id
    var pid = $('#pid').val();
    // get comment
    var commentBox = $('#comment-box')
    var comment = commentBox.val();
    // empty string handler
    if (comment == '') { return }
    // ajax POST
    $.ajax({
      url: `/api/post/${pid}/comment/create`,
      method: "POST",
      data: {
        commenter: "5e8353af47a78000842d1450", // user_id 
        comment: comment
      },
      success: (data, status) => {
        console.log('success', data);
        // dom building here...
      },
      error: () => {
        console.log('error submitting comment.');
      }
    });
    console.log(comment);
    commentBox.val('');
  });
});

