$(document).ready(function () {
    var $wrapper = $("#wrapper");

    var $filmTemplate =
        "<div class='item'>" +
        "<h4>{{title}}</h4>" +
        "<p>{{description}}</p>" +
        "<button data-id='{{id}}'class='remove btn btn-danger'>X</button>" +
        "<button data-like-id='{{id}}' class='like btn btn-success'>Like it</button>" +
        "</div>";

    function addFilm(film) {
        $wrapper.append(Mustache.render($filmTemplate, film));
    }

    $.ajax({
        type: 'GET',
        url: 'http://rest.com/films',
        success: function (films) {
            $.each(films, function (i, film) {
                addFilm(film);
            })
        },
        error: function () {
            alert('error loading films');
        }
    });

    $('#add-film').on('click', function () {
        var film = {
            title: $("#title").val(),
            description: $("#desc").val(),
        }

        $.ajax({
            type: 'POST',
            url: 'http://rest.com/films',
            data: film,
            success: function (film) {
                addFilm(film);
            },
            error: function () {
                alert('error uploading film');
            }
        });

    });

    $wrapper.delegate('.remove', 'click', function () {
        var $div = $(this).closest('div');

        $.ajax({
            type: 'DELETE',
            url: 'http://rest.com/films/' + $(this).attr('data-id'),
            success: function (newFilm) {
                $div.fadeOut(300, function () {
                    $(this).remove();
                });
            },
        });
    });

    $wrapper.delegate('.like', 'click', function () {
        $.ajax({
            type: 'PUT',
            url: 'http://rest.com/films/' + $(this).attr('data-like-id'),
            data: {
                "like": 1
            },
            success: function () {
                alert('Like it');
            },
            error: function () {
                alert('Error');
            }
        });
    });
});