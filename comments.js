var ref = new Firebase("https://<1:747927384510:web:ea093ffe64a876b46989ef>.firebaseio.com/");

function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/&/g, '-and-')
        .replace(/[\s\W-]+/g, '-')
        .replace(/[^a-zA-Z0-9-_]+/g, '');
}

var postRef = ref.child(slugify(window.location.pathname));

$("#comment").submit(function () {
    postRef.push().set({
        name: $("#name").val(),
        message: $("#message").val(),
        md5Email: md5($("#email").val()),
        postedAt: Firebase.ServerValue.TIMESTAMP
    });

    $("input[type=text], textarea").val("");
    return false;
});

postRef.on("child_added", function (snapshot) {
    var newPost = snapshot.val();
    $(".comments").prepend('<div class="comment">' +
        '<h4>' + escapeHtml(newPost.name) + '</h4>' +
        '<div class="profile-image"><img src="https://source.unsplash.com/50x50/?games,computers' + escapeHtml(newPost.md5Email) + '?s=100&d=retro"/></div> ' +
        '' + moment(newPost.postedAt).fromNow() + '<p>' + escapeHtml(newPost.message) + '</p></div>');
});

$(function () {
    var ref = new Firebase("https://comments-section-e37f0.firebaseio.com/"),
        postRef = ref.child(slugify(window.location.pathname));

    postRef.on("child_added", function (snapshot) {
        var newPost = snapshot.val();
        $(".comments").prepend('<div class="comment">' +
            '<h4>' + escapeHtml(newPost.name) + '</h4>' +
            '<div class="profile-image"><img src="https://source.unsplash.com/50x50/?games,computers' + escapeHtml(newPost.md5Email) + '?s=100&d=retro"/></div> ' +
            '<span class="date">' + moment(newPost.postedAt).fromNow() + '</span><p>' + escapeHtml(newPost.message) + '</p></div>');
    });

    $("#comment").submit(function () {
        var a = postRef.push();

        a.set({
            name: $("#name").val(),
            message: $("#message").val(),
            md5Email: md5($("#email").val()),
            postedAt: Firebase.ServerValue.TIMESTAMP
        });

        $("input[type=text], textarea").val("");
        return false;
    });
});

function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/&/g, '-and-')
        .replace(/[\s\W-]+/g, '-')
        .replace(/[^a-zA-Z0-9-_]+/g, '');
}


function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
