function checkEqual(field1, field2, val) {
    var valid = val;

    if(field1.val() != field2.val() || field1.val() == '') {
        valid = false;
        field1.css('background-color', 'red');
        field2.css('background-color', 'red');
        $("#warning").text("Password does not match");
    } else {
        field1.css('background-color', 'white');
        field2.css('background-color', 'white');
    }

    return valid;
}