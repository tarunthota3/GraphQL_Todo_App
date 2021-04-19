const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const Author = require('./models/author');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
mongoose.connect('mongodb://localhost:27017/gqlNinja', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', ()=>{
    console.log("connected to database");
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }),);




app.listen(port, ()=> console.log(`Server is listening on http://localhost:${port}`));