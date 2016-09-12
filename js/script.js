$(document).ready(function () {
    var $films = $("#films");

    var filmTemplate =
        "<div class='item' id='item-{{id}}'>" +
        "<h4>{{title}}</h4>" +
        "<p>{{description}}</p>" +
        "<button data-id='{{id}}'class='remove btn btn-danger'>X</button>" +
        "<button data-like-id='{{id}}' class='like btn btn-success'>Like it</button>" +
        "</div>";

    // close model window
    function closeModal() {
        $(function () {
            $('#myModal').modal('toggle');
        });
    }

    // set/unset 'liked' style
    function toggleStyleLike(film) {
        var filmId = $('#item-' + film.id);

        if (film.isliked == 1) {
            if (filmId.hasClass('liked')) {
                filmId.removeClass('liked');
            }
        } else {
            filmId.addClass('liked');
        }
    }

    // clear input fields
    function clearInput() {
        $("#title").val("");
        $("#desc").val("");
    }

    // function for render films
    function addFilm(film) {
        $films.append(Mustache.render(filmTemplate, film));
    }

    // 'get' query for get all films
    $.ajax({
        type: 'GET',
        url: 'http://rest.com/films',
        success: function (films) {
            $.each(films, function (i, film) {
                addFilm(film);
                toggleStyleLike(film);
            })
        },
        error: function () {
            alert('error loading films');
        }
    });

    // 'post' query for create new film
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
                clearInput();
                closeModal();
            },
            error: function () {
                alert('error uploading film');
            }
        });

    });

    $films.delegate('.remove', 'click', function () {
        var $div = $(this).closest('div');

        $.ajax({
            type: 'DELETE',
            url: 'http://rest.com/films/' + $(this).attr('data-id'),
            success: function (newFilm) {
                $div.fadeOut(200, function () {
                    $(this).remove();
                });
            },
        });
    });

    $films.delegate('.like', 'click', function () {
        var data;

        // getLike(id, setLike);
        // getLike(id, callback) { .... callback();
        $.ajax({
            type: 'GET',
            url: 'http://rest.com/films/' + $(this).attr('data-like-id'),
            success: function (film) {
                if (film.isliked == 1) {
                    data = 0
                } else {
                    data = 1
                }
            },
            error: function () {
                // alert('error loading film');
            },
            async: false
        });

        $.ajax({
            type: 'PUT',
            url: 'http://rest.com/films/' + $(this).attr('data-like-id'),
            data: {
                "isliked": data
            },
            success: function (film) {
                toggleStyleLike(film);
            },
            error: function () {
                alert('Error');
            }
        });
    });

    $('#cancel').on('click', function () {
        closeModal();
    });
});