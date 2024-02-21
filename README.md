# Electric Vehicle Charging Station Management API

This REST API is designed for managing electric vehicle charging stations and their associated companies. It leverages NestJS, TypeScript, MongoDB, Mongoose, Docker, and Google Cloud Platform services including Cloud Build, Artifact Registry, and Cloud Run for deployment. The API is hosted and accessible at `https://ev-rest-api-nestjs-eaqg4v77ma-ew.a.run.app`.

## API Overview

The API supports various operations for both companies and charging stations, including CRUD operations and geospatial queries to find stations within a specific radius.

- I utilized MongoDB's [GeoJSON objects](https://www.mongodb.com/docs/manual/geospatial-queries/): geospatial queries to use MongoDB's $nearSphere feature for scalable and efficient distance-based searches, outperforming manual calculations with latitude and longitude fields. This method, ensures optimal API performance and scalability on larger datasets

- Indexes for Enhanced Performance:
  - `parentCompanyId` in the `companies` collection for faster subsidiary lookups.
  - `companyId` and a `2dsphere` index on the `location` GeoJSON object in the `stations` collection to improve query speed and efficiency.

### Companies Endpoints

#### (please use a tool like Postman for performing the operations, since we have no frontend in this application)

```
POST /companies
```

```js
// Request body example
{
  "name": "Company A",
  "parentCompanyId": null
}
```

```
GET /companies
```

```
GET /companies/:id
```

```
PUT /companies/:id
```

```js
// Request body example
{
  "name": "Company A Updated"
}
```

```
DELETE /companies/:id
```

### Charging Stations Endpoints

```
POST /stations
```

```js
// Request body example
{
  "name": "Station 1",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "companyId": "62b9f571e705fa8c6f22b9a1",
  "address": "123 Main St, New York, NY",
  "location" : {
        "type" : "Point",
        "coordinates" : [
           -74.0060,
            40.7128
        ]
    }
}
```

```
GET /stations
```

```
GET /stations/:id
```

```
PUT /stations/:id
```

```js
// Request body example
{
  "name": "Station 1 Updated",
  "latitude" 20.5,
  "longitude": 44,
  "location" : {
        "type" : "Point",
        "coordinates" : [
           44,
           20.5
        ]
    }
}
```

```
DELETE /stations/:id
```

### Geospatial Endpoint

```
GET /stations/search/:companyId?latitude=40&longitude=-70&radius=100
```

### Example interaction from Postman

https://github.com/lindsaycode05/ev-rest-api-nestjs/assets/88434441/ed624d64-749b-46ef-9266-d11bc74de7a2

---

### Running Tests

Execute `pnpm test` to run endpoint tests ensuring the API's functionality.

---

### Running the API Locally (not necessary since it's deployed to GCP)

1. Clone the repository.
2. Run `pnpm install` to install dependencies.
3. Decrypt the `.env` file:

```bash
openssl enc -d -aes-256-cbc -in .env.enc -out .env
```

When prompted, enter the master password `b54h45g4g4g4gefd`. (This should be stored securely in a cloud service ☁️ for production environments).
