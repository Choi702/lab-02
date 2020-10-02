'use strict';

let $template = $('#photo-template');
let $container = $('#photo-container');
let $dropdown = $('#dropdown');
function Photo(img, title, desc, key, horns) {
  this.img = img;
  this.title = title;
  this.desc = desc;
  this.key = key;
  this.horns = horns;


}

let keyWords = [];


$.ajax('./data/page-1.json').then(data => {

  data.forEach(photo => {

    let photoObject = new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns);
    let $newPhoto = $template.clone();
    $newPhoto.attr('class', `${photoObject.key} photo`);
    // $newPhoto.attr('class', 'photo'); //if we set the class twice, it overrides the first and that was what was happening from line 25 and 26. It was erasing the key class
    $newPhoto.find('h2').text(photoObject.title);
    $newPhoto.find('p').text(photoObject.desc);
    $newPhoto.find('img').attr('src', photoObject.img);
    $container.append($newPhoto)
    if (keyWords.indexOf(photoObject.key) == -1) {
      keyWords.push(photoObject.key);
      $dropdown.append(
        $('<option></option>').text(photoObject.key)
      )
    }

  });

})

$dropdown.change(function () {

  // $container.hide();
  let $photos = $('.photo');
  $photos.hide();


  let val = $(this).val();
  console.log(val);
  let $photoToShow = $('.' + val);
  $photoToShow.show();

  // $photos.each(photo =>{
  
  //   let $photo =  $photos[photo];

  //   console.log($photo);
  //   })
    
  
    
    



})

