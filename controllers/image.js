const axios = require('axios')

const handleApiCall = (req, res) => {
    const PAT = '63d9310bff304a7486be5471c990b3fc'; 
    const IMAGE_URL = req.body.id;
    const raw = {
        "user_app_id": {
            "user_id": 'nessabyte',
            "app_id": 'my-first-application'
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    };


    axios.post("https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs", 
                raw,
                { 
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Key ' + PAT
                    }
                }
            )
        .then(response => {
            res.json(response.data)

        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
    })
    .catch((err) => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleApiCall, handleImage
}