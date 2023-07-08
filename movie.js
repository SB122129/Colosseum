    let container1 = document.getElementById('moviesList');//an object to get the row I'm going to append contents about movie
    let searchbtn = document.getElementById('searchbtn');//an object to get the search button
    window.addEventListener("DOMContentLoaded", getTrendingmovies);//event listener that executes the function that fetches trending movies automatically when the page is loaded
    let trademark=document.createElement('p');
    trademark.style="text-align: center;color:black;font-size:20px;margin:2rem;font-weight:600;";
    trademark.innerHTML=`Made by <i class="fa fa-copyright" aria-hidden="true"></i>SB122129`;//trademark footnote
        
    function getHighestGrossing() {
        container1.innerHTML = ``;//to clear the contents of the row that holds movie content, I've done this at the beginning of every function below
        
        let header=document.createElement('h4');
            header.className="header";
            header.innerHTML=`<i class="bi bi-cash"></i> Highest Grossing 2023`;
            header.style=`color:yellow;margin-bottom:2rem;`;
            container1.appendChild(header);
        //this header is for showing the category of the movie content being displayed, I've also done in every function below

        fetch('https://api.themoviedb.org/3/discover/movie?api_key=5f113895e79024963435d4b2ff3eb28e&primary_release_year=2023&sort_by=revenue.desc')
        .then((response) => response.json()).then((response) =>{
        arr = response;
        console.log(arr);
        //fetch method gets info about movies from tmdb sorted by descending order of revenue and using '.then' if the fetch is successful, it is stored in response, I then assigned the response to an array called arr
        
        //this for loop iterates and creates the HTML elements that are going to hold the movies contents fetched from TMDB, I've also repeated this process for other the functions below 
        for (let i = 0; i < 1000; i++) {                
            let card = document.createElement('div');
            card.style = 'style="width: 16rem;opacity:70%';
            card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2   card bg-dark text-light');
            //creates and styles a div element with bootstrap  card class that holds the movie poster, movie title, and a details button

            let img = document.createElement('img');
            img.classList.add('card-img-top');
            img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
            img.style='height:12rem;';
            //creates and styles an image element that holds the movie poster
                
            let title = document.createElement('h5');
            title.setAttribute('class', 'card-title');
            title.classList.add('text-center');
            title.textContent = arr.results[i].title;
             // creates and styles a h5 element that holds the movie title
            
            let description = document.createElement('h6');
            description.setAttribute('class', 'card-text text-light');
            description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
            description.style="font-size:13px;text-align:center;";
            // creates and styles a h6 element that holds the movie description  
            
            let detail = document.createElement('input');
            detail.classList.add('btn');
            detail.type='button';
            detail.value='More';
            detail.style='width:5rem;background:#FFC107;margin: 0 auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;margin-top:0.5em;';
            detail.setAttribute('data-bs-title','Overview'); 
            detail.setAttribute('data-bs-custom-class','custom-popover')
            detail.setAttribute('data-bs-trigger','focus');//after it is opened, this attribute makes the popover dismissable by clicking on anywhere on the screen except the button and the popover itself  
            detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);//fetches inserts the movie's overview into the popover 
            detail.setAttribute('data-bs-toggle','popover');//makes the button when clicked open the popover
            // creates and styles a button element that opens a bootstrap popover which contains the movie's overview    
            
            let cardbody=document.createElement('div');
            cardbody.classList.add('card-body');
              // creates a div element that has card-body bootstrap class   
            
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(cardbody);
            cardbody.appendChild(description);
            cardbody.appendChild(detail);
            //code above appends each element to where it logically belongs
                
            const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
            const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
               /* This code above initializes all the popovers contained inside the HTML page
                I placed it here  on purpose, for it to initialize the popovers they must be already inside the HTML
                in this code the popover gets inserted in the HTML when the details button is appended to the card body
                so the initialization must be after this point, it's simple but it really took me a while to figure it out*/
            
            container1.append(card);
        }
    }).catch((error) => {
        console.log('Error:', error);
    });//this catches an error if there is a problem fetching the data from the API
}
//Note from this point on all functions except the last one are the same, so refer the comments above 
    function getTrendingmovies() {
        container1.innerHTML = ``;
        
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-line-chart" aria-hidden="true"></i> Trending today`;
        header.style=`color:yellow;margin-bottom:2rem;`
        container1.appendChild(header);
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=5f113895e79024963435d4b2ff3eb28e')
        .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                
                let card = document.createElement('div');
                card.style = 'style="width: 16rem;opacity:70%';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2   card bg-dark text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                //only the file name of the movie poster was inside the response so  I added the link to the file name, for more do to tmdb docs >> images
                img.style='height:12rem;';
                
                let title = document.createElement('h5');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-center');
                title.textContent = arr.results[i].title;
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                description.style="font-size:13px;text-align:center;"
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: 0 auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;margin-top:0.5em;';
                detail.setAttribute('data-bs-title','Overview') ;
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover')
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);cardbody.appendChild(description);
                cardbody.appendChild(detail);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
                
                container1.append(card);
            }
        }).catch((error) => {
            console.log('Error:', error);
        });
        document.body.appendChild(trademark);
    }
    function getMovies() {
        container1.innerHTML = ``;
        
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-binoculars" aria-hidden="true"></i> Discover`;
        header.style=`color:yellow;margin-bottom:2rem;`;
        container1.appendChild(header)
        
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=9fdcf0d6054b3c7f558938544704c042')
        .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                let card = document.createElement('div');
                card.style = 'style="width: 16rem;opacity:70%';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:11rem;';

                
                let title = document.createElement('h5');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-center');
                title.textContent = arr.results[i].title;
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.style="font-size:13px;text-align:center;";
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average}&ensp;  <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: 0 auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:10px;margin-top:0.5em;';
                detail.setAttribute('data-bs-title','Overview');
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                cardbody.appendChild(description);
                cardbody.appendChild(detail);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
                container1.append(card);
            }
        }).catch((error) => {
            console.log('Error:', error);
        }); 
    }
    
    function getTopRated() {
        container1.innerHTML = ``;
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-star" aria-hidden="true"></i> Top Rated Tv Shows`;
        header.style=`color:yellow;margin-bottom:2rem;`;
        container1.appendChild(header)
        
        fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=5f113895e79024963435d4b2ff3eb28e')
        .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                let card = document.createElement('div');
                card.style = 'style="width: 16rem;opacity:70%';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:12rem;';

                
                let title = document.createElement('h5');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-center');
                title.textContent = arr.results[i].title;
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                description.style="font-size:13px;text-align:center;";
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: 0 auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;margin-top:0.5em;';
                detail.setAttribute('data-bs-title','Overview');
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover');
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                cardbody.appendChild(description);cardbody.appendChild(detail);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
                container1.append(card);
            }
        }).catch((error) => {
            console.log('Error:', error);
        }); 
    }
    
    function getTopRatedM () {
        container1.innerHTML = ``;
        
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-star" aria-hidden="true"></i> Top Rated Movies`;
        header.style=`color:yellow;margin-bottom:2rem;`;
        container1.appendChild(header);
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=5f113895e79024963435d4b2ff3eb28e')
        .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                let card = document.createElement('div');
                card.style = 'style="width: 16rem;opacity:70%';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light');
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:12rem;';

                
                let title = document.createElement('h5');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-center');
                title.textContent = arr.results[i].title;
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                description.style="font-size:13px;text-align:center;";
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: 0 auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;margin-top:0.5em;';
                detail.setAttribute('data-bs-title','Overview') ;
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover');
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                cardbody.appendChild(description);
                cardbody.appendChild(detail);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
                
                container1.append(card)
            }
        }).catch((error) => {
            console.log('Error:', error);
        });
    }
    function getShows() {//only difference in this function is it uses TV-Maze API 
        container1.innerHTML = ``;
        
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="bi bi-tv"></i> Popular Tv Shows`;
        header.style=`color:yellow;margin-bottom:2rem;`;
        container1.appendChild(header);
        
        fetch('https://api.tvmaze.com/shows?page=1')
        .then((response) => response.json()).then((response) =>{
            arr = response;
            console.log(arr)
            
            for (let i = 0; i < arr.length; i++) {
                let card = document.createElement('div');
                card.style = 'style="width: 16rem;opacity:70%';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card bg-dark text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = arr[i].image.medium;
                img.style='height:12rem;'

                let title = document.createElement('h5');
                title.setAttribute('class', 'card-text');
                title.textContent = arr[i].name;
                
                let description = document.createElement('p');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr[i].rating.average} &ensp;<i class="fa fa-globe" aria-hidden="true"></i> ${arr[i].language }`;
                description.style="font-size:13px;text-align:center;";
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: 0 auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;margin-top:0.5em;';
                detail.setAttribute('data-bs-title','Details') ;
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`Premiered: ${arr[i].premiered} Genre: ${arr[i].genres}`);
                detail.setAttribute('data-bs-toggle','popover')
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                cardbody.appendChild(description);
                cardbody.appendChild(detail);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
                
                container1.append(card);
            }
        }).catch((error) => {
            console.log('Error:', error);
        });       
    }
