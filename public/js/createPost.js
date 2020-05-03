$(document).ready(function() {
  $('#postForm').submit(function (e) {
    e.preventDefault();

    var title = $('#postTitle').val(); // get comment box
    var caption = $('#postCaption').val(); // get post id of the post you're viewing

    // get FormData (need for file uploads)
    var formData = new FormData(this); 
    formData.append("title", title);
    formData.append("caption", caption);

    $.ajax({
      url: `/post/upload`,
      method: "PUT",
      data: formData,
      processData: false,
      contentType: false,
      success: (data, status) => {
        // redirect to profile
        $(location).attr('href', '/profile'); 
      },
      error: () => {
        console.log('error submitting post.');
      }
    });

    // render indeterminate progress bar
    renderCreateProgressBar();
    // disable buttons to prevent multiple uploading
    $("#upload-btn").attr("disabled", true);
    $("#close-upload-btn").attr("disabled", true);
  });
});

// Renders bootstrap indeterminate progress bar
function renderCreateProgressBar() {
  var parentDiv = $(".modal-content");
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


