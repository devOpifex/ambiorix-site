# Hello World

<!-- panels:start -->

<!-- div:left-panel -->

By default ambiorix will serve the application on a random port, this can be changed, along with other things, when instantiating the class. 

```r
library(ambiorix)

app <- Ambiorix$new()

app$get("/", \(req, res){
  res$send("Using {ambiorix}!")
})

app$get("/about", \(req, res){
  res$text("About")
})

app$start()
```

<!-- div:right-panel -->

![](../_assets/rstudio.png)

<!-- panels:end -->

