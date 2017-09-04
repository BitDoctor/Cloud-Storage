## Installation
Open your command prompt/ terminal and Navigate to the directory in which you want to create your NodeJS server. Then type:
```
npm init
```
and complete the initial setup. After that install the following:
Mongoose library for communicating with MongoDB
```
npm install mongoose
```
Express library for routing HTML pages and forms
```
npm install express
```
Body-Parser for accepting forms and files
```
npm install body-parser
```
Download GridFS driver library to store files in MongoDB. click [here](https://www.npmjs.com/package/gridfs-stream "gridfs-stream sample codes") for more details.
```
npm install gridfs-stream
```
Additionally, you will need to install a library that can handle large file transfers between the client's browser and the server. This is solved by upload/download streams.  
Use a file streaming library that you are comfortable with.

## Setup
Create a simple webpage with a form that accepts files. Then upload the file via POST with encoding as multipart-formdata.
Use read and write streams to directly store the uploaded file into MongoDB via GridFS. Similarly, do it for downloading a file as well.
