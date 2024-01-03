import mongoose from "mongoose";


function connect() {
  const dbUri = process.env.DB_URL;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } )
    .then(() => {
      console.log("Database connceted successfully");
    })
    .catch((err) => {
      console.log("db error", err);
      process.exit(1);
    });
}

export default connect;