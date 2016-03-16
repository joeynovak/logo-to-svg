var turtle = null;
var logo = null;
var canvas;
var form;
var sprite;
var textOutput;
var oldcode;
var fast;
var out;
var DelayTurtle;

function init(svgId) {
    form = document.getElementById(form_id);
    textOutput = document.getElementById(textoutput_id);
    sprite = document.getElementById(turtle_id);

    //// I hate opera, I hate firefox.
    //canvas.style.width = "100%";
    //canvas.width = 500;
    //
    //canvas.style.height = "100%";
    //canvas.height = 500;
    
    oldcode = document.getElementById(oldcode_id);
}

function run(speed, drawbits) {
    logo = new Logo();

    fast = 5;
    var canvas = new C2S(
        {

        }
    );
    turtle = new DelayTurtle(canvas, sprite, fast, false);
    logo.setTurtle(turtle);
    logo.setTextOutput(textOutput);

    turtle.stop();
    if (speed !== fast) {
        fast = speed;
        var newturtle = newturtle = new DelayTurtle(canvas, sprite, fast, drawbits);
        logo.setTurtle(newturtle);
        turtle = newturtle;
    }
  
    oldcode.innerHTML += "\n" + editor.getValue();
    //form.code.value = ""
  
    out = logo.run(editor.getValue());

    document.getElementById('svg-container').appendChild(turtle.turtle.c.getSvg());
            
    if (out && out.type === "error") {
        alert(out.data);
        setup();
    }
}

function stop() {
    turtle.stop();
}

function saveSVG(element) {
    element.setAttribute('download',"drawing.svg");
    element.setAttribute('href',"data:image/svg+xml;utf8," + turtle.turtle.getSVGString());
}

function clearcanvas() {
    //var ctx = canvas.getContext('2d');
    //ctx.fillStyle = "rgb(255,255,255)";
    //ctx.fillRect(0, 0, 500, 500);
    //textOutput.innerHTML = "";
}
