# ambiorix

![](../_assets/ambiorix.png)

<!-- badges: start -->
[![R build status](https://github.com/JohnCoene/ambiorix/workflows/R-CMD-check/badge.svg)](https://github.com/JohnCoene/ambiorix/actions)
<!-- badges: end -->

Web framework for R inspired by [express.js](https://github.com/expressjs/express).

## Features


Ambiorix is unopinionated giving you flexibility. 

## Web Apps

Build multi-page or single-page web applications.

## APIs

Quickly build web RESTful APIs.

## Websocket

Support for bidirectional websocket communication.


Basic example:

```r
library(ambiorix)

app <- Ambiorix$new()

app$get("/", \(req, res){
  res$send("Using {ambiorix}!")
})

app$get("/about", \(req, res){
  res$send("About page")
})

app$start()
```

See also:

[CLI](https://github.com/JohnCoene/ambiorix-cli) | [generator](https://github.com/JohnCoene/ambiorix.generator) | [docker](https://hub.docker.com/r/jcoenep/ambiorix)

## Contributing

Please note that the ambiorix project is released with a [Contributor Code of Conduct](https://contributor-covenant.org/version/2/0/CODE_OF_CONDUCT.html). By contributing to this project, you agree to abide by its terms.
