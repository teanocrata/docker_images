# Supported tags and respective `Dockerfile` links
*   [`latest`](https://github.com/teanocrata/docker_images/blob/master/atom/Dockerfile) Current development

This image is updated via [commits and releases to the `teanocrata/docker_images` GitHub repo](https://github.com/teanocrata/docker_images).

# What is teanocrata/atom?

Install and run the Atom editor from within a Docker container.

# How to use this image

First up, you'll need to allow docker containers to access your X server. To do this run:
```
xhost +
```

This allows *all* host access to the X server and thus isn't great for security. When you're done using tour containers, it's a good idea to revoke access with:
```
xhost -
```

Or you can allow local user “root” to connect to the X server
```
xhost local:root
```

To launch Atom do:
```
docker run -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY -v $(pwd):/development -d --name atom teanocrata/atom
```

This maps current folder to /development folder in the 'atom' container.

## Run a console in the container

```console
$ docker exec -ti atom bash
```

# User Feedback

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/teanocrata/docker_images/issues).

## Contributing

You are invited to contribute new features, fixes, or updates, large or small; we are always thrilled to receive pull requests, and do our best to process them as fast as we can.

Before you start to code, we recommend discussing your plans through a [GitHub issue](https://github.com/teanocrata/docker_images/issues), especially for more ambitious contributions. This gives other contributors a chance to point you in the right direction, give you feedback on your design, and help you find out if someone else is working on the same thing.
