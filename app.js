$(document).ready(function () {
  // searchbar
  $('.search').on('click', function () {
    let keyword = $('.input-search').val();
    // call AJAX
    $.ajax({
      url: 'http://www.omdbapi.com/?apikey=5decf7c5&s=' + keyword,
      success: (results) => {
        const movies = results.Search;
        let data = '';
        movies.forEach((val) => {
          data += `<div class="box">
                <img src="${val.Poster}" class="img" alt="${val.Title}" title="${val.Title}" />
                <div class="text">
                    <h3 class="title">${val.Title.length > 20 ? val.Title.substring(0, 20) + '...' : val.Title} <span class="year">(${val.Year.length > 5 ? val.Year.substring(0, 5) + '...' : val.Year})</span></h3>
                    <button class="movie-detail" data-id="${val.imdbID}">Selengkapnya</button>
                </div>
                </div>`;
        });
        $('.main').html(data);
        // jika tombol detail di klik
        $('.movie-detail').on('click', function () {
          let id = $(this).data('id');
          // ambil kelengkapan data perfilm
          $.ajax({
            url: 'http://www.omdbapi.com/?apikey=5decf7c5&i=' + id,
            success: (val) => {
              let content = `<img class="modal-img" src="${val.Poster}" alt="${val.Title}" />

              <div class="modal-detail">
                
                <ul class="modal-lists">
                  <li><h4>Title : ${val.Title}</h4></li>
                  <li>Year : ${val.Year}</li>
                  <li>Genre : ${val.Genre}</li>
                  <li>Actors : ${val.Actors}</li>
                  <li>Income : ${val.BoxOffice}</li>
                  <li>Writer : ${val.Writer}</li>
                  <li>imdbRating : ${val.imdbRating}</li>
                  <li>Released : ${val.Released}</li>
                  <li>Rated : ${val.Rated}</li>
                  <li>Language : ${val.Language}</li>
                  <li>Country : ${val.Country}</li>
                  <li>Awards : ${val.Awards}</li>
                  <li>Metascore : ${val.Metascore}</li>
                  <li>Director : ${val.Director}</li>
                  <li>Type : ${val.Type}</li>
                </ul>
              </div>`;
              $('.modal').slideDown(100);
              $('.modal-box').html(content);
              $('.modal-m').slideDown(100);
              $('.close').click(function () {
                $('.modal').slideUp(100);
                $('.modal-m').slideUp(100);
              });
            },

            error: (e) => {
              console.log(e.responseText);
            },
          });
          //
        });
      },
      error: (e) => {
        console.log(e(responseText));
      },
    });
    //
  });
});

//
// if (string.length > 25) {
//     string = string.substring(0, 24) + "...";
//   }
//
