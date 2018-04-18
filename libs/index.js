module.exports = {
    mergeResults : (dbResults, spotifyResults) => {
        return spotifyResults.map((result)=>{
            const match = dbResults.find((dbResult)=>dbResult.spotify_id === result.id)
            return {...result, emojis: match.emojis, spotify_id: match.spotify_id, id: match.id}
        })
    },
    spotifyGetInfo : (request, type, ids, token, callback) => {
        request.get({
            url: `https://api.spotify.com/v1/${type}?ids=${ids}`,
            headers: {'Authorization': 'Bearer ' + token},
            json: true
            }, (err, res, body) => {
                callback(err, res, body)
            })
    },
    spotifySearch : (request, type, query, token, callback) => {
        request.get({
            url: `https://api.spotify.com/v1/search?type=${type}&q=${query}`,
            headers: {'Authorization': 'Bearer ' + token},
            json: true
            }, (err, res, body)=>{
                callback(err, res, body)
            })

    },
    spotifyAuthorize : (request, client_id, client_secret, callback) => {
        request.post({
            url: 'https://accounts.spotify.com/api/token',
            headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
            form: {grant_type: 'client_credentials'},
            json: true
          }, (err, res, body)=>{
                callback(err, res, body)
          })
    }
}