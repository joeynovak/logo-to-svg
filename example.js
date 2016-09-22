// turtle
//     .down()
//     .fw(100)
//     .left(90)
//     .fw(100)
//     .circle(200)
//     .arc(98, -180)

//     .up()
//     .fw(80)

//     .down()
//     .right(90)
//     .fw(25)


livingHinge(100, 20, 5, 1, 1);

function sawTooth(kerf, depth, width, numberOfTeeth){
    for(i=0;i<numberOfTeeth;i++){
        turtle
            .fw(width - kerf)
            .right(90)
            .fw(depth + kerf)
            .left(90)
            .fw(width + kerf)
            .left(90)
            .fw(depth + kerf)
            .right(90)
    }
}

function livingHinge(width, height, nLines, gap, spacing){
    var currentHeight = 0;
    turtle.right(90)
    lineWidth = (width - ((nLines - 1) * gap)) / nLines;
    lineCount = 0;
    while(currentHeight < height){
        lineCount++;

        if(lineCount % 2 == 1){
            for(i=0;i<nLines;i++){
                turtle
                    .down()
                    .fw(lineWidth)
                    .up()
                    .fw(gap)
                if(i+1 == nLines){
                    //If it's the last line, go back the distance of the gap.
                    turtle
                        .right(180)
                        .fw(gap)
                        .right(180)
                }
            }
        } else {
            for(i=0;i<=nLines;i++){
                if(i==0){
                    turtle
                        .down()
                        .fw((lineWidth - gap)/2)
                        .up()
                        .fw(gap)

                } else if(i == nLines){
                    turtle
                        .down()
                        .fw((lineWidth - gap)/2)
                        .up()
                } else {
                    turtle
                        .down()
                        .fw(lineWidth)
                        .up()
                        .fw(gap)
                }

            }

        }



        turtle.left(180);
        turtle.fw(width)
        turtle.right(90);
        turtle.fw(spacing);
        turtle.right(90);

        currentHeight += spacing;

    }
}