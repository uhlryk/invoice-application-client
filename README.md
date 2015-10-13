# invoice-application client

REST API of application which manages invoices and contractors.
It is client Application for https://github.com/uhlryk/invoice-application.

Application was prepared to manage Polish invoices.

## Features:
Add, list, edit, delete, show contractors
Edit contractors create new entry for contractor
Delete contractors.
Add, list, show invoices
Generate pdf of invoice

## Limitations:
Only one company data to 'from' field. Purpose of this application is to help one company to manage invoices. It is not saas application!
In this version it is not posible to create invoice correction. Application

## Warning:
Im not domain expert about invoices. They may be wrong.

## Running Locally

Make sure you have node.js and installed. Before this application run https://github.com/uhlryk/invoice-application.

```
git clone https://github.com/uhlryk/invoice-application-client.git
cd invoice-application-client
npm install
bower install
```

duplicate project/scripts/config-template.js and rename it to config.js
Edit config.js and fill your data.
```
npm start
```

Your app should now be running on [localhost:3000](http://localhost:xxxx/) - xxxx your port setup.

## License
MIT