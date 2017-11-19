var session;
var tiempoSplash = 2500;
var dataDinos = {};
var servidor = "http://52.14.75.70/"
var dataUsuario = {};
dataUsuario.paginasVisitadas = [];
dataUsuario.dinosEscaneados = [];
dataUsuario.miniJuegos = [];
var dinoActivo = -1;
var paginaActiva = "";
var inicioSesion = (new Date()).getTime();
var SO;
var language;
var isphone;
var dataIpapi = {};
var ordenPeso = [-1, 0, 1];
var ordenTamano = [-1, 0, 1];
var Login=false;



function responsive() {
   console.log("FUNCION RESPONSIVE. poniendo el celu en portrait...");
    //window.screen.orientation.lock('portrait');
    var aspectRatio = calcularAspectRatio();
    if(aspectRatio>1){
        //esto lo saco porq lo estoy haciendo por CSS con width:55vh
       // $(".contenidoCentrado").width(window.innerHeight / aspectRatio / 1.2);
    }

}
function calcularAspectRatio() {
    //1.33 ipad
    //1.775 iphone5
    return window.innerHeight / window.innerWidth;
}

function hideError(){
    $("#error-login").hide();
}






$(document).ready(function() {
   // cordova.plugins.Keyboard.disableScroll(false);
    isphone = false;
    if (document.URL.indexOf("http://") === -1 &&
        document.URL.indexOf("https://") === -1) {
        isphone = true;
        console.log("ES UN TELEFONO, NO LA COMPU");
    } else {
        console.log("ESTAMOS EN LA COMPU...");
    }



   // document.addEventListener("resize", responsive, false);
    unloading();
    $("#splash").show();
    setTimeout(function() {
        if(Login){
            CargarHome();
        }else{
            CargarLogin();
        }

    }, tiempoSplash); //splash a la fuerza 1 seg


    $("#button-login").click(function() {
        console.log(paginaActiva);
        Autentificar();

    }); //  fin click scanner


});
function addtarea(){
    $("#crear-tarea").show();
    $("#"+paginaActiva).hide();;
    paginaActiva="crear-tarea";

}
function loading(){
    $("#loading").show();
}
function unloading(){
    $("#loading").hide();
}
function openSidebar() {
    document.getElementById("my-sidebar").style.display = "block";
    document.getElementById("fondo-sidebar").style.display = "block";
}
function asignar_personal(){
      $("#asignar-personal").show();
    paginaActiva="asignar-personal";
}
function closeSidebar() {
   document.getElementById("my-sidebar").style.display = "none";
    document.getElementById("fondo-sidebar").style.display = "none";
}
function CargarLogin(){
    $("#login").show();
    $("#splash").hide();
    paginaActiva="login";
    //$( "#splash" ).toggle( "Drop","","500" );

};

function CargarHome(){
    $("#menu-principal").show();
    console.log(window.sessionStorage.getItem("user"));
};

function Autentificar(){
    //var user=$("#user-login").val();
    //var password=$("#user-password").val();
    //console.log(user);
    //console.log(password);
    /*$.ajax({
        type: "POST",
        url: servidor + 'api/v1/authenticate',
        contentType: "application/x-www-form-urlencoded",
        data: {
            username: user,
            password: password
        },
        dataType: "text",
        success: function( response )
        {
            var responseJson = JSON.parse(response);

            if(responseJson.response == true)
            {
               canLogin=true;
                window.sessionStorage.setItem('user',user);
                window.sessionStorage.setItem('token',responseJson.data.token);
                window.sessionStorage.setItem('rol',responseJson.data.rol);

                $("#home").show();
                $("#"+paginaActiva).hide();
                paginaActiva="home";
                CargarHome();

            }

        },
        error: function( error ){

            $("#error-login").show();
            console.log( "ERROR:", error );

        }
    });*/
    /*const fakeLogin = function()
    {
        //var responseJson = JSON.parse(response);

        //if(responseJson.response == true)
        //{
           canLogin=true;
            window.sessionStorage.setItem('user',"user");
            window.sessionStorage.setItem('token',"responseJson.data.token");
            window.sessionStorage.setItem('rol',"responseJson.data.rol");

            $("#home").show();
            $("#"+paginaActiva).hide();
            paginaActiva="home";
            CargarHome();

        //}

    }

    fakeLogin();*/

}


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}
