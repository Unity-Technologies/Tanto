

##### 1. Application server requirements

- nodejs version 6.9.1-v.7.0
- npm version >= 3.10.8
- yarn (npm install yarn -g)
- forever (npm install forever -g)
- nginx
- redis (local or remote)

Application uses Redis db to store session, if you can't connect to any Redis instance, please setup local one. Familiarize yourself with the installation guide http://redis.io/topics/quickstart.

You might run it with `docker run -d -p 6379:6379 redis `

##### 2. Enable environment variables file:
Rename/copy file  `.env.example` to `.env` and provide variables if needed.

- provide ***REDIS_HOST, REDIS_PORT*** if they differs from default ones

- application uses SLACK Web API to fetch user's avatars. Make sure you provide ***SLACK_TOKEN*** in `.env` file

To obtain slack token for development and testing visit page https://api.slack.com/docs/oauth-test-tokens, login with your slack account and issue your personal token following the instructions.

- Application authenticates user with Ono OAuth2 API and requires authentication API host and user info route

- Application exposes ONO GraphQL API and requires ***ONO_OAUTH_CLIENT_ID*** and ***ONO_OAUTH_SECRET_ID***


##### 3. Run/Restart application(production)

If node process is already run you can simply run

`yarn restart`

Check if process restarted correctly and there is no errors. Done.

But if node process is not running, do the following(or run npm command shortcuts from package.json):

`git checkout -f master`
`git pull`
`yarn`
`forever list`

There should be only one node process run with forever, stop it

`forever stop *process PID*`
`yarn run build`
`yarn start`

Forever docs:
https://github.com/foreverjs/forever

The node process will be started on the port defined by node PORT environment variable, can be changed in package.json.


##### 4. NGINX

*[THIS step should be done only once]* Add NGINX config that proxy port 80 to node process port. Make sure nginx listens correct port.

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

##### 5. Development environment

- Run development server:
`yarn run dev`

 - Run unit tests:
`yarn test`
