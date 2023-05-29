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
                let overview = movie['overview']
                
                // 영화의 ID를 'rank_array' 배열에 추가하고,
                rank_array.push(id)

                // indexOf(id)는 'rank_array' 배열에서 해당 요소(id)를 검색하고, 일치하는 값의 index를 반환합니다. 
                // + 1: index는 0부터 시작하므로, indexOf()의 결과에 1을 더하여 순위를 계산합니다. 
                // 예를 들어, rank_array 배열이 [238, 278, 240, 19404, 424]이고 현재 처리 중인 영화의 id가 '238'이라면, 
                // rank_array.indexOf(id)는 0를 반환합니다. 
                // 그리고 + 1을 수행하여 rank 변수에는 '1'이 할당됩니다. 이는 결국 해당 영화의 순위를 나타냅니다.
                let rank = rank_array.indexOf(id) + 1

                let temp =`<div class="card" onclick = 'alert("${id}")'>
                            <img src="${poster_path}" class="poster_path">
                                <div class="card_body">
                                    <p class="rank"> ${rank} </p>
                                    <h4 class="card_title">${title}</h4>
                                    <p class="vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                                </div>
                            </div>`
                // "cards"라는 ID를 가진 요소의 끝에 생성한 HTML 요소를 삽입합니다.
                document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
            })
        }
    )

document.getElementById("search_entry")
    .addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            document.getElementById("search_button").click();
        }
    });
};