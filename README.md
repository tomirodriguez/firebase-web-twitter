WebTwitter
========================

<h1>Starting</h1>

First install the dependencias needed
<code>yarn install</code>

<h2>Setting .env variables</h2>

Create two files: .env.local and .env.test.local. Both files must contain the .env.example under the local section
<code>REACT_APP_API_KEY=demo-local</code>

<h2>Running the project</h2>

First of all, you should start firebase emulators:
<code>firebase emultaros:start --project "demo-local"</code>

Once they are up, you can then run:
<code>yarn start</code>