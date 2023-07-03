        let container1 = document.getElementById('moviesList')
        let searchbtn = document.getElementById('searchbtn')
        window.addEventListener("DOMContentLoaded", getTrendingmovies)
        let trademark=document.createElement('p')
        trademark.style="text-align: center;color:black;font-size:20px;margin:2rem;font-weight:600;"
        trademark.innerHTML=`Made by <i class="fa fa-copyright" aria-hidden="true"></i>SB122129`
        
        function getHighestGrossing() {
            container1.innerHTML = ``
            let header=document.createElement('h4')
                header.className="header"
                header.innerHTML=`<i class="bi bi-cash"></i> Highest Grossing 2023`
                header.style=`color:yellow;margin-bottom:2rem;`
                container1.appendChild(header)

            fetch('https://api.themoviedb.org/3/discover/movie?api_key=5f113895e79024963435d4b2ff3eb28e&primary_release_year=2023&sort_by=revenue.desc')
            .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < 1000; i++) {

                
let card = document.createElement('div')

card.style = 'style="width: 16rem;opacity:70%';

card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2   card bg-dark text-light')

let img = document.createElement('img')

img.classList.add('card-img-top')

let title = document.createElement('h5')

title.setAttribute('class', 'card-title')
title.classList.add('text-center')

title.textContent = arr.results[i].title

img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`
img.style='height:12rem;'



let description = document.createElement('h6')
    description.setAttribute('class', 'card-text text-light')
    description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`
    description.style="font-size:13px;text-align:center;"

    let cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

    
    card.appendChild(img)
card.appendChild(title)
card.appendChild(cardbody)
cardbody.appendChild(description)
container1.append(card)

}
            }).catch((error) => {
                    console.log('Error:', error);
                });   
        }

        
        
        
        
        function getTrendingmovies() {
            container1.innerHTML = ``
            let header=document.createElement('h4')
                header.className="header"
                header.innerHTML=`<i class="fa fa-line-chart" aria-hidden="true"></i> Trending today`
                header.style=`color:yellow;margin-bottom:2rem;`
                container1.appendChild(header)

            fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=5f113895e79024963435d4b2ff3eb28e')
            .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < 1000; i++) {
                
let card = document.createElement('div')

card.style = 'style="width: 16rem;opacity:70%';

card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2   card bg-dark text-light')

let img = document.createElement('img')

img.classList.add('card-img-top')

let title = document.createElement('h5')

title.setAttribute('class', 'card-title')
title.classList.add('text-center')

title.textContent = arr.results[i].title

img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`
img.style='height:12rem;'



let description = document.createElement('h6')
    description.setAttribute('class', 'card-text text-light')
    description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`
    description.style="font-size:13px;text-align:center;"

    let cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

    
    card.appendChild(img)
card.appendChild(title)
card.appendChild(cardbody)
cardbody.appendChild(description)
container1.append(card)

}
            }).catch((error) => {
                    console.log('Error:', error);
                });   
              
    document.body.appendChild(trademark);

        }

        function getMovies() {
            container1.innerHTML = ``
            let header=document.createElement('h4')
                header.className="header"
                header.innerHTML=`<i class="fa fa-binoculars" aria-hidden="true"></i> Discover`
                header.style=`color:yellow;margin-bottom:2rem;`
                container1.appendChild(header)

            fetch('https://api.themoviedb.org/3/movie/popular?api_key=9fdcf0d6054b3c7f558938544704c042')
            
            .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < 1000; i++) {

let card = document.createElement('div')

card.style = 'style="width: 16rem;opacity:70%';

card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light')

let img = document.createElement('img')

img.classList.add('card-img-top')

let title = document.createElement('h5')

title.setAttribute('class', 'card-title')
title.classList.add('text-center')

title.textContent = arr.results[i].title

img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`
img.style='height:11rem;'



let description = document.createElement('h6')
    description.setAttribute('class', 'card-text text-light')
    description.style="font-size:13px;text-align:center;"
    description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average}&ensp;  <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`


    let cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

    
    card.appendChild(img)
card.appendChild(title)
card.appendChild(cardbody)
cardbody.appendChild(description)
container1.append(card)

}
            }).catch((error) => {
                    console.log('Error:', error);
                }); 

        }
        

        function getTopRated() {
            container1.innerHTML = ``
            let header=document.createElement('h4')
                header.className="header"
                header.innerHTML=`<i class="fa fa-star" aria-hidden="true"></i> Top Rated Tv Shows`
                header.style=`color:yellow;margin-bottom:2rem;`
                container1.appendChild(header)
            fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=5f113895e79024963435d4b2ff3eb28e')
            .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < 1000; i++) {

let card = document.createElement('div')

card.style = 'style="width: 16rem;opacity:70%';

card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light')

let img = document.createElement('img')

img.classList.add('card-img-top')

let title = document.createElement('h5')

title.setAttribute('class', 'card-title')
title.classList.add('text-center')

title.textContent = arr.results[i].title

img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`
img.style='height:12rem;'



let description = document.createElement('h6')
    description.setAttribute('class', 'card-text text-light')
    description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`
    description.style="font-size:13px;text-align:center;"

    let cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

    
    card.appendChild(img)
card.appendChild(title)
card.appendChild(cardbody)
cardbody.appendChild(description)
container1.append(card)

}
            }).catch((error) => {
                    console.log('Error:', error);
                }); 

        }
        function getTopRatedM () {
            container1.innerHTML = ``
            let header=document.createElement('h4')
                header.className="header"
                header.innerHTML=`<i class="fa fa-star" aria-hidden="true"></i> Top Rated Movies`
                header.style=`color:yellow;margin-bottom:2rem;`
                container1.appendChild(header)
            fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=5f113895e79024963435d4b2ff3eb28e')
            .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < 1000; i++) {

let card = document.createElement('div')

card.style = 'style="width: 16rem;opacity:70%';

card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light')

let img = document.createElement('img')

img.classList.add('card-img-top')

let title = document.createElement('h5')

title.setAttribute('class', 'card-title')
title.classList.add('text-center')

title.textContent = arr.results[i].title

img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`
img.style='height:12rem;'



let description = document.createElement('h6')
    description.setAttribute('class', 'card-text text-light')
    description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`
    description.style="font-size:13px;text-align:center;"

    let cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

    
    card.appendChild(img)
card.appendChild(title)
card.appendChild(cardbody)
cardbody.appendChild(description)
container1.append(card)

}
            }).catch((error) => {
                    console.log('Error:', error);
                }); 

        }
  
        
        
        
        function getShows() {
            container1.innerHTML = ``
            let header=document.createElement('h4')
            header.className="header"
            header.innerHTML=`<i class="bi bi-tv"></i> Popular Tv Shows`
            header.style=`color:yellow;margin-bottom:2rem;`
            container1.appendChild(header)

            fetch('https://api.tvmaze.com/shows?page=1')
            .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < arr.length; i++) {

let card = document.createElement('div')

card.style = 'style="width: 16rem;opacity:70%';

card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light')

let img = document.createElement('img')

img.classList.add('card-img-top')

let title = document.createElement('h5')

title.setAttribute('class', 'card-text')

title.textContent = arr[i].name

img.src = arr[i].image.medium
img.style='height:12rem;'


let description = document.createElement('p')
    description.setAttribute('class', 'card-text text-light')
    description.innerHTML=`<i class="bi bi-star"></i> ${arr[i].rating.average} &ensp;<i class="fa fa-globe" aria-hidden="true"></i> ${arr[i].language }`
    description.style="font-size:13px;text-align:center;"
    let cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

    
    card.appendChild(img)
card.appendChild(title)
card.appendChild(cardbody)
cardbody.appendChild(description)
container1.append(card)

}
            }).catch((error) => {
                    console.log('Error:', error);
                });       

        }
        

        searchbtn.onclick = async () => {
            container1.innerHTML = ``
            let header=document.createElement('h5')
                header.className="header"
                
                header.style=`color:white;margin-bottom:2rem;`
                container1.appendChild(header)
            
    const searchTerm = document.querySelector('#search').value;
    header.innerHTML=`Search results for '${searchTerm}' `
    console.log(searchTerm)
    const response = await fetch(`https://www.omdbapi.com/?s='${searchTerm}'&apikey=e3d90614&page=1`);
    
    
    if(!response.ok) {
        console.log('error')
    }
    
    const json = await response.json();

    const searchList = json.results;
    console.log(json)

   for (let i = 0; i < json.Search.length; i++) {
        const movie = json.Search[i];
        container1.innerHTML += `
            <div class="col-3 card m-2 bg-dark" style="height=10rem;width:16rem;">
                <div class="card-header">
                    <img src="${movie.Poster}" alt="${movie.Title}" width="200" height="300">
                    <h5 class="mt=3 text-light">${movie.Title}</h5>
                    <p class="mt=3 text-warning"><i class="bi bi-file"></i> ${movie.Type} &ensp; <i class="bi bi-clock"></i> ${movie.Year}</p>

                </div>
                <div class="card-body">
                </div>
            </div>
        `;

    }

  }
   
  

