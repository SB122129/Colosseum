    let container1 = document.getElementById('moviesList');//an object to get the row I'm going to append contents about movie
    let searchbtn = document.getElementById('searchbtn');//an object to get the search button
    let loading = document.getElementById('loading');//an object to hold the bootstrap spinner that is going t be active while data is being fetched 
    let section = document.getElementById('section');//this is the section where i append the pagination
    let pagination = document.createElement('div');//a div element that holds the pagination used for changing pages
    pagination.innerHTML=`
        <nav aria-label="Page">
            <ul class="pagination pagination-md justify-content-center">
                <li class="page-item" id='pagePre'><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePagePrev()">Previous</a></li>    
                <li class="page-item disabled" ><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePage1()">1</a></li>
                <li class="page-item"><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePage2()">2</a></li>
                <li class="page-item"><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePage3()">3</a></li>
                <li class="page-item"><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePage4()">4</a></li>
                <li class="page-item"><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePage5()">5</a></li>
                <li class="page-item" id='pagNext'><a class="page-link text-warning" style="background:black;border-color:#FFC107;" href="javascript:changePageNext()">Next</a></li>        
            </ul>
        </nav>
        <br><br>`
        //code a above is for creating a bootstrap pagination, it can be found on their website.
  
    let page=1;//i'm going to use this value to change page number of the data fetched
    let functionId=1;//used to differentiate each function so when a page is changed, it makes sure the page change is the right one for that function
    
    window.addEventListener("DOMContentLoaded", getTrendingmovies);//event listener that executes the function that fetches trending movies automatically when the page is loaded
    
    let trademark=document.createElement('p');
    trademark.style="text-align: center;color:black;font-size:15px;margin:1rem;font-weight:600;";
    trademark.innerHTML=`Made by <i class="fa fa-copyright" aria-hidden="true"></i>SB122129`;//trademark footnote
        
    function getHighestGrossing() {
        container1.innerHTML = ``;//to clear the contents of the row that holds movie content, I've done this at the beginning of every function below
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
                            //inserts the bootstrap spinner
        functionId=2;
        
    
        let header=document.createElement('h4');
            header.className="header";
            header.innerHTML=`<i class="bi bi-cash"></i> Highest Grossing 2023`;
            header.style=`color:yellow;margin:2rem 0;`;
            container1.appendChild(header);
            //this header is for showing the category of the movie content being displayed, I've also done in every function below


        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5f113895e79024963435d4b2ff3eb28e&primary_release_year=2023&sort_by=revenue.desc&page=${page}`)
        .then((response) => response.json()).then((response) =>{
        arr = response;
        loading.innerHTML=``;//clears the the bootstrap spinner once the data has been fetched successfully
        console.log(arr);
         //fetch method gets info about movies from tmdb sorted by descending order of revenue and using '.then' if the fetch is successful, it is stored in response, I then assigned the response to an array called arr
        
        for (let i = 0; i < 1000; i++) {                
            let card = document.createElement('div');
            card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-12 m-2 card');
            card.style = 'width:16rem;background:black;';
            //creates and styles a div element with bootstrap  card class that holds the movie poster, movie title, and a details button
                
            let img = document.createElement('img');
            img.classList.add('card-img-top','img-fluid');
            img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
            img.style='height:16rem;';
             //creates and styles an image element that holds the movie poster
                
            let title = document.createElement('div');
            title.setAttribute('class', 'card-title');
            title.classList.add('text-light');
            title.style='font-size:23px'
            title.textContent = arr.results[i].title;
            //creates and styles a div element that holds the movie title

            
                
            let description = document.createElement('h6');
            description.setAttribute('class', 'card-text text-light');
            description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
            description.style="font-size:13px;margin-top:.5em";
            // creates and styles a h6 element that holds the movie description  

             // code below creates and styles a button element that opens a bootstrap popover which contains the movie's overview    
            let detail = document.createElement('input');
            detail.classList.add('btn');
            detail.type='button';
            detail.value='More';
            detail.style='width:5rem;background:#FFC107;padding: 0 1rem;margin:auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; text-align: center;color:black;border-radius:7px;';
            detail.setAttribute('data-bs-title','Overview'); 
            detail.setAttribute('data-bs-custom-class','custom-popover')//assigns custom class for styling the popover with CSS
            detail.setAttribute('data-bs-trigger','focus');//after it is opened, this attribute makes the popover dismissable by clicking on anywhere on the screen except the button and the popover itself 
            detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);//fetches and inserts the movie's overview into the popover 
            detail.setAttribute('data-bs-toggle','popover');//makes the button open the popover

                
            let cardbody=document.createElement('div');
            cardbody.classList.add('card-body');
            cardbody.style="background:black;"
             // creates and styles a div element that has card-body bootstrap class  

             let footer=document.createElement('div');
             cardbody.classList.add('card-footer');
             cardbody.style="background:black;"
             // creates and styles a div element that has card-footer bootstrap class  
                
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(cardbody);
            card.appendChild(footer);
            title.appendChild(description);
            footer.appendChild(detail);
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
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
    functionId=1;
        
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-line-chart" aria-hidden="true"></i> Trending today`;
        header.style=`color:yellow;margin:2rem 0;`
        container1.appendChild(header);
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=5f113895e79024963435d4b2ff3eb28e&page=${page}`)
        .then((response) => response.json()).then((response) =>{
            arr = response;
            loading.innerHTML=``;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                
                let card = document.createElement('div');
                card.style = 'width: 16rem;background:black;'
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:16rem;';
                
                let title = document.createElement('div');
                title.setAttribute('class', 'card-title');
                title.style='font-size:23px';
                title.textContent = arr.results[i].title;
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                description.style="font-size:13px;margin-top:.5em;"

                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin:auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;';
                detail.setAttribute('data-bs-title','Overview') ;
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover')
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');

                let cardfooter=document.createElement('div');
                cardbody.classList.add('card-footer');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                title.appendChild(description);
                cardfooter.appendChild(detail);
                card.appendChild(cardfooter);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
                
                container1.append(card);
            }
        }).catch((error) => {
            console.log('Error:', error);
        });
        document.body.appendChild(trademark);
        section.appendChild(pagination);
    }
    function getMovies() {
        container1.innerHTML = ``;
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
    
        functionId=3;

        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-binoculars" aria-hidden="true"></i> Discover`;
        header.style=`color:yellow;margin:2rem 0;`;
        container1.appendChild(header)
        
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9fdcf0d6054b3c7f558938544704c042&page=${page}`)
        .then((response) => response.json()).then((response) =>{
            arr = response;
            loading.innerHTML=``;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                let card = document.createElement('div');
                card.style = 'width: 16rem;background:black';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2 card text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:16rem;';

                
                let title = document.createElement('div');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-light');
                title.style="font-size:23px;"
                title.textContent = arr.results[i].title;
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.style="font-size:13px;margin-top:.5em";
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average}&ensp;  <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                let footer=document.createElement('div');
                footer.classList.add('card-footer');
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;';
                detail.setAttribute('data-bs-title','Overview');
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                title.appendChild(description);
                footer.appendChild(detail);
                card.appendChild(footer);
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
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
                            
        functionId=4;
    
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-star" aria-hidden="true"></i> Top Rated Tv Shows`;
        header.style=`color:yellow;margin:2rem 0;`;
        container1.appendChild(header)
        
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=5f113895e79024963435d4b2ff3eb28e&page=${page}`)
        .then((response) => response.json()).then((response) =>{
            arr = response;
            loading.innerHTML=``;
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                let card = document.createElement('div');
                card.style = 'width: 16rem;background:black';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card text-light');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:16rem;';

                
                let title = document.createElement('h5');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-light');
                title.style='font-size:23px;'
                title.textContent = arr.results[i].name;
                console.log(arr.results[i].name)
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                description.style="font-size:13px;margin-top:.5em;";
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin:auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;';
                detail.setAttribute('data-bs-title','Overview');
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover');
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');

                let footer=document.createElement('div');
                footer.classList.add('card-footer');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                title.appendChild(description);
                footer.appendChild(detail);
                card.appendChild(footer);
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
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
        functionId=5;
    
        
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="fa fa-star" aria-hidden="true"></i> Top Rated Movies`;
        header.style=`color:yellow;margin:2rem 0;`;
        container1.appendChild(header);
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=5f113895e79024963435d4b2ff3eb28e&page=${page}`)
        .then((response) => response.json()).then((response) =>{
            arr = response;
            loading.innerHTML=``;   
            console.log(arr);
            
            for (let i = 0; i < 1000; i++) {
                let card = document.createElement('div');
                card.style = 'width: 16rem;background:black';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card  text-light');
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://image.tmdb.org/t/p/w500/${arr.results[i].poster_path}`;
                img.style='height:16rem;';

                
                let title = document.createElement('div');
                title.setAttribute('class', 'card-title');
                title.classList.add('text-light');
                title.style='font-size:23px;'
                title.textContent = arr.results[i].title;
                
                let description = document.createElement('h6');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr.results[i].vote_average} &ensp; <i class="fa fa-globe" aria-hidden="true"></i>  ${arr.results[i].original_language }`;
                description.style="font-size:13px;.5em;";
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;';
                detail.setAttribute('data-bs-title','Overview') ;
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`${arr.results[i].overview}`);
                detail.setAttribute('data-bs-toggle','popover');
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');

                let footer=document.createElement('div');
                footer.classList.add('card-footer');
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                cardbody.appendChild(description);
                footer.appendChild(detail);
                card.appendChild(footer);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
                
                container1.append(card)
            }
        }).catch((error) => {
            console.log('Error:', error);
        });
    }
    function getShows() {//only difference in this function is it uses TV-Maze API and object names used to access the contents of it's response vary accordingly
        container1.innerHTML = ``;
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
        functionId=6;
    
        let header=document.createElement('h4');
        header.className="header";
        header.innerHTML=`<i class="bi bi-tv"></i> Popular Tv Shows`;
        header.style=`color:yellow;margin:2rem 0;`;
        container1.appendChild(header);
        
        fetch(`https://api.tvmaze.com/shows?page=${page}`)
        .then((response) => response.json()).then((response) =>{
            arr = response;
            loading.innerHTML=``;
            console.log(arr);
            
            for (let i = 0; i < arr.length; i++) {
                let card = document.createElement('div');
                card.style = 'width: 16rem;background:black;';
                card.setAttribute('class', 'col-lg-2 col-md-2 col-sm-2 m-2  card  text-light ');
                
                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = arr[i].image.medium;
                img.style='height:16rem;'
                img.style="width:200; height:300;"

                let title = document.createElement('div');
                title.setAttribute('class', 'card-text');
                title.style="font-size: 23px;";
                title.textContent = arr[i].name;
                
                let description = document.createElement('p');
                description.setAttribute('class', 'card-text text-light');
                description.innerHTML=`<i class="bi bi-star"></i> ${arr[i].rating.average} &ensp;<i class="fa fa-globe" aria-hidden="true"></i> ${arr[i].language }`;
                description.style="font-size:13px;margin-top: .5em";
                
                let cardbody=document.createElement('div');
                cardbody.classList.add('card-body');
                
                let footer=document.createElement('div');
                footer.classList.add('card-footer');
                
                let detail = document.createElement('input');
                detail.classList.add('btn');
                detail.type='button';
                detail.value='More';
                detail.style='width:5rem;background:#FFC107;margin: auto; border: 0; font-size: 11px; font-weight: 600; line-height: 2.5;  outline: transparent; padding: 0 1rem; text-align: center;color:black;border-radius:7px;';
                detail.setAttribute('data-bs-title','Details') ;
                detail.setAttribute('data-bs-custom-class','custom-popover');
                detail.setAttribute('data-bs-trigger','focus');
                detail.setAttribute('data-bs-content',`Premiered: ${arr[i].premiered} Genre: ${arr[i].genres}`);
                detail.setAttribute('data-bs-toggle','popover')
                
                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(cardbody);
                title.appendChild(description);
                footer.appendChild(detail);
                card.appendChild(footer);
                const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
                const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
                
                container1.append(card);
                
            }
        }).catch((error) => {
            console.log('Error:', error);
        });     
    }
    //this is the function that is a bit different from the functions above and it creates a search feature
    async function search(){//this an async function that executes when the search button is clicked
        container1.innerHTML = ``;
        loading.innerHTML = `<div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>`;
    
        functionId=7;
        let header=document.createElement('h5');
        header.className="header";
        header.style=`color:yellow;margin:2rem 0;`;
        container1.appendChild(header);
        
        const searchTerm = document.querySelector('#search').value;//an object that holds the value of the text  in the search input 
        header.innerHTML=`Search results for '${searchTerm}' `;
        console.log(searchTerm);
        const response = await fetch(`https://www.omdbapi.com/?s='${searchTerm}'&apikey=e3d90614&page=${page}`);//this function  being an async function allows the use of await with the fetch method 
        
        if(!response.ok) {
            console.log('error')
        };//this code console logs error if there is a problem fetching the data 
        
        const json = await response.json();//stores the response from the API and converts it to JSON format
        loading.innerHTML=``
        
        
        console.log(json);
        if(json.Error=="Movie not found!"){
            container1.innerHTML=`
            <p style='color:red;font-size:30px;text-align:center;'><i class="bi bi-emoji-frown"></i> Sorry Movie not found!</p>
            <p style='color:red;font-size:18px;text-align:center;'><i class="bi bi-dot"></i>Try making sure there is no whitespace at the end of your query</p>
            <p style='color:red;font-size:18px;text-align:center;'><i class="bi bi-dot"></i>Check the spelling of your query</p>`;
            return;
        };//displays an error message if the search term cannot be found inside the data of the API
        
        for (let i = 0; i < json.Search.length; i++) {//for loop that iterates through the length of the response
            const movie = json.Search[i];
            container1.innerHTML += `
                <div class="col-3 card m-2" style=";width:16rem;background:black;">
                    <div class="card-header">
                        <img src="${movie.Poster}" alt="${movie.Title}" style="height:16rem">
                        <h5 class="mt=3 text-light">${movie.Title}</h5>
                        <p class="mt=2" style="color:yellow;font-size:13px"><i class="bi bi-file"></i> ${movie.Type} &ensp; <i class="bi bi-clock"></i> ${movie.Year}</p>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`;
            }//creates a bootstrap card with all its corresponding logical contents with each loop iteration 
            
        }
       searchbtn.onclick = search;
   
  
    function changePagePrev(){
            if(page>1){
                --page;
            if(functionId==1){
                getTrendingmovies();
            }
            else if(functionId==2){
                getHighestGrossing();
            }
            else if(functionId==3){
                getMovies();
            }
            else if(functionId==4){
                getTopRated();
            }
            else if(functionId==5){
                getTopRatedM();
            }
            else if(functionId==6){
                getShows();
            }
            else if(functionId==7){
                search();
            }
        };
    };
    function changePageNext(){
            if(page<5 && page>0){
                ++page;
                if(functionId==1){
                getTrendingmovies();
                }
                else if(functionId==2){
                getHighestGrossing();
                }
                else if(functionId==3){
                    getMovies();
                }
                else if(functionId==4){
                    getTopRated();
                }
                else if(functionId==5){
                    getTopRatedM();
                }
                else if(functionId==6){
                    getShows();
                }
                else if(functionId==7){
                    search();
                }
            };
    };


    function changePage1(){
        page=1
        if(functionId==1){
            getTrendingmovies();
        }
        else if(functionId==2){
            getHighestGrossing();
        }
        else if(functionId==3){
            getMovies();
        }
        else if(functionId==4){
            getTopRated();
        }
        else if(functionId==5){
            getTopRatedM();
        }
        else if(functionId==6){
            getShows();
        }
        else if(functionId==7){
            search();
        };
    };
    function changePage2(){
        page=2
        if(functionId==1){
            getTrendingmovies();
        }
        else if(functionId==2){
            getHighestGrossing();
        }
        else if(functionId==3){
            getMovies();
        }
        else if(functionId==4){
            getTopRated();
        }
        else if(functionId==5){
            getTopRatedM();
        }
        else if(functionId==6){
            getShows();
        }
        else if(functionId==7){
            search();
        };
    };
    function changePage3(){
        page=3
        if(functionId==1){
            getTrendingmovies();
        }
        else if(functionId==2){
            getHighestGrossing();
        }
        else if(functionId==3){
            getMovies();
        }
        else if(functionId==4){
            getTopRated();
        }
        else if(functionId==5){
            getTopRatedM();
        }
        else if(functionId==6){
            getShows();
        }
        else if(functionId==7){
            search();
        };
    };
    function changePage4(){
        page=4
        if(functionId==1){
            getTrendingmovies();
        }
        else if(functionId==2){
            getHighestGrossing();
        }
        else if(functionId==3){
            getMovies();
        }
        else if(functionId==4){
            getTopRated();
        }
        else if(functionId==5){
            getTopRatedM();
        }
        else if(functionId==6){
            getShows();
        }
        else if(functionId==7){
            search();
        };
    };
    
    function changePage5(){
        page=5
        if(functionId==1){
        getTrendingmovies();
        }
        else if(functionId==2){
            getHighestGrossing();
        }
        else if(functionId==3){
            getMovies();
        }
        else if(functionId==4){
            getTopRated();
        }
        else if(functionId==5){
            getTopRatedM();
        }
        else if(functionId==6){
            getShows();
        }
        else if(functionId==7){
            search();
        };
    };