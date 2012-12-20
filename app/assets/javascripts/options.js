function save_parameter(name){
    var input = document.getElementById(name);
    localStorage[name] = input.value;
}

function load_parameter(name){
    var value = localStorage[name];
    if (!value) {
        return;
    }
    var input = document.getElementById(name);
    input.value = value;
}

function save_options() {
    save_parameter("pomodoro-duration");
    save_parameter("short-duration");
    save_parameter("long-duration");

    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

function restore_options() {
    load_parameter("pomodoro-duration");
    load_parameter("short-duration");
    load_parameter("long-duration");
}

$(function() {
    OptionsView = require('/views/options_view');
    optionsView = new OptionsView();
    console.debug(optionsView);
    optionsView.render();

});