
// const app = new Clarifai.App({
//  apiKey: '494fee376124444d946897b232f03025'  { not required when using fetch() method }
// });
const ApiFunction = (imageURL)=> {
    const PAT = '25d5385e3b4940948d48dc7b448ecbbd';
    const USER_ID = 'rahul01';       
    const APP_ID = 'facerecognitionbrain01';
    // const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
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
    });


    const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
}

const handleApi = (req, res) => {
  fetch("https://api.clarifai.com/v2/models/face-detection/outputs", ApiFunction(req.body.input))
  .then(response => response.json())
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then (entries => {
    console.log(entries[0].entries);
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}
 module.exports = {
  handleImage,
  handleApi
 }