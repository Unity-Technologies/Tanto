

1. Web server
NGINX

2. Application server

nodejs - v.6.9.1-v.7.0
npm
yarn


*Production environment*

1. Stop current node process with forever:

List current processes
`forever list`

There is only one node process should listed. Track his PID and stop the process:

`forever stop <PID>`

2. Pull source code update

`hg pull -u`

3. Install npm packages:

`yarn`

4. Enable environment variables file:

rename `.env.example` to `.env` and replace variables if needed.

5. Application uses Redis db to store session, if you can't connect to any Redis instance,
  please setup local one. Familiarize yourself with the installation guide http://redis.io/topics/quickstart.
  You might run it with `docker run -d -p 6379:6379 redis `

6. Application uses SLACK Web API to fetch user's avatars. Make sure you provide SLACK_TOKEN in `.env` file. To obtain slack token
for development and testing visit page https://api.slack.com/docs/oauth-test-tokens, login with your slack account
and issue your personal token following the instructions.

7. Build project
`yarn run build`

8. Run application
`yarn start`

The node process will be started on the port defined by node PORT environment variable, can be changed in package.json.

9. *[THIS step should be done only once]* Add NGINX config that proxy port 80 to node process port.

Example:

```
server {
    listen 80;
    server_name tanto.hq.unity3d.com;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         "http://127.0.0.1:8080";
    }
}
```

*Development environment*

1. Run development server:
`yarn run dev`

2. Run unit tests:
`yarn test`
