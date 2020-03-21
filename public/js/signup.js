function checkPassword(field1, field2, val)
{
    var valid = val;

    if(field1.val() != field2.val() || field1.val() == '') {
        valid = false;
        field1.css('border-color', 'red');
        field2.css('border-color', 'red');  
        $("#warning").text("Password does not match.");   
    } else {
        field1.css('border-color', 'white');
        field2.css('border-color', 'white');
    }

    return valid;
}

function checkField(field, val) {
    var valid = val;

    if(field.val() == '') {
        valid = false;
        field.css('border-color', 'red');
        $("#warning").text("Fill-in missing information.");
    } else {
        field.css('border-color', 'white');
    }

    return valid;
}

$("#submit").click(function(){
    var valid = true;

    valid = checkPassword($("#inputPassword"), $("#retypePassword"), valid);
    valid = checkField($("#inputEmail"), valid);
    valid = checkField($("#inputUsername"), valid);



    if(valid != true) {
        return false;
    }
    else
    {
        $("#warning").text("");
        return true;
    }
});

