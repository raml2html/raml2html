FROM node:onbuild
RUN mkdir -p /data
VOLUME /data
WORKDIR /data
ENV PATH /usr/src/app/bin:$PATH
ENTRYPOINT ["/usr/src/app/bin/raml2html"]
CMD ["--help"]
