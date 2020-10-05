'use strict';

let $template = $('#photo-template').html();
let $container = $('#photo-container');
let $dropdown = $('#dropdown');
let $dropdown2 = $('#dropdown2');
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

  photoArray.forEach(photo => {
    let rendered = Mustache.render($template, photo);
    $container.append(rendered);
  });
}


// keyword dropdown event handler
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

// pagination button event handlers
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

// sorting dropdown handler
$dropdown2.change(function () {
  let val = $(this).val();
  console.log(val);

  if (val === 'horns'){

    photoArray.sort((a, b) =>
      a.horns > b.horns ? 1 : -1
    );

    $container.empty();

    photoArray.forEach(photo => {
      let rendered = Mustache.render($template, photo);
      $container.append(rendered);
    });  
  } else if (val === 'title'){
    
    photoArray.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );

  $container.empty();

  photoArray.forEach(photo => {
    let rendered = Mustache.render($template, photo);
    $container.append(rendered);
  });   
  }
});

$.ajax('./data/page-1.json').then(showPhotos);


 





// $newPhoto.attr('class', 'photo'); //if we set the class twice, it overrides the first and that was what was happening from line 25 and 26. It was erasing the key class

 