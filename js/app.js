'use strict';


let $template = $('#photo-template').html();
let $container = $('#photo-container');
let $dropdown = $('#dropdown');
let $page1 = $('#page1');
let $page2 = $('#page2');
let keyWords = [];

let photoArray = [];

function Photo(img, title, desc, key, horns, page) {
  this.img = img;
  this.title = title;
  this.desc = desc;
  this.key = key;
  this.horns = horns;
  this.page = page;

  photoArray.push(this);
}

const showPhotos = function(data){
  console.log(data);
  data.forEach(photo => {
    
    //determine page number from url
    let page;
    if (this.url === './data/page-1.json'){
      page = 1;
    } else if (this.url === './data/page-2.json'){
      page = 2;
    }

    let photoObject = new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns, page);
    
    if (keyWords.indexOf(photoObject.key) == -1) {
      keyWords.push(photoObject.key);
      $dropdown.append(
        $('<option></option>').text(photoObject.key)
      )
    }
  });

  photoArray.sort((a,b) => 
     a.title > b.title ? 1:-1
  );

  console.log(photoArray);

  photoArray.forEach(photo => {
    let rendered = Mustache.render($template, photo);
    $container.append(rendered);
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

$page1.click(function () {
  $container.empty();
  photoArray = [];
  $.ajax('./data/page-1.json').then(showPhotos);
});

$page2.click(function () {
  $container.empty();
  photoArray = [];
  $.ajax('./data/page-2.json').then(showPhotos);
});

$.ajax('./data/page-1.json').then(showPhotos);