//this is the function that is a bit different from the functions above and it creates a search feature
    searchbtn.onclick = async () => {//this an async arrow function that executes when the search button is clicked 
        container1.innerHTML = ``;
        
        let header=document.createElement('h5');
        header.className="header";
        header.style=`color:white;margin-bottom:2rem;`;
        container1.appendChild(header);
        
        const searchTerm = document.querySelector('#search').value;//an object that holds the value of the text  in the search input box
        header.innerHTML=`Search results for '${searchTerm}' `;
        console.log(searchTerm);
        const response = await fetch(`https://www.omdbapi.com/?s='${searchTerm}'&apikey=e3d90614&page=1`);
        //this function  being an async function allows the use of await with the fetch method   
        if(!response.ok) {
            console.log('error')
        }
        //this code console if there is a problem fetching the data 
        const json = await response.json();//stores the response from the API and converts it to JSON format
        console.log(json);
        if(json.Error=="Movie not found!"){
            container1.innerHTML=`
            <p style='color:red;font-size:30px;text-align:center;'><i class="bi bi-emoji-frown"></i> Sorry Movie not found!</p>
            <p style='color:red;font-size:18px;text-align:center;'><i class="bi bi-dot"></i>Try making sure there is no whitespace at the end of your query</p>
            <p style='color:red;font-size:18px;text-align:center;'><i class="bi bi-dot"></i>Check the spelling of your query</p>`;
            return;
        }//displays an error method if the search term cannot be found inside the data of the API
        
        for (let i = 0; i < json.Search.length; i++) {//for loop that iterates through the length of the response
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
                </div>`;
            }//creates a bootstrap card with all its corresponding logical contents for each loop iteration 
        }
   
  

