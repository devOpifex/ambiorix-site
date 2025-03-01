# Response

Every route (`get`, `post`, etc.) handler should accept the request (`req`) and the response (`res`). Note that routes may optionally accept a different handler for errors.

## HTML

Send plain HTML with `send`.

```r
app$get("/html", \(req, res){
  res$send("hello!")
})
```

You can change the renderer by either creating your own
middleware or use one of the existing ones:

- `use_html_template()` [htmltools template engine](https://shiny.rstudio.com/articles/templates.html)
- [pugger](https://github.com/ambiorix-web/pugger) Pug engine
- [jader](https://github.com/ambiorix-web/jader) Jade engine

## Sendf

A convenient wrapper around `sprintf` and the `send`.

```r
app$get("/text", \(req, res){
  res$sendf("Hello %s", req$user)
})
```

## Text

Send a plain text with `text`.

```r
app$get("/text", \(req, res){
  res$text("hello!")
})
```

## File

An `.html` or `.R` file can also be used as response.

```r
# sends templates/home.html
app$get("/file", \(req, res){
  res$send_file("home.html")
})
```

## Render

An `.html` or `.R` file can also be rendered. The difference with `send_file` is that it will use `data` to process `[% tags %]`. You can read more it in the templates documentation.

```r
# renders templates/home.html
# replaces [% title %]
app$get("/:book", \(req, res){
  res$render("home.html", data = list(title = req$params$book))
})
```

## JSON

You can also send JSON responses with `json`, e.g.: to build an api

```r
app$get("/:book", \(req, res){
  res$json(cars)
})
```

## Status

The status of the response can be specified in the response method (e.g.: `render('home', status = 200L)`), or with the `status` method.

```r
app$get("/error", \(req, res){
  res$status(500)
  res$send("Error!")
})

# or
app$get("/error", \(req, res){
  res$send("Error!", status = 500L)
})
```

## Redirect

One can also redirect to a different url, note that these should have a `status` starting in `3`.

```r
app$get("/redirect", \(req, res){
  res$redirect("/", status = 302L)
})
```

## CSV

Serialises to CSV, when this endpoint is visited the CSV file is downloaded. It takes the data as first argument and the name of the file to download as second argument.

```r
app$get("/csv", \(req, res){
  res$csv(cars, "cars-data")
})
```

## TSV

Serialises to tab separated file; it takes the same arguments as the csv response.

```r
app$get("/tsv", \(req, res){
  res$tsv(mtcars, "more-cars")
})
```

## htmlwidgets

Serialises an htmlwidget.

```r
library(echarts4r)

app$get("/htmlwidget", \(req, res){
  plot <- e_charts(cars, speed) %>% 
    e_scatter(dist)
  res$htmlwidget(plot)
})
```

## Headers

You can add headers with the `header` method on the response object.

```r
app$get("/hello", \(req, res){
  res$header("Content-Type", "something")
  res$send("Using {ambiorix}!")
})
```

