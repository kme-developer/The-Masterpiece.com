import { search } from "./search.js";
import { detail_modal } from "./detail.js";

const cards = document.querySelector(".cards");

document.addEventListener("DOMContentLoaded", load);

const home = document.getElementById("home");
home.addEventListener("click", load);

const search_button = document.getElementById("search_button");
search_button.addEventListener("click", search);

function load() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzU4MTBhZDU5Mzc0YTIxMzAxZmY4ODViZTUxMjMxZiIsInN1YiI6IjY0NzQxODRjYTg5NGQ2MDBmYzU1NWNkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kP1vZbYEQE0CrUCVq8F9oBoOEoD_BROVGRHHjXJrwc'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            // 객체에서 'results' 속성을 추출하여 'rows' 변수에 할당합니다. 이 속성은 영화 목록을 나타냅니다.
            let rows = data['results']
            // 영화의 순위를 추적하기 위한 빈 배열 'rank_array'를 선언합니다.
            let rank_array = []
            // "cards"라는 ID를 가진 요소의 내부 HTML을 비웁니다. 이를 통해 이전에 표시된 영화를 모두 제거합니다.
            document.getElementById("cards").innerHTML = ""

            rows.forEach((movie) => {
                let id = movie['id']

                let title = movie['title']
                let poster_path = "https://image.tmdb.org/t/p/w300" + movie['poster_path']
                let vote_average = movie['vote_average']
                // let overview = movie['overview']
                
                // 영화의 ID를 'rank_array' 배열에 추가하고,
                rank_array.push(id)

                // indexOf(id)는 'rank_array' 배열에서 해당 요소(id)를 검색하고, 일치하는 값의 index를 반환합니다. 
                // + 1: index는 0부터 시작하므로, indexOf()의 결과에 1을 더하여 순위를 계산합니다. 
                // 예를 들어, rank_array 배열이 [238, 278, 240, 19404, 424]이고 현재 처리 중인 영화의 id가 '238'이라면, 
                // rank_array.indexOf(id)는 0를 반환합니다. 
                // 그리고 + 1을 수행하여 rank 변수에는 '1'이 할당됩니다. 이는 결국 해당 영화의 순위를 나타냅니다.
                let rank = rank_array.indexOf(id) + 1

                let temp = 
                `<div class="card" id="${id}" onclick='alert("${id}")'>
                    <img class="poster_path" id="${id}" src="${poster_path}">
                    <div class="card_body" id="${id}">
                        <div class="rank_and_vote_average" id="${id}" >
                            <p class="rank" id="${id}">${rank}</p>
                            <p class="vote_average" id="${id}">★ ${vote_average}</p>
                        </div>
                        <h4 class="card_title" id="${id}">${title}</h4>
                    </div>
                </div>`
                
                // 'cards'를 'click'하면 'detail_modal' 함수가 실행됩니다.
                cards.addEventListener("click", detail_modal)

                // "cards"라는 ID를 가진 요소의 끝에 생성한 HTML 요소를 삽입합니다.
                document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
            })
        }
    )

// 'Enter'를 치면, 검색이 가능하게 만드는 구문입니다.
document.getElementById("search_entry")
    .addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            document.getElementById("search_button").click();
        }
    });
};
