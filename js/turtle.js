/**
 * Created by joey on 7/13/16.
 */
Math.radians = function(degrees){
    return degrees / 180 * 3.1415927;
}

Math.degrees = function(radians){
    return radians * 180 / 3.1415927;
}

var Turtle = function(element){

    this.svg = new SVG(element);
    this.svg = this.svg.group();
    this.isdown = true;

    this.angle = 0;
    this.x = 0;
    this.y = 0;

    this.scale = 3.5433;

    this.pi = 3.14159265359;

    this.up = function(){
        this.isdown = false;
        return this;
    }

    this.down = function(){
        this.isdown = true;
        return this;
    }

    this.fw = function(distance){
        var newx = this.x + (Math.sin(this.angle) * distance * this.scale);
        var newy = this.y + (Math.cos(this.angle) * distance * this.scale);
        if(this.isdown)
            this.svg.line(this.x, this.y, newx, newy);
        this.x = newx;
        this.y = newy;
        return this;
    }

    this.left = function(degrees){
        this.angle += Math.radians(degrees);
        return this;
    }

    this.right = function(degrees){
        this.angle -= Math.radians(degrees);
        return this;
    }

    this.circle = function(diameter){
        if(this.isdown){
            var circle = this.svg.circle(diameter * this.scale);
            circle.translate(this.x - diameter / 2 * this.scale, this.y - diameter / 2 * this.scale);
        }
        
        return this;
    }

    this.arc = function(radius, degrees){
        if(this.isdown){
            var path = this.svg.path(describeArc(this.x, this.y, radius * this.scale, Math.degrees(this.angle), degrees + Math.degrees(this.angle)));
            path.fill('none');
            path.stroke({ color: '#000'});
            //var ellipse = this.svg.ellipse();
            //ellipse.radius(a, b * 100);
            //ellipse.translate(this.x, this.y);
        }
        
        return this;
    }

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;
    }
};