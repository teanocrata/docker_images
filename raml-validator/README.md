# Supported tags and respective `Dockerfile` links
*   [`latest`](https://github.com/teanocrata/docker_images/blob/master/raml-validator/Dockerfile) Current development

This image is updated via [commits and releases to the `teanocrata/docker_images` GitHub repo](https://github.com/teanocrata/docker_images).

# What is teanocrata/raml-validator?

Validates RAML files within a directory recursively.

# How to use this image

For launching RAML validation over current folder do:
```
docker run -v $(pwd):/home/code teanocrata/raml-validator
```


## Run a console in the container

```console
$ docker exec -ti teanocrata/raml-validator sh
```

# User Feedback

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/teanocrata/docker_images/issues).

## Contributing

You are invited to contribute new features, fixes, or updates, large or small; we are always thrilled to receive pull requests, and do our best to process them as fast as we can.

Before you start to code, we recommend discussing your plans through a [GitHub issue](https://github.com/teanocrata/docker_images/issues), especially for more ambitious contributions. This gives other contributors a chance to point you in the right direction, give you feedback on your design, and help you find out if someone else is working on the same thing.
