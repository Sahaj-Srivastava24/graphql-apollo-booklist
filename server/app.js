const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express();
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')


mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@gql-testing.ffs80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mongoose.connection.once( "open", ()=> {
  console.log("Connected to MongoDB")
})
const PORT = 4000


app.use(cors())

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.get("/", (req,res) => {
  res.redirect("/graphql")
})

app.listen(PORT, () => {
  console.log("Listening at port ", PORT)
})