// 'modal' 기능을 실현하는 함수입니다.
export function detail_modal({target}) {
    console.log(target)

    if (target === cards) return;

    if (target.matches(".card, .poster_path, .card_body, .rank_and_vote_average, .rank, .vote_average, .card_title")) {
        let id = target.id;
        console.log(`this movie ID => ${id}`);

        localStorage.setItem("movie_ID", id);
    }

    let api_key = "9119f549275a23ec65b54dfd6152a086"
    let this_movie_ID = localStorage.getItem("movie_ID");

    document.getElementById('modal_container').innerHTML = '';

    fetch(`https://api.themoviedb.org/3/movie/${this_movie_ID}?api_key=${api_key}`, { method: 'GET' })
        .then(response => response.json())
        .then(movie => {
            console.log(movie)
            console.log(this_movie_ID)

            let temp_html = 
            `<div id="modal_up">
                <img class="modal_poster_path" id="${movie.id}" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                <div class="modal_card_body" id="${movie.id}">
                    <h1 class="modal_card_title"  id="${movie.id}" >${movie.title}</h1>
                    <p class="modal_vote_average" id="${movie.id}" >★ ${movie.vote_average}</p>
                    <p class="modal_overview" id="${movie.id}">${movie.overview}</p>
                </div>
                <div class="review_box" id="${movie.id}">
                    <div class="user_entry">
                        <input id="user_id" placeholder="user ID" autocomplete="off"></input>
                        <input id="user_pw" placeholder="user PW" autocomplete="off"></input>
                        <input id="user_comment" placeholder="leave a comment" autocomplete="off" autofocus></input>
                    </div>
                    <div class="crud_buttons">
                        <button class="save" id="${movie.id}" type="button">save</button>
                        <button class="edit" id="${movie.id}" type=" button">edit</button>
                        <button class="delete" id="${movie.id}" type=" button">delete</button>
                    </div>
                    <div>
                        <hr class="modal_divider">
                    </div>
                </div>
            </div>`

            document.getElementById('modal_container').insertAdjacentHTML('beforeend', temp_html);
            document.getElementById('modal').classList.add('active');
            document.getElementById('modal_up').classList.add('active');
        })
}

document.addEventListener('click', function (event) {
    if (event.target.id === 'modal') {
        document.getElementById('modal').classList.remove('active');
        document.getElementById('modal_up').classList.remove('active');
    }
})
