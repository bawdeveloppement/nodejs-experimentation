// 1: The API listens on a PORT and accepts incomming HTTP request for
// POST, GET, PUT, DELETE and HEAD

// 2: The API allows a client to connect thjen create a user,
// modify and delete

// 3. The API Allows a user to "sign in" which gives them a token
// that they can use for subsequent authenticated requests.

// 4. The API allows the user to "sign out" which invalidate
// their token

// 5. The API allows a signed-in user to use their token to
// create a new "check", and by check we mean a task for the system
// to check a given url if it's up or down. (res: 200)

// 6. THE API allows a signed-in user to edit or delete any of
// their checks

// 7. In the background, workers perform all the "checks" at the appropriate times
// and send alerts to ther users when a check changes it's state from
// "up" to "down", or vice versa


// That's our backend spec.