function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("profilePic").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};

//THIS SCRIPT IS FOR THE AJAX
$(document).ready(() => {
    $('#update').click(() => {
        //get form data
        var profilePic = $('#uploadPreview').attr('src');

        var firstName;
        if ($('#firstName').val() == null) firstName = $('#firstName').attr('placeholder');
        else firstName = $('#firstName').val();

        var lastName;
        if ($('#lastName').val() == null) lastName = $('#lastName').attr('placeholder');
        else lastName = $('#lastName').val();

        var biography;
        if ($('#biography').val() == null) biography = $('#biography').attr('placeholder');
        else biography = $('#biography').val();

        var email;
        if ($('#email').val() == null) email = $('#email').attr('placeholder');
        else email = $('#email').val();

        var mobileNum;
        if ($('#mobileNum').val() == null) mobileNum = $('#mobileNum').attr('placeholder');
        else mobileNum = $('#mobileNum').val();

        var telNum;
        if ($('#telNum').val() == null) telNum = $('#telNum').attr('placeholder');
        else telNum = $('#telNum').val();

        var address;
        if ($('#address').val() == null) address = $('#address').attr('placeholder');
        else address = $('#address').val();


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
            url: $('#edit').attr('action'), //THIS IS TO BE EDITED BY AXEL, how to enter the url of the item being edited
            method: 'PUT',
            data: profile, //can use $('#edit').serialize() -> KEY would be 'name' and VALUE would be 'value'
            success: (data, status) => { 
                console.log('edit successful'); 
            },
            error: () => {
                // what to do when the request fails?
            }
        });
    })
});