    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 50;
    var paddleWidth = 100;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    /* ladrillos */
    var brickRowCount = 15;
    var brickColumnCount = 5;
    var brickWidth = 50;
    var brickHeight = 50;
    var brickPadding = 5;
    var brickOffsetTop = 100;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 3;
    var bricks = [];
    var img = new Image();
    img.src = "assets/img/lab2.png";

    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            /*alert("YOU WIN, CONGRATS!");*/
                            console.log("Win");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        var t = true;
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    if (t)
                    {
                        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;

                        // brickY = brickY * Math.sin(c);
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        // ctx.beginPath();
                        // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        // /*ctx.fillStyle = "#fff";*/
                        // ctx.fill();
                        // ctx.closePath();
                        ctx.drawImage(img, brickX, brickY);
                        t = false;
                    }
                    else
                    {
                        t = true;
                    }
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "20px Roboto";
        ctx.fillStyle = "#fff";
        ctx.fillText("Puntaje: "+score, 30, 40);
    }
    function drawLives() {
        ctx.font = "20px Roboto";
        ctx.fillStyle = "gris";
        ctx.fillText("Vidas: "+lives, canvas.width-105, 40);
    }
    function newelement() {
        var img = new Image();
        img.src = "assets/img/fondo.png";
        ctx.drawImage(img, 300, 250);
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        newelement();
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    /*alert("GAME OVER");*/
                    console.log("Game Over");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 10;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 10;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    /*llamado dibujoooo*/
draw();







