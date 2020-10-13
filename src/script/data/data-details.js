class DataSource {
    static showDetailMovie(movieID) {
        return fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=f4cad3ca5afa8146ae803714adbf265b`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`${movieID} is not found`);
                }
            })
    }
}

export default DataSource;