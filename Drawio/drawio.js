// Structure
window.drawio = {
    shapes: [],
    tempArrToKeepElements: [],
    selectedShape: 'brush',
    canvas: document.getElementById('my-canvas'),
    // Halda utan um canvas context-ið (tólið til að teikna á canvasinn)
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    // To be able to use constants (so there is no need for the '')
    availableShapes: {
        RECTANGLE: 'rectangle',
        LINE: 'line',
        CIRCLE: 'circle',
        BRUSH: 'brush',
        TEXT: 'text',
        MOVE: 'move'
    }
};

// Document is loaded and parsed
// Til að geta sett upp eventHandlera og query-a DOM-ið að vild
// án þess að hafa áhyggjur af availability
$(function () {
    var color = "black";
    var size = 4, checked = false;
    drawio.ctx.strokeStyle = color;
    drawio.ctx.lineWidth = size;
    //var dragging = false;
    function drawCanvas() {
        // element currently not in shapes array so render specifically
        if (drawio.selectedElement) {
            drawio.selectedElement.render();
        }
        // Render every shape in the array
        for (var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    }
    // When div with class=icon is pressed
    $('.icon').on('click', function () {
        // For the icon to look like it's the only selected one
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
    });

    function save() {
        storage = window.localStorage;
        var content = JSON.stringify(drawio);
        storage.setItem(drawio.canvas, content);
        console.log(storage);
    };

    $('.save').on('click', function () {
        save();
    });

    function undo() {
        // Keep track of the last shape made in the canvas
        var indexOfLast = drawio.shapes.length - 1;
        // The item we want to undo
        var lastItem = drawio.shapes[indexOfLast];
        // Reduce the array keeping the selected shapes by one
        drawio.shapes.pop();
        // Push the element removed to the temporary array to be able to redo later
        drawio.tempArrToKeepElements.push(lastItem);
        // Clear the shape from the canvas
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        // Re-render the new canvas
        drawCanvas();
    };

    function redo() {
        // Take the index of the newest item in the array that
        // keeps all the items that have been undone
        var indexToRedo = drawio.tempArrToKeepElements.length - 1;
        // The item we want back
        var itemToRedo = drawio.tempArrToKeepElements[indexToRedo];
        drawio.tempArrToKeepElements.pop();
        if (itemToRedo !== undefined) {
            drawio.shapes.push(itemToRedo);
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        }
        drawCanvas();
    };

    $('.undo').on('click', function () {
        undo();
    });

    $('.redo').on('click', function () {
        redo();
    });

    // Get shape to move
    function getShape(mousePosition) {
        for (let i = 0; i < drawio.shapes.length; i++) {
            let ele = drawio.shapes[i];
            console.log('inni i for');
            console.log(ele);
            if ((ele.position.x >= (mousePosition.x) && ele.position.x + ele.width <= (mousePosition.x)) || (ele.position.y <= (mousePosition.y) && ele.position.y + ele.height >= (mousePosition.y))) {
                return ele;
            }
            else if ((ele.position.x <= (mousePosition.x) && ele.position.x + ele.radius >= (mousePosition.x)) || (ele.position.y <= (mousePosition.y) && ele.position.y + ele.radius >= (mousePosition.y))) {
                return ele;
            }
        }
    }
    // mousedown
    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0);
                break;
            case drawio.availableShapes.BRUSH:
                drawio.selectedElement = new Brush({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, { x: 0, y: 0 });
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0, color, $('#textShape').val(), $('#fontSize').val().concat(' ', $('#textFont').val()));
                break;
            case drawio.availableShapes.MOVE:
                drawio.selectedElement = getShape({ x: mouseEvent.offsetX, y: mouseEvent.offsetY });
        }
    });

    // mousemove
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if (drawio.selectedElement) {
            drawio.ctx.beginPath();
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.ctx.closePath();
            if (drawio.selectedShape == 'move') {
                drawio.selectedElement.move(mouseEvent.offsetX, mouseEvent.offsetY);
            }
            else {
                console.log(drawio.selectedShape)
                drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            }
        }
        drawCanvas();
    });

    // mouseup
    $('#my-canvas').on('mouseup', function () {
        if (drawio.selectedElement !== null && typeof (drawio.selectedElement) !== "undefined") {
            drawio.shapes.push(drawio.selectedElement);
            /* console.log(drawio.shapes); */
            drawio.selectedElement = null;
        }
    });
});
