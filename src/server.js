import { Server } from "miragejs";
import Books from "./Json/Books.json";

export function makeServer() {
  let server = new Server({

    routes() {
      this.namespace = "api"

      this.get("/books", (schema) => {
        return Books
      })
      
      this.post("/add", (schema, req) => {
        console.log(req)
        const newBook = JSON.parse(req.requestBody);
        Books.push(newBook)
      })
    },
  })

  return server
}