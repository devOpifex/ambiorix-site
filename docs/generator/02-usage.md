# Usage

Simply call one of the `create_*` functions to setup your
project.

## Package

:::tip

Creating an ambiorix project in the form of an R package
is recommended as it allows you to leverage all of the R
toolchain, such as testing, or documenting.

:::

```r
ambiorix.generator::create_package(
  "myapp"
)
```

## Project

You can also create an ambiorix project, 
not in the form of an R package (not recommended).

### Basic

A basic project.

```r
ambiorix.generator::create_basic(
  "myapp"
)
```

### Bootstrap

A bootstrap version 5 project.

```r
ambiorix.generator::create_bootstrap(
  "myapp"
)
```

### Vue

A project using Vue.

```r
ambiorix.generator::create_vue(
  "myapp"
)
```
