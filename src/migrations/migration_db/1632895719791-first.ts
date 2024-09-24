import { getDb } from '../utils/db';

export const up = async () => {
   const db = await getDb();
   /*
       Code you downgrade script here!
    */

   // Create "clients" collection and insert one item.
   await db.createCollection("clients", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["revision", "legalName", "shortName", "region"],
            properties: {
               revision: {
                  bsonType: "number",
                  description: "must be a number and is required"
               },
               legalName: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               shortName: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               region: {
                  enum: ["region1_test", "region2_test", "region3_test"],
                  description: "can only be one of the enum values"
               }
            }
         }
      }
   });

   const clients = db.collection("clients");
   const client_item = {
      "revision": 1,
      "legalName": "Riley Murphy_test",
      "shortName": "x-group_test",
      "region": "region1_test"
   }

   await clients.insertOne(client_item)
      .then(result => console.log(`Successfully inserted "clients" item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`));


   // Create "roletypes" collection and insert one item.
   await db.createCollection("roletypes", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["revision", "name", "permissions"],
            properties: {
               revision: {
                  bsonType: "number",
                  description: "must be a number and is required"
               },
               name: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               permissions: {
                  enum: ["permission1_test", "permission2_test", "permission3_test"],
                  description: "can only be one of the enum values"
               }
            }
         }
      },
   });

   const roletypes = db.collection("roletypes");
   const roletype_item = {
      "revision": 1,
      "name": "rolename_test",
      "permissions": "permission3_test"
   }

   await roletypes.insertOne(roletype_item)
      .then(result => console.log(`Successfully inserted "roletypes" item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`));


   // Create "users" collection and insert one item.
   await db.createCollection("users", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["revision", "enabled", "firstName", "lastName", "phone", "email"],
            properties: {
               revision: {
                  bsonType: "number",
                  description: "must be a number and is required"
               },
               enabled: {
                  bsonType: "bool",
                  description: "must be a bool and is required"
               },
               firstName: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               lastName: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               phone: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               email: {
                  bsonType: "string",
                  pattern: "@*\.com$",
                  description: "must be a string and is required"
               }
            }
         }
      },
   });

   const users = db.collection("users");
   const user_item = {
      "revision": 1,
      "enabled": true,
      "firstName": "mike_test",
      "lastName": "brown_test",
      "phone": "+1823949292_test",
      "email": "mmm_test@outlook.com",
   }

   await users.insertOne(user_item)
      .then(result => console.log(`Successfully inserted "users" item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`));


   // Create "keypairs" collection and insert one item.
   await db.createCollection("keypairs", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["publicKey", "envPrivateKey"],
            properties: {
               publicKey: {
                  bsonType: "binData",
                  description: "must be a binData and is required"
               },
               envPrivateKey: {
                  bsonType: "binData",
                  description: "must be a binData and is required"
               }
            }
         }
      },
   });

   // Create "roles" collection.
   await db.createCollection("roles", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: ["jobTitle", "permissions"],
            properties: {
               jobTitle: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
               permissions: {
                  bsonType: "string",
                  description: "must be a string and is required"
               },
            }
         }
      },
   });

   // Create "tasks" collection.
   await db.createCollection("tasks", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               activityType: {
                  bsonType: "string",
                  description: "must be a string"
               },
               title: {
                  bsonType: "string",
                  description: "must be a string"
               },
               description: {
                  bsonType: "string",
                  description: "must be a string"
               },
               date: {
                  bsonType: "date",
                  description: "must be a date"
               },
               duration: {
                  bsonType: "number",
                  description: "must be a number"
               },
               complete: {
                  bsonType: "bool",
                  description: "must be a bool"
               },
            }
         }
      },
   });

   // Create "projects" collection.
   await db.createCollection("projects", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               revision: {
                  bsonType: "number",
                  description: "must be a number"
               },
               name: {
                  bsonType: "string",
                  description: "must be a string"
               },
               status: {
                  bsonType: "string",
                  description: "must be a string"
               },
            }
         }
      },
   });

   // Create "authorisations" collection.
   await db.createCollection("authorisations", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               sigUserName: {
                  bsonType: "string",
                  description: "must be a string"
               },
               sigJobTitle: {
                  bsonType: "string",
                  description: "must be a string"
               },
               sigCompanyLegalName: {
                  bsonType: "string",
                  description: "must be a string"
               },
               sigDate: {
                  bsonType: "date",
                  description: "must be a date"
               },
               authUntil: {
                  bsonType: "date",
                  description: "must be a date"
               },
               authNetblocks: {
                  bsonType: "array",
                  description: "must be a array"
               },
               authDomains: {
                  bsonType: "array",
                  description: "must be a array"
               },
               authOther: {
                  bsonType: "array",
                  description: "must be a array"
               },
            }
         }
      },
   });

   // Create "attachments" collection.
   await db.createCollection("attachments", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               type: {
                  bsonType: "string",
                  description: "must be a string"
               },
               encContent: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
            }
         }
      },
   });

   // Create "versions" collection.
   await db.createCollection("versions", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               versionNumber: {
                  bsonType: "number",
                  description: "must be a number"
               },
               date: {
                  bsonType: "date",
                  description: "must be a date"
               },
            }
         }
      },
   });

   // Create "findings" collection.
   await db.createCollection("findings", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               revision: {
                  bsonType: "number",
                  description: "must be a number"
               },
               severity: {
                  bsonType: "array",
                  description: "must be a array"
               },
               cvssScore: {
                  bsonType: "number",
                  description: "must be a number"
               },
               encTitle: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
               encSummary: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
               encBackground: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
               encRecommendation: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
               encFurtherReading: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
               encInternalNote: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
               copyOnWrite: {
                  bsonType: "bool",
                  description: "must be a bool"
               },
            }
         }
      },
   });

   // Create "issues" collection.
   await db.createCollection("issues", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               encTitle: {
                  bsonType: "number",
                  description: "must be a number"
               },
               encDescription: {
                  bsonType: "array",
                  description: "must be a array"
               },
               resolved: {
                  bsonType: "bool",
                  description: "must be a bool"
               },
            }
         }
      },
   });

   // Create "comments" collection.
   await db.createCollection("comments", {
      validator: {
         $jsonSchema: {
            bsonType: "object",
            required: [""],
            properties: {
               encText: {
                  bsonType: "binData",
                  description: "must be a binData"
               },
            }
         }
      },
   });

   console.log('up ----- finished');

};

export const down = async () => {
   const db = await getDb();
   /*
       Code you downgrade script here!
    */

   // rollback created collections
   const comments = db.collection("comments");
   await comments.drop();

   const issues = db.collection("issues");
   await issues.drop();

   const findings = db.collection("findings");
   await findings.drop();

   const versions = db.collection("versions");
   await versions.drop();

   const attachments = db.collection("attachments");
   await attachments.drop();

   const authorisations = db.collection("authorisations");
   await authorisations.drop();

   const projects = db.collection("projects");
   await projects.drop();

   const tasks = db.collection("tasks");
   await tasks.drop();

   const roles = db.collection("roles");
   await roles.drop();

   const keypairs = db.collection("keypairs");
   await keypairs.drop();

   const users = db.collection("users");
   await users.drop();

   const roletypes = db.collection("roletypes");
   await roletypes.drop();

   const clients = db.collection("clients");
   await clients.drop();

   console.log('down ----- finished');

};
