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
    
});