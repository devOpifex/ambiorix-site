# Rendering

In ambiorix you will often, if not always, render the response
sent back from the server (you can always not render but just send back
a file, e.g.: serving static files).

This is quite evident when returning data, e.g.: json but may raise
questions when dealing with HTML.

## Default

The default rendering engine is in flux.
It's by no means perfect and plans are to improve it a great deal;
hence there are a number of middlewares to change it (more on this later).

Before diving in, a quick reminder; you "render" HTML with the `render`
method on the `Response`.

```r
res$render(
  "file.html",
  list(
    x = 1,
    y = "hello"
  )
)
```

The rendering engine essentially turns different "tags" placed inside
an HTML file.
There are two types of tags, one that references other HTML files
and one that uses data to dynamically render the HTML.

### Files

Rendering/Including files is done with the `[! path/to/file.html !]`
tags.
This is mainly useful for sharing dependencies in the app; 
some dependencies will likely be shared across pages, e.g.: whatever
CSS framework you use.

So we can create a `header.html` file.

```html
<!--header.html-->
<head>
  <link href="path/to/file.css" />
  <script src="path/to/file.js"></script>
</head>
```

Then source it in templates with.

```html
<!--home.html-->
<html>
  [! header.html !]
  <body>
    <h1>Hello!</h1>
  </body>
</html>
```

With the above running something like the snippet below will correctly 
render the `<head>` in the response.

```r
app$get("/", \(req, res) {
  res$render(
    "home.html"
  )
})
```

You can then share these files across responses very easily.

## HTML

You can also render HTML dynamically with the `[% value %]` tab.

```html
<!--home.html-->
<html>
  [! header.html !]
  <body>
    <h1>Hello [% value %]!</h1>
  </body>
</html>
```

Which can then be rendered with:

```r
app$get("/", \(req, res) {
  res$render(
    "home.html",
    list(
      value = "you"
    )
  )
})
```

This tag accepts R code so one can, for instance, do something like this:

```html
<!--home.html-->
<html>
  [! header.html !]
  <body>
    <h1>Hello [% ifelse(value, 'you', 'not you') %]!</h1>
  </body>
</html>
```

Which can then be rendered with:

```r
app$get("/", \(req, res) {
  res$render(
    "home.html",
    list(
      value = TRUE # or FALSE
    )
  )
})
```

## Middlewares

There are a three middlewares you can use as alternatives.

- `use_html_template()` htmltools template engine
- [pugger](https://github.com/devOpifex/pugger) Pug engine
- [jader](https://github.com/devOpifex/jader) Jade engine

For instance with {pugger} on would use a `.pug` file.

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

And remember to register the renderer with `app$use(pugger::pugger())`.
