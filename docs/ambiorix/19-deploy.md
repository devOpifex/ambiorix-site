# Deployment

These are just some of the ways in which you can deploy an ambiorix application,
and this is by no means an exhaustive list.

## Docker

One of the easiest way to deploy an ambiorix app is by using [docker](https://www.docker.com/) + [`{renv}`](https://rstudio.github.io/renv/articles/renv.html) + [docker compose](<https://docs.docker.com/compose/>).

**Requirements:**

- Install [docker](https://docs.docker.com/engine/install/).
- Install [docker compose](https://docs.docker.com/compose/install/).
- Bootstrap your project using [`{renv}`](https://rstudio.github.io/renv/articles/renv.html). Ideally, you only need to run `renv::init()`.

1. Create a file named `Dockerfile` at the root directory of your project and add this to it:

    ```Dockerfile
    FROM jcoenep/ambiorix
    WORKDIR /app
    COPY . .
    RUN R -e "renv::restore()"
    EXPOSE 8000
    CMD [ "Rscript", "index.R" ]
    ```

    Here are some simple explanations of what each line does:

    - `FROM jcoenep/ambiorix`: This specifies the base Docker image. It pulls an image pre-configured with
    Ambiorix from Docker Hub. The [`jcoenep/ambiorix`](https://hub.docker.com/r/jcoenep/ambiorix) image already includes everything needed to run an
    Ambiorix app.
    - `WORKDIR /app`: Sets the working directory inside the container to `/app`. All subsequent commands
    in the Dockerfile will run in this directory.
    - `COPY . .`: Copies all files from your local project directory (on the host machine) to the `/app`
    directory inside the container.
    - `RUN R -e "renv::restore()"`: Runs that R expression which restores the package dependencies defined
    in your `renv.lock` file.
    - `EXPOSE 8000`: This is more of documentation to your future self that the container will use port 8000
    to serve the application. This should be the same port you set ambiorix to run on ie. `Ambiorix$new(port = 8000L)$...`
    - `CMD [ "Rscript", "index.R" ]`: This sets the default command to run when the container starts.

1. Build the docker image:

    ```bash
    docker build -t cute-cats .
    ```

    - `docker build`: Command to build a Docker image.
    - `-t cute-cats`: The `-t` flag tags/names the image as `cute-cats`.
    - `.`: The dot refers to the current directory, meaning Docker will look for the `Dockerfile` in the current folder.

1. Create another file named `docker-compose.yml` and place these contents in it:

    ```yml
    services:
      cute-cats:
        image: cute-cats
        ports:
          - "1028:8000"
        volumes:
          - ./data:/app/data
        restart: unless-stopped
    ```

    - `services`: Defines the containers Docker Compose will manage. In this case, we only have one service called `cute-cats`.
    - `image: cute-cats`: Tell Docker Compose to use the image we built earlier, named `cute-cats`.
    - `ports`: Maps port 1028 on the host machine to port 8000 inside the container (where the ambiorix app is served, remember `EXPOSE 8000`?). This means you can access the app at `localhost:1028`.
    - `volumes`: Maps a folder on the host (`./data`) to the container's `/app/data` directory. This ensures
    that data in the container is synced with the host and ensures data persistence if the container stops.
    You can remove the `volumes` mapping if your app doesn't need persistent data storage.
    - `restart`: Ensures the container automatically restarts if it crashes, unless it has been manually stopped.

1. Run the services:

    ```bash
    docker compose up -d
    ```

    - `docker compose up` creates and starts the containers as defined in the `docker-compose.yml` file.
    - The `-d` flag runs the containers in detached mode ie. in the background.

    This will run the app on port 1028 of the host machine, so you will view it at [localhost:1028](http://localhost:1028/).

1. To stop the services do:

    ```bash
    docker compose down
    ```

    This stops and removes the containers but keeps the Docker images intact, so you can start them again
    later with `docker compose up`.

## Shiny Server

Surprise surprise! Yes, you can actually deploy Ambiorix apps & APIs using [Shiny Server](https://docs.posit.co/shiny-server/#getting-started).

This is such good news because you can put your Ambiorix & Shiny apps in one directory and
have Shiny Server serve all of them!

**Two things to keep in mind:**

- All your Ambiorix entrypoints will have to be named `app.R`, you can't just
name the files anyhow (eg. `index.R`, `server.R`, etc) because Shiny Server will search for `app.R`.
- When building frontend applications using Ambiorix, you'd normally set the `href` attributes of anchor tags to someting like `/about` or `/contact` to link to the different endpoints within the same app. However, when the app is hosted on Shiny Server at a URL like `http://localhost:3838/app-name`, using `/about` as the link will direct the browser to `http://localhost:3838/about` (outside your app), which isn't what you intend. To fix this, you need to prepend the app name to the `href` values, like `href = "/app-name/about"`. This ensures that the links point the browser to the correct routes within your app.

**Example deployment:**

Before Shiny Server starts an R process, it sets the `SHINY_PORT` environment variable, which
tells the app which port to run on. In your Ambiorix app, you can retrieve this port using
`Sys.getenv("SHINY_PORT")`.

1. Build your app. Say I have this `app.R` at `/home/mwavu/projects/random`:

    ```r
    library(ambiorix)
    library(htmltools)

    home_get <- \(req, res) {
      html <- tags$h3("Yes, Ambiorix IN Shiny Server!")
      res$set_status(200L)$send(html)
    }

    home_post <- \(req, res) {
      response <- list(
        code = 200L,
        msg = "An API too!"
      )
      res$set_status(200L)$json(response)
    }

    # get port to run app on from Shiny Server
    port <- Sys.getenv("SHINY_PORT")

    Ambiorix$
      new(port = port)$
      get("/", home_get)$
      post("/", home_post)$
      start()
    ```

1. Configure Shiny Server to serve apps from the `/home/mwavu/projects` directory. Shiny Server configuration file is typically located at `/etc/shiny-server/shiny-server.conf`.

    ```nginx
    run_as mwavu; # user under which Shiny Server runs

    server {
      listen 3838;

      # define a location at the base URL
      location / {

        # host the directory of ambiorix/shiny apps stored in this dir:
        site_dir /home/mwavu/projects;

        # log dir:
        log_dir /var/log/shiny-server;

        # ...other configs...
      }
    }
    ```

1. Restart Shiny Server

    ```bash
    systemctl restart shiny-server.service
    ```

1. Now visit [localhost:3838/random](http://localhost:3838/random). Voila!

**An Important Consideration:**

While the open-source version of Shiny Server will work well for most users, some advanced
functionality (such as managing the number of R processes, load balancing, etc.) will require Shiny Server Professional. In the long run, you'd benefit from learning how to implement these features independently, especially for more control & flexibility.

## Shinyapps.io

You can use that same solution for deploying using Shiny Server to host your Ambiorix apps & APIs on [shinyapps.io](https://shinyapps.io/).

Good thing is now you won't have to deal with any configurations. All you need to remember is to get the port to run the app on and the point I made on anchor tags (if building the frontend).

1. Using the same example app:

    ```r
    library(ambiorix)
    library(htmltools)

    home_get <- \(req, res) {
      html <- tags$h3("Ambiorix IN shinyapps.io!")
      res$set_status(200L)$send(html)
    }

    home_post <- \(req, res) {
      response <- list(
        code = 200L,
        msg = "An API too!"
      )
      res$set_status(200L)$json(response)
    }

    # get port to run app on from Shiny Server
    port <- Sys.getenv("SHINY_PORT")

    Ambiorix$
      new(port = port)$
      get("/", home_get)$
      post("/", home_post)$
      start()
    ```

1. Follow the same steps as for a shiny app: [how to deploy to shinyapps.io](https://shiny.posit.co/r/articles/share/shinyapps/).

See [example live app](https://mwavu.shinyapps.io/hello/) running on shinyapps.io

## Systemd Service

The application can be deployed as a service on any Linux server.

You might need to run these commands as `sudo`.

1. Create a new `.service` file in the `/etc/systemd/system/` directory. The name
of the file defines the name of the service. We will use `cute-cats.service`
as an example:

    ```bash
    vim /etc/systemd/system/cute-cats.service
    ```

1. In that `.service` file place the following configuration, it creates a service that runs the application at the defined path (`/path/to/app`).

    ```
    [Unit]
    Description=An Ambiorix app about the cutest of cats

    [Service]
    ExecStart=cd /path/to/app && /usr/bin/Rscript --no-save --slave -f app.R
    Restart=on-abnormal
    Type=simple

    [Install]
    WantedBy=multi-user.target
    ```

1. Reload systemd to recognize the new service:

    ```bash
    systemctl daemon-reload
    ```

1. Start the service and enable it to automatically start on boot:

    ```bash
    systemctl start cute-cats
    systemctl enable cute-cats
    ```

1. Check the service status to ensure it's running without any issues:

    ```bash
    systemctl status cute-cats
    ```
