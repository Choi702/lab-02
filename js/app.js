'use strict';

let $template = $('#photo-template');
let $container =$('#photo-container');
function Photo(img, title, desc, key, horns) {
  this.img = img;
  this.title = title;
  this.desc = desc;
  this.key = key;
  this.horns = horns;


}

$.ajax('./data/page-1.json').then(data => {
  
  data.forEach(photo => {
    
    let photoObject = new Photo(photo.image_url, photo.title, photo.description, photo.keyword, photo.horns);
    let $newPhoto = $template.clone();
    $newPhoto.find('h2').text(photoObject.title);
    $newPhoto.find('p').text(photoObject.desc);
    $newPhoto.find('img').attr('src', photoObject.img);
    $container.append($newPhoto);
  
    
    
    
    

    
  });

})



