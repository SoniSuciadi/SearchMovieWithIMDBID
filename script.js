// $(".search-button").on("click", function () {
//   $.ajax({
//     url: `http://www.omdbapi.com/?apikey=763d0c50&s=` + $(".input-judul").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showmovies(m);
//       });
//       $(".movie-container").html(cards);

//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=763d0c50&i=" +
//             $(this).data("imdbid"),
//           success: (d) => {
//
//             const moviedetail = showdetail(d);
//             $(".modal-body").html(moviedetail);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });
function showdetail(d) {
  return `<div class="row">
                      <div class="col-md-3">
                          <img src="${d.Poster}" class="img-fluid">
                      </div>
                      <div class="col-md">
                          <ul class="list-group">
                              <li class="list-group-item">
                                  <h3>${d.Title}</h3>
                              </li>
                              <li class="list-group-item">,<strong>Director: </strong>${d.Director}</li>
                              <li class="list-group-item"><strong>Actors: </strong>${d.Actors}</li>
                              <li class="list-group-item"><strong>Wirter: </strong>${d.Writer}</li>
                              <li class="list-group-item"><strong>Plot: <br> </strong>${d.Plot}</li>
                          </ul>
                      </div>
                  </div>`;
}
function showmovies(m) {
  return `<div class="col-md-4 my-3">
              <div class="card">
                  <img class=" card-img-top" src="${m.Poster}">
                  <div class=" card-body">
                      <h5 class="card-title">${m.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                      <button type="button" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#detailmovie" data-imdbid="${m.imdbID}">Show Detail</button>
                  </div>
              </div>
          </div>`;
}
// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=763d0c50&s=" + $(".input-judul").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let card = "";
//       movies.forEach((element) => {
//         card += `<div class="col-md-4 my-3">
//                 <div class="card">
//                     <img class=" card-img-top" src="${element.Poster}">
//                     <div class=" card-body">
//                         <h5 class="card-title">${element.Title}</h5>
//                         <h6 class="card-subtitle mb-2 text-muted">${element.Year}</h6>
//                         <button type="button" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#detailmovie" data-imdbid="${element.imdbID}">Show Detail</button>
//                     </div>
//                 </div>
//             </div>`;
//       });
//       $(".movie-container").html(card);
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=763d0c50&i=" +
//             $(this).data("imdbid"),
//           success: (results) => {
//             console.log(results);
//             const modal = `<div class="row">
//                       <div class="col-md-3">
//                           <img src="${results.Poster}" class="img-fluid">
//                       </div>
//                       <div class="col-md">
//                           <ul class="list-group">
//                               <li class="list-group-item">
//                                   <h3>${results.Title}</h3>
//                               </li>
//                               <li class="list-group-item">,<strong>Director: </strong>${results.Director}</li>
//                               <li class="list-group-item"><strong>Actors: </strong>${results.Actors}</li>
//                               <li class="list-group-item"><strong>Wirter: </strong>${results.Writer}</li>
//                               <li class="list-group-item"><strong>Plot: <br> </strong>${results.Plot}</li>
//                           </ul>
//                       </div>
//                   </div>`;
//             $(".modal-body").html(modal);
//           },
//         });
//       });
//     },
//   });
// });

// // fetch
// const btnSearch = document.querySelector(".search-button");
// btnSearch.addEventListener("click", function () {
//   const inputJudul = document.querySelector(".input-judul");
//   fetch("http://www.omdbapi.com/?apikey=763d0c50&s=" + inputJudul.value)
//     .then((respon) => respon.json())
//     .then((respon) => {
//       let movie = respon.Search;
//       let cards = "";
//       movie.forEach((element) => {
//         cards += showmovies(element);
//       });
//       const movieCard = document.querySelector(".movie-container");
//       movieCard.innerHTML = cards;
//       const btndetail = document.querySelectorAll(".modal-detail-button");
//       btndetail.forEach((modal) => {
//         modal.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           console.log(imdbid);
//           fetch("http://www.omdbapi.com/?apikey=763d0c50&i=" + imdbid)
//             .then((respon) => respon.json())
//             .then((respon) => {
//               const modalbody = showdetail(respon);
//               const tmodalbody = document.querySelector(".modal-body");
//               tmodalbody.innerHTML = modalbody;
//             });
//         });
//       });
//     });
// });

// fetcha sync
const btnSearch = document.querySelector(".search-button");
btnSearch.addEventListener("click", async function () {
  const inputJudul = document.querySelector(".input-judul");
  const movies = await getmovie(inputJudul.value);
  // console.log(movies);
  updateUI(movies);
});
function getmovie(judul) {
  return fetch("http://www.omdbapi.com/?apikey=763d0c50&s=" + judul)
    .then((respon) => respon.json())
    .then((respon) => respon.Search);
}
function updateUI(movie) {
  let cards = "";
  movie.forEach((element) => {
    cards += showmovies(element);
  });
  const movieCard = document.querySelector(".movie-container");
  movieCard.innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const getmodalBody = await modalBody(imdbid);
    const tmodalbody = document.querySelector(".modal-body");
    tmodalbody.innerHTML = showdetail(getmodalBody);
    // console.log(getmodalBody);
  }
});

function modalBody(imdbid) {
  return fetch(
    "http://www.omdbapi.com/?apikey=763d0c50&i=" + imdbid
  ).then((respon) => respon.json());
}
