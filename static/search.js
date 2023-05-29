function search() {
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
            let rows = data['results']

            let rank_array = [] // <-----

            // 검색어 filtering에 사용할 빈 배열 'array_for_filtering'를 생성합니다.
            let array_for_filtering = []
            document.getElementById("cards").innerHTML = ""

            // HTML에서 ID가 "search_entry"인 요소의 값을 가져와서 'search_string' 변수에 할당합니다.
            // 이는 사용자가 입력한 검색어를 나타냅니다.
            let search_string = document.querySelector("#search_entry").value
            // 검색어를 소문자로 변환하여 'lower_search' 변수에 할당합니다.
            let lower_search = search_string.toLowerCase()
            
            // 'rows' 배열을 반복하여 각 영화 제목을 소문자로 변환하여 'array_for_filtering' 배열에 추가합니다.
            for (i = 0; i < rows.length; i++) {
                array_for_filtering.push(rows[i]['title'].toLowerCase())
            }
            
            // 'array_for_filtering' 배열에서 검색어를 포함하는 영화 제목만 filtering하여, 
            // 새로운 배열인 'filtered_title_array'를 생성합니다.
            let filtered_title_array = array_for_filtering.filter(function (this_movie) {
                return this_movie.includes(lower_search)
            })
            
            // 'filtered_title_array'가 비어있을 경우, "this movie doesn't exist!"라는 알림이 표시됩니다.
            if (filtered_title_array.length == 0) {
                alert("this movie doesn't exist!")
            }
            
            // 검색어가 입력되지 않았을 경우, "please enter movie name!"이라는 알림이 표시됩니다.
            if (search_string == false) {
                alert("please enter movie name!")
            }
                
            rows.forEach((movie) => {
                let id = movie['id']

                let title = movie['title']
                // 현재 영화 제목을 소문자로 변환하여 'lower_title' 변수에 저장합니다. 
                // 이는 검색어를 소문자로 변환하여 대소문자 구분 없이 검색을 수행하기 위함입니다.
                let lower_title = title.toLowerCase()
                let poster_path = "https://image.tmdb.org/t/p/w300" + movie['poster_path']
                let vote_average = movie['vote_average']
                let overview = movie['overview']

                rank_array.push(id) // <-----
                let rank = rank_array.indexOf(id) + 1 // <-----

                let temp =`<div class="card" onclick = 'alert("${id}")'>
                            <img src="${poster_path}" class="poster_path">
                                <div class="card_body">
                                    <p class="rank"> ${rank} </p>
                                    <h4 class="card_title">${title}</h4>
                                    <p class="vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                                </div>
                            </div>`

                // 현재 영화 제목이 검색어를 포함하는 경우에만 다음 내용을 실행합니다.
                if (lower_title.includes(lower_search)) {
                    document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
                }
            })
        }
    )
}