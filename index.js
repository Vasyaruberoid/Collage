window.addEventListener('load', function(){
const collage = document.getElementById('colage');



function fetchImages() {
    fetch('https://dog.ceo/dog-api/random/10')
    .then(response => response.json())
    .then(data => {
        images  = data.message;
        startCollage();
    })
    .catch( err => console.log(err));
}


});