# Setup

Sets up replica instances of mongodb locally

## Prerequisites

Make sure you have mongoDB version >=3.2 installed 

### Steps for Windows

1. Creating 3 directories in C:\data
```
mkdir \data\rs1 \data\rs2 \data\rs3
```
2. Start 3 mongod instances in C:\ with name “cloud” (do this in 3 different cmd windows)
```
start mongod --replSet cloud --logpath \data\rs1\1.log --dbpath \data\rs1 --port 27017
```
```
start mongod --replSet cloud --logpath \data\rs2\2.log --dbpath \data\rs2 --port 27018
```
```
start mongod --replSet cloud --logpath \data\rs3\3.log --dbpath \data\rs3 --port 27019
```

3. interconnect all 3 servers via config, but first, go to first cmd window and type:
```
mongo --port 27017
```

4. then paste this:
```
config = {_id:"cloud", members: [
{"_id" : 1, "host" : "localhost:27017"},
{"_id" : 2, "host" : "localhost:27018"},
{"_id" : 3, "host" : "localhost:27019"}]
};
```

5. finalize the configuration with:
```
rs.initiate(config);
```
6. run this to find the primary server and see the status of the election:
```
rs.status();
```
