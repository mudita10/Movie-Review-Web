const API_key="api_key=120a1b9df4408d5503a407ab7d053e82";
const Base_URL="https://api.themoviedb.org/3"
const ImageBase_URL="https://image.tmdb.org/t/p/w500"
const PopularMoviesUrl=Base_URL+"/trending/all/day?"+API_key
const searchBase_URL=Base_URL+"/search/movie?"+API_key

const main =document.getElementById("main");
const form =document.getElementById("form");
const search=document.getElementById("search");
const home1=document.getElementById("home1");
const home2=document.getElementById("home2");
const kids=document.getElementById("kids");
const moviesButton=document.getElementById("moviesButton");
const TVshows=document.getElementById("TVshows");

getMovies(PopularMoviesUrl);

function getMovies(url){
    main.innerHTML="";
    fetch(url).then(res=>res.json()).then(data=>{
        showMovies(data.results)
    })
}
function showMovies(data){
    data.forEach(element => {
        const {title,name,overview,poster_path,vote_average}=element;
        const node=document.createElement("div");
        node.setAttribute("class","movie");
        node.innerHTML='<img src="'+ImageBase_URL+poster_path+'" alt="images"/><div class="movieInfo"><h3>'+(title?title:name)+'</h3><span class="'+getColor(vote_average)+'">'+vote_average+'</span></div><div class="overview"><p>'+overview+'</p></div>';
        main.appendChild(node);
    });
}

function getColor(value){
    if(value>=8){
        return "green";
    }else if(value>=6){
        return "orange";
    }else{
        return "red";
    }

}

//searching movie

form.addEventListener("submit",(x)=>{
    x.preventDefault();
    const searchKey=search.value;
    search.value="";
    if(searchKey){
        const searchURL=searchBase_URL+"&query="+searchKey;
        getMovies(searchURL);
    }
    else{
        getMovies(PopularMoviesUrl)
    }

})

home1.addEventListener("click",()=>{
    getMovies(PopularMoviesUrl);
})
home2.addEventListener("click",()=>{
    getMovies(PopularMoviesUrl);
})
kids.addEventListener("click",()=>{
    const kidsURL=Base_URL+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&"+API_key;
    getMovies(kidsURL);
})
moviesButton.addEventListener("click",()=>{
    const movieURL=Base_URL+"/trending/movie/day?"+API_key;
    getMovies(movieURL);
})
TVshows.addEventListener("click",()=>{
    const tvShowURL=Base_URL+"/tv/popular?&"+API_key;
    getMovies(tvShowURL);
})