function txtLimit(object,textLeng) {
    if(typeof arguments[0]=='object'){
        for (i = 0; i < arguments[0].length; i++) {
            var str = arguments[0][i].innerHTML;
            if (str.length > textLeng) {
                arguments[0][i].innerHTML = str.substring(0, textLeng) + "...";
            }
        }
    }else{
        return object.substring(0, textLeng) + "...";
    }
}
$(function () {
    txtLimit($(".textnum10"),60);
    txtLimit($(".textnum94"),94);
    txtLimit($(".textnum24"),24);
});
