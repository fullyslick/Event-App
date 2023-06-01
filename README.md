# How To Run

1. Cd to `backend` folder
2. Install node modules
3. Add you **ORGANIZATION_ID** and **API_TOKEN** in [.env](https://github.com/fullyslick/Event-App/blob/master/backend/.env) file
4. Run server `npm server.js`
5. In new terminal cd to `frontend`
6. Install node modules
7. Start the app `npm start` or `yarn start`

# How To Run Without Backend

1. Switch to `frontend` branch
2. Cd to `frontend`
3. Install node modules
4. Edit file `config.json` in [/frontend/src/utils](https://github.com/fullyslick/Event-App/blob/frontend/frontend/src/utils/config.json).
   Add your **organization_id** and **api_token** from Eventbrite.

```json
{
  "ORGANIZATION_ID": "KEY_FROM_EVENTBRITE",
  "API_TOKEN": "TOKEN_FROM_EVENTBRITE"
}
```

5. Start the app `npm start` or `yarn start`

# Supported Node Versions

Tested on:

```
18.11.0
14.16.0
```
