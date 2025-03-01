# Pugger

Use the [pug](https://github.com/pugjs/pug)
templating engine with [ambiorix](https://ambiorix.dev).

## Installation

``` r
# install.packages("remotes")
remotes::install_github("ambiorix-web/pugger")
```

## Example

Render the following `test.pug` file.

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5);
  body
    h1 Pug - node template engine
    #container.col
      if iUsePugger
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

With the following app.

``` r
library(ambiorix)

app <- Ambiorix$new()

app$engine(pugger::pugger())

app$get("/", \(req, res) {
  res$render(
    "test.pug",
    list(
      iUsePugger = TRUE
    )
  )
})

app$start()
```

__Outside of Ambiorix__

Just use `renderer`.

```r
pugger::renderer(
  "test.pug",
  list(
    iUsePugger = TRUE
  )
)
```
