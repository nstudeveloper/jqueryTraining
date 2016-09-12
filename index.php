<!DOCTYPE html>
<html>
<head>
    <title>js learning</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<div class="container">
    <div id="films"></div>
    <button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#myModal">add new film
    </button>

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="insertion">
                <h3>Insert new film</h3>

                <div class="form-group">
                    <label for="title">Film title</label>
                    <input type="text" class="form-control" id="title" placeholder="Title">
                </div>
                <div class="form-group">
                    <label for="desc">Film description:</label>
                    <textarea type="text" id="desc" class="form-control" placeholder="Description"></textarea>
                </div>

                <button id="add-film" class="btn btn-success">Add film</button>
                <button id="cancel" class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </div>
</div>
<script src="js/mustache.js"></script>
<script src="js/jquery-3.1.0.min.js"></script>
<script src="js/script.js" type="text/javascript"></script>
<script src="js/bootstrap.js"></script>
</body>
</html>