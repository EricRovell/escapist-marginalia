FROM node:alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /usr/app
WORKDIR /usr/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i -r
RUN pnpm i -r
RUN pnpm build
RUN LANG=ru pnpm build

FROM nginx:alpine AS runtime

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/packages/escapist-marginalia/dist /usr/share/nginx/html/en
COPY --from=build /usr/app/packages/escapist-marginalia/dist-ru /usr/share/nginx/html/ru

EXPOSE 80
