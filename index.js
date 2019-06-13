const server = require('./api');
const { connect } = require('mongoose');
const PORT = process.env.PORT || 7000
connect(
    `mongodb+srv://jorge:dXgwmoWW7nZsP23O@graphql-mongodb-vcif4.mongodb.net/mernstack?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
    .then(server.listen(PORT, console.log(`Server is running on port ${PORT}!`)))
    .catch(err => console.log(err));
