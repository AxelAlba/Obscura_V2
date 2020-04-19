$(document).ready(() => {

  $('#edit').submit(() => {
    //get form data
    var profilePic = $('#profilePic').val();  
    var firstName = $('#firstName').val();  
    var lastName = $('#lastName').val();  
    var biography = $('#biography').val();  
    var email = $('#email').val(); 
    var mobileNum = $('#mobileNum').val();  
    var telNum = $('#telNum').val();  
    var address = $('#address').val(); 

    var profile = {
      //uid 
      email: email,
      //password
      //username
      firstName: firstName,
      lastName: lastName,
      profilePic: profilePic,
      bio: biography,
      mobile: mobileNum,
      telephone: telNum,
      address: address,
      //followers array
      //followings array
    };  
    $.ajax({
      url: '/api/updateProfile/' + $('#id').val(),
      method: 'PUT',
      data: profile, 
      success: (data, status) => { 
        console.log('edit successful'); 
      },
      error: () => {
          console.log('edit unsuccessful');
      }
    });
  })
});

// Helper functions
/* //prioritize image url
function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("profilePic").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};
*/