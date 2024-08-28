document.addEventListener('DOMContentLoaded', function () {
    var editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var errorId = this.getAttribute('data-id');

            fetch(`/edit/${errorId}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('editCode').value = data.code;
                    document.getElementById('editErrtext').value = data.errtext;
                    document.getElementById('editRecommendation').value = data.recommendation;
                    document.getElementById('editObj').value = data.obj;

                    document.getElementById('editErrorForm').action = `/edit/${data.id}`;
                });
        });
    });
});
