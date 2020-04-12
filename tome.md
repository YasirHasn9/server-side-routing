routing side server 
Route is one of the main feature of Express. 

-- how does it work ? 
it allows us to map incoming requests from the client and the choose the right handler function.so route is like a specific direction to specific handle function


we can use a single route for many request based on the url 
lets say we have a source of users that we make some CRUD on them
one router for them 
get("/user") post("/users") delete("/users") put("/users") => route("/users")

that operation the architecture 


there are three ways to send data to existing endpoint
 --1.req.body
   2.query
   3.dynamic route parameters 

express has support for multiple route parameters 
so lets say you have more that one id , they will automatically add to the req.params 

endpoint ("/user/:id/product/productID)
so the id and productId will be in the req.params object


when build Restful api think of 
  -everything is resource 
  -each resource can be accessible via a unique url
  -resource can have multiple representation 
  -communication happens over stateless protocol (http)
  -management the resource through http 

