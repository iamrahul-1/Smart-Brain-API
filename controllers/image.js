// const app = new Clarifai.App({
//  apiKey: '494fee376124444d946897b232f03025'  { not required when using fetch() method }
// });
const Users = require("./../models/users");

const ApiFunction = (imageURL) => {
  const PAT = "25d5385e3b4940948d48dc7b448ecbbd";
  const USER_ID = "rahul01";
  const APP_ID = "facerecognitionbrain01";
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

const handleApi = (req, res) => {
  fetch(
    "https://api.clarifai.com/v2/models/face-detection/outputs",
    ApiFunction(req.body.input)
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

// const handleImage = async (req, res) => {
//   const id = req.body.id;
//   console.log(id, "id");
//   // db("users")
//   //   .where("id", "=", id)
//   //   .increment("entries", 1)
//   //   .returning("entries")
//   //   .then((entries) => {
//   //     console.log(entries[0].entries);
//   //     res.json(entries[0].entries);
//   //   })
//   try {
//     user = await Users.findOne({ id });
//     user.entries += 1;
//     await Users.UpdateOne({ entries: user.entries });
//     console.log(user.entries);
//     res.json(user.entries);
//   } catch {
//     (err) => res.status(400).json("unable to get entries");
//   }
// };
const handleImage = async (req, res) => {
  const { id } = req.body; // Get the user id from the request
  try {
    // Find user by id and increment the 'entries' field using the $inc operator
    const updatedUser = await Users.findOneAndUpdate(
      { id }, // Find the user by id
      { $inc: { entries: 1 } }, // Increment the 'entries' field by 1
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json("User not found"); // If no user is found, return 404
    }

    // Log and respond with the updated 'entries' field
    console.log("Updated user entries:", updatedUser.entries);
    res.json(updatedUser.entries);
  } catch (err) {
    console.error("Error updating user entries:", err); // Log the error if any
    res.status(400).json("Unable to update entries");
  }
};

module.exports = {
  handleImage,
  handleApi,
};
