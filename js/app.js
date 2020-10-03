'use strict';

let $template = $('#photo-template').html();
console.log($template);

let $container = $('#photo-container');
let $dropdown = $('#dropdown');
let $page1 = $('#page1');
let $page2 = $('#page2');
let keyWords = [];

function Photo(img, title, desc, key, horns, page) {
  this.img = img;
  this.title = title;
  this.desc = desc;
  this.key = key;
  this.horns = horns;
  this.page = page;
}

const showPhotos = function(data){
  data.forEach(photo => {
    
    //determine page number from url
    let page;
    if (this.url === './data/page-1.json'){
      page = 1;
    } else if (this.url === './data/page-2.json'){
      page = 2;
    }
 
    let photoObject = new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns, page);
    
    let rendered = Mustache.render($template, photoObject);
    $container.append(rendered);
    
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

$page1.click(function () {
  let $photos = $('.photo');
  let $page1 = $('.1');
  console.log($page1);

  $photos.hide();
  $page1.show();  
});


$page2.click(function () {
  let $photos = $('.photo');
  let $page2 = $('.2');
  console.log($page2);

  $photos.hide();
  $page2.show();  
});

$.ajax('./data/page-1.json').then(showPhotos);
$.ajax('./data/page-2.json').then(showPhotos);