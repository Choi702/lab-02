'use strict';

let $template = $('#photo-template');
let $container = $('#photo-container');
let $dropdown = $('#dropdown');
let $page1 = $('#page1');
let $page2 = $('#page2');

function Photo(img, title, desc, key, horns) {
  this.img = img;
  this.title = title;
  this.desc = desc;
  this.key = key;
  this.horns = horns;
}

let keyWords = [];

let getData = function(data){

  data.forEach(photo => {
    
    let photoObject = new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns);
    let $newPhoto = $template.clone();

    $newPhoto.removeAttr('id');
    $newPhoto.attr('class', `${photoObject.key} photo`);
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
}


$dropdown.change(function () {

  let $photos = $('.photo');
  let val = $(this).val();
  let $photoToShow = $('.' + val);

  if (val === 'default'){
    $photos.show();
  } else {
    $photos.hide();
    $photoToShow.show();   
  }
})

$.ajax('./data/page-1.json').then(getData);
$.ajax('./data/page-2.json').then(getData);
