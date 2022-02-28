# Belgic

Belgic is a reverse proxy and load balancer that will ease 
the deployment of an application on as well as improve
performances of said deployed applicatoin.

__Note that it also works for a shiny application__

It is to Ambiorix what shiny-server is to shiny.

:::caution

This implements a round robin, requests are redirected to whatever backend is next on the queue. This means you should not store any session-related data in the environment, use databases, cookies, parameters, etc. (as one should anyway). This only applies to ambiorx (multi-page) and should not affect shiny applications (single-page).

:::
