var active = false;
var txt;
var sln;
var passactive = false;
var txtnow;
$(function(){
    var ifhide = localStorage.getItem("ifhide");
    if(ifhide === "true"){
        $("#info").hide();
        $("#show-info").show();
    }
    $("#close-info").click(function(){
        localStorage.setItem("ifhide", true);
        $("#info").fadeOut();
        $("#show-info").fadeIn();
    })
    $("#show-info").click(function(){
        localStorage.setItem("ifhide", false);
        $("#info").fadeIn();
        $("#show-info").fadeOut();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    })
    $("#start").click(function(){
        txt = document.getElementById("input").value;
        sln = txt.length;
        if(sln > 1){
            upgrade();
        }else{
            $("#input").addClass("error");
        }
    })
    $("input").on('keypress',function(e) {
        if(e.which == 13) {
            txt = document.getElementById("input").value;
            sln = txt.length;
            upgrade();
        }
    });
    $("#show-pass").click(function(){
        if(active === true){
            $("#pass").prop('type', 'text');
            $("#show-pass").hide();
            $("#hide-pass").show();
            passactive = true;
        }
    })
    $("#hide-pass").click(function(){
        if(active === true){
            $("#pass").prop('type', 'password');
            $("#hide-pass").hide();
            $("#show-pass").show();
            passactive = false;
        }
    })
    $("#copy-pass").click(function(){
        if(active === true){
            if(passactive === true){
                copyToClipboard("pass");
                copyanimation();
            }
        }
    })
    $("#powered").click(function(){
        location = "https://leszekk.eu/";
    })
    $("#powered2link").click(function(){
        location = "https://leszekk.eu/";
    })
    $("#more-btn").click(function(){
        $("#more").slideToggle();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    })
})
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}
function genSymbol(length) {
    var result = '';
    var characters = '!@#$%^&*()_+-=/.<>:';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function gen4DigitNum(){
    var val = Math.floor(1000 + Math.random() * 9000);
    return val;
}
//general functions
function uppercase(a){
    var gen1 = Math.floor((Math.random() * a.length));
    var letter = a[gen1];
    letter = letter.toUpperCase();
    var txt2 = replaceAt(a, gen1, letter);
    return txt2;
}
function dbletter(b){
    var gen2 = Math.floor((Math.random() * b.length));
    var letter2 = b[gen2];
    letter2 = letter2 + letter2;
    var txt3 = replaceAt(b, gen2, letter2);
    return txt3;
}
function numadd4(c){
    var digits = gen4DigitNum();
    c = c.concat("", digits);
    return c;
}
function endsym(d){
    var gensymbols = genSymbol(1);
    var gpass = d.concat("", gensymbols);
    return gpass;
}
function upgrade(){
    $("#input").removeClass("error");
    txtnow = txt;
    if($("#one").is(":checked")){
        txtnow = uppercase(txtnow);
    }
    if($("#two").is(":checked")){
        txtnow = dbletter(txtnow);  
    }
    if($("#three").is(":checked")){
        txtnow = numadd4(txtnow);
    }
    if($("#four").is(":checked")){
       txtnow = endsym(txtnow); 
    }
    $("#info-pass").text("Your upgraded password:");
    document.getElementById("pass").value = txtnow;
    active = true;
}
function copyToClipboard(element) {
    var copyText = document.getElementById(element);
    copyText.select();
    document.execCommand("copy");
}
function copyanimation(){
    $("#info-pass").text("Copied!");
    setTimeout(copyanimation2, 3000);
} 
function copyanimation2(){
    $("#info-pass").text("Your upgraded password:");
}