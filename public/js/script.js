//THIS SCRIPT IS FOR THE AJAX
$(document).ready(() => {
    //this function adds an image to the gallery
    function addToGallery (item, parentDiv) {
        //DOM Creation

        var linkDiv = document.createElement('div');
        var link = document.createElement('a');
        var img = document.createElement ('img');

        //adding meaning
        
        $(link).attr('data-fancybox', 'gallery');
        $(link).attr('data-type', 'ajax');
        $(link).attr('data-src', 'post.hbs'); //Dan, please implement post.hbs
        $(link).attr('href', 'javascript:;');

        $(img).attr('src', item.image);

        //appending
        $(link).append(img);
        $(linkDiv).append(link);
        $(parentDiv).append(linkDiv);
    }


    $.ajax('getGallery', {
        method: 'GET',
        success: (data, status) => {
            // what to do when the request is successful?
            //console.log(data);
            var gallery = $('.gallery');

            data.forEach((item, index) => { //data is the students sent by the server
                    addToGallery(item, gallery);
            });
        },
        error: () => {
            // what to do when the request fails?
        }
    });

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