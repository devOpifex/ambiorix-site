# Websocket

:::note

If you are unfamiliar with websockets, this is what [shiny](https://shiny.rstudio.com/) uses for inputs: it allows sending messages from the client to the browser and vice versa.

:::

You can listen to incoming messages with the `receive` method which takes 1) the name of the message to handle and 2) a callback function to run when a message with `name` is received. The callback function must accept the message as first argument and optionally the socket as second argument.

Below a handler listening to the message `hello`, prints the message and uses the websocket to send a response.

```r
# listen to incoming messages
app$receive("hello", \(msg, ws){
  print(msg)
  ws$send("hello", "Hello back! (sent from R)")
})
```

## JavaScript

Messages sent from the server can be handled client-side with the JavaScript websocket library or using the `Ambiorix` class. It provides a static method to send messages through the websocket, like other methods in R it accepts 1) the `name` of the message and 2) the `message` itself: `Ambiorix.send('hello', 'Hello from the client')`.

One can also instantiate the class to add handlers with `receive` method then run `start` to have the handlers actually listen to incoming messages.

```js
var wss = new Ambiorix();
wss.receive("hello", (msg) => {
  alert(msg);
});
wss.start();
```

When setting up a project with `create_ambiorix` an `ambiorix.js` file is placed in the static directory, this contains a class that will allow receiving and sending messages through the websocket.

The `Ambiorix` object has two classes, `send` which is static and thus can be used without instantiating the class.

```js
Ambiorix.send('messageName', 'Sent from the server')
```

And `receive`, a method to add listeners, very much like the `receive` method in R, this also takes the name of the message as first argument and the callback function as second argument.

```js
var wss = new Ambiorix();
wss.receive("hello", (msg) => {
  alert(msg);
});
```

This must then be "started," this actually attaches the event listeners created with `receive`.

```js
wss.start()
```

## Example

Here we put in practice all that was explained in the previous sections. This example simply sends a message from the client to the server at the click of a button, this message is then printed by the server which responds with another message that shows an alert.

```html
<!-- templates/home.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="static/style.css">
  <script src="static/ambiorix.js"></script>
  <script>
    var wss = new Ambiorix();
    wss.receive("hello", (msg) => {
      alert(msg);
    });
    wss.start();
  </script>
  <title>Ambiorix</title>
</head>
<body>
  <h1 class="brand">Websocket example</h1>
  <button onclick="Ambiorix.send('hello', 'Hi from the client')">Send a message</button>
</body>
</html>
```

Below we use `receive` to pass a callback function that receives the message and sends a response (that triggers the alert).

```r
library(ambiorix)

app <- Ambiorix$new()

# homepage
app$get("/", \(req, res){
  res$send_file("home.html")
})

# socket 
app$receive("hello", \(msg, ws){
  print(msg)
  ws$send("hello", "Hello back! (sent from R)")
})

app$start()
```

![](../_assets/websocket-ex.gif)

## Bypass Ambiorix

The above made use of ambiorix's convenience, if you wish to bypass it you can specify your own handler function which it must accept the websocket.

```r
app$websocket <- \(ws){
  ws$onMessage(\(binary, message){
    cat("Received a message:", message, "\n")
  })
}
```
