// /*
//  * Copyright 2022 Google Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// const express = require("express");
// const fs = require("fs");
// require("dotenv").config();

// const path = require("path");
// const bodyParser = require("body-parser");
// const { GoogleAuth } = require("google-auth-library");
// const jwt = require("jsonwebtoken");

// // TODO: Define Issuer ID
// const issuerId = "3388000000022290612";

// // TODO: Define Class ID
// const classId = `${issuerId}.giftcard_class`;

// const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
// const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// if (!credentialsPath) {
//   console.error("GOOGLE_APPLICATION_CREDENTIALS is not defined");
//   process.exit(1);
// }

// const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

// const httpClient = new GoogleAuth({
//   credentials: credentials,
//   scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
// });

// async function createPassClass(req, res) {
//   // TODO: Create a Generic pass class
//   let genericClass = {
//     id: `${classId}`,
//     classTemplateInfo: {
//       cardTemplateOverride: {
//         cardRowTemplateInfos: [
//           {
//             twoItems: {
//               startItem: {
//                 firstValue: {
//                   fields: [
//                     {
//                       fieldPath: 'object.textModulesData["points"]',
//                     },
//                   ],
//                 },
//               },
//               endItem: {
//                 firstValue: {
//                   fields: [
//                     {
//                       fieldPath: 'object.textModulesData["contacts"]',
//                     },
//                   ],
//                 },
//               },
//             },
//           },
//         ],
//       },
//       detailsTemplateOverride: {
//         detailsItemInfos: [
//           {
//             item: {
//               firstValue: {
//                 fields: [
//                   {
//                     fieldPath: 'class.imageModulesData["event_banner"]',
//                   },
//                 ],
//               },
//             },
//           },
//           {
//             item: {
//               firstValue: {
//                 fields: [
//                   {
//                     fieldPath: 'class.textModulesData["game_overview"]',
//                   },
//                 ],
//               },
//             },
//           },
//           {
//             item: {
//               firstValue: {
//                 fields: [
//                   {
//                     fieldPath: 'class.linksModuleData.uris["official_site"]',
//                   },
//                 ],
//               },
//             },
//           },
//         ],
//       },
//     },
//     imageModulesData: [
//       {
//         mainImage: {
//           sourceUri: {
//             uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-2021-card.png",
//           },
//           contentDescription: {
//             defaultValue: {
//               language: "en-US",
//               value: "Google I/O 2022 Banner",
//             },
//           },
//         },
//         id: "event_banner",
//       },
//     ],
//     textModulesData: [
//       {
//         header: "Gather points meeting new people at Google I/O",
//         body: "Join the game and accumulate points in this badge by meeting other attendees in the event.",
//         id: "game_overview",
//       },
//     ],
//     linksModuleData: {
//       uris: [
//         {
//           uri: "https://io.google/2022/",
//           description: "Official I/O '22 Site",
//           id: "official_site",
//         },
//       ],
//     },
//   };

//   let response;
//   try {
//     // Check if the class exists already
//     response = await httpClient.request({
//       url: `${baseUrl}/genericClass/${classId}`,
//       method: "GET",
//     });

//     console.log("Class already exists");
//     console.log(response);
//   } catch (err) {
//     if (err.response && err.response.status === 404) {
//       // Class does not exist
//       // Create it now
//       response = await httpClient.request({
//         url: `${baseUrl}/genericClass`,
//         method: "POST",
//         data: genericClass,
//       });

//       console.log("Class insert response");
//       console.log(response);
//     } else {
//       // Something else went wrong
//       console.log(err);
//       res.send("Something went wrong...check the console logs!");
//     }
//   }
// }

// async function createPassObject(req, res) {
//   // TODO: Create a new Generic pass for the user
//   try {
//     let objectSuffix = `${req.body.email.replace(/[^\w.-]/g, "_")}`;
//     let objectId = `${issuerId}.${objectSuffix}`;

//     let genericObject = {
//       id: `${objectId}`,
//       classId: classId,
//       genericType: "GENERIC_TYPE_UNSPECIFIED",
//       hexBackgroundColor: "#4285f4",
//       logo: {
//         sourceUri: {
//           uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3SZCYoH999_HS0BkJKLkR9qW0EAXjZmbWJWjj4C7s5hZrcL1Yjo4ZwGxbbEtP780tcg&usqp=CAU",
//         },
//       },
//       cardTitle: {
//         defaultValue: {
//           language: "en",
//           value: "Google I/O '22",
//         },
//       },
//       subheader: {
//         defaultValue: {
//           language: "en",
//           value: "Attendee",
//         },
//       },
//       header: {
//         defaultValue: {
//           language: "en",
//           value: "Atish Jadhav",
//         },
//       },
//       barcode: {
//         type: "QR_CODE",
//         value: `${objectId}`,
//       },
//       heroImage: {
//         sourceUri: {
//           uri: "https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg",
//         },
//       },
//       textModulesData: [
//         {
//           header: "POINTS",
//           body: "1234",
//           id: "points",
//         },
//         {
//           header: "CONTACTS",
//           body: "20",
//           id: "contacts",
//         },
//       ],
//     };

//     // TODO: Create the signed JWT and link
//     const claims = {
//       iss: process.env.client_email,
//       aud: "google",
//       origins: [],
//       typ: "savetowallet",
//       payload: {
//         genericObjects: [genericObject],
//       },
//     };

//     const token = jwt.sign(claims, process.env.private_key);
//     const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

//     // Send the response
//     // res.send("Form submitted!");

//     res.send(`<a href='${saveUrl}'><img src='wallet-button.png'></a>`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// }

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.post("/", async (req, res) => {
//   await createPassClass(req, res);
//   await createPassObject(req, res);
// });
// app.listen(7000);

/*
 * Copyright 2022 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require("express");
const fs = require("fs");
require("dotenv").config();

const path = require("path");
const bodyParser = require("body-parser");
const { GoogleAuth } = require("google-auth-library");
const jwt = require("jsonwebtoken");

// TODO: Define Issuer ID
const issuerId = "3388000000022290612";

// TODO: Define Class ID
const classId = `${issuerId}.giftcard_class`;

const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credentialsPath) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS is not defined");
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

async function createPassClass(req, res) {
  // TODO: Create a Gift Card pass class
  let giftCardClass = {
    id: `${classId}`,
    issuerName: "Atish Jadhav", // Add your issuer name here
    reviewStatus: 'underReview', // Set the review status accordingly
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          {
            twoItems: {
              startItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: 'object.textModulesData["balance"]',
                    },
                  ],
                },
              },
              endItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: 'object.textModulesData["expiry_date"]',
                    },
                  ],
                },
              },
            },
          },
        ],
      },
      detailsTemplateOverride: {
        detailsItemInfos: [
          {
            item: {
              firstValue: {
                fields: [
                  {
                    fieldPath: 'class.imageModulesData["gift_card_image"]',
                  },
                ],
              },
            },
          },
          {
            item: {
              firstValue: {
                fields: [
                  {
                    fieldPath: 'class.textModulesData["terms_and_conditions"]',
                  },
                ],
              },
            },
          },
        ],
      },
    },
    imageModulesData: [
      {
        mainImage: {
          sourceUri: {
            uri: 'https://developers.google.com/static/wallet/images/passes/branding/gift-card.png',
          },
          contentDescription: {
            defaultValue: {
              language: 'en-US',
              value: 'Gift Card Image',
            },
          },
        },
        id: 'gift_card_image',
      },
    ],
    textModulesData: [
      {
        header: 'Balance',
        body: '$50',
        id: 'balance',
      },
      {
        header: 'Expiry Date',
        body: '2024-12-31',
        id: 'expiry_date',
      },
      {
        header: 'Terms and Conditions',
        body: 'Some terms and conditions apply.',
        id: 'terms_and_conditions',
      },
    ],
  };
  

  let response;
  try {
    // Check if the class exists already
    response = await httpClient.request({
      url: `${baseUrl}/giftCardClass/${classId}`,
      method: 'GET',
    });

    console.log('Class already exists');
    console.log(response);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      // Class does not exist
      // Create it now
      response = await httpClient.request({
        url: `${baseUrl}/giftCardClass`,
        method: 'POST',
        data: giftCardClass,
      });

      console.log('Class insert response');
      console.log(response);
    } else {
      // Something else went wrong
      console.log(err);
      res.send('Something went wrong...check the console logs!');
    }
  }
}

async function createPassObject(req, res) {
  // TODO: Create a new Gift Card pass for the user
  try {
    let objectSuffix = `${req.body.email.replace(/[^\w.-]/g, "_")}`;
    let objectId = `${issuerId}.${objectSuffix}`;

    let giftCardObject = {
      id: `${objectId}`,
      classId: classId,
      genericType: 'GIFT_CARD',
      hexBackgroundColor: '#4285f4',
      logo: {
        sourceUri: {
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3SZCYoH999_HS0BkJKLkR9qW0EAXjZmbWJWjj4C7s5hZrcL1Yjo4ZwGxbbEtP780tcg&usqp=CAU', // Replace with the actual logo URL
        },
      },
      cardTitle: {
        defaultValue: {
          language: 'en',
          value: 'My Gift Card',
        },
      },
      subheader: {
        defaultValue: {
          language: 'en',
          value: 'Recipient',
        },
      },
      header: {
        defaultValue: {
          language: 'en',
          value: 'Atish Jadhav',
        },
      },
      barcode: {
        type: 'QR_CODE',
        value: `${objectId}`,
      },
      heroImage: {
        sourceUri: {
          uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg', // Replace with the actual hero image URL
        },
      },
      textModulesData: [
        {
          header: 'Balance',
          body: '$50', // Replace with the actual balance
          id: 'balance',
        },
        {
          header: 'Expiry Date',
          body: '2024-12-31', // Replace with the actual expiry date
          id: 'expiry_date',
        },
        {
          header: 'Terms and Conditions',
          body: 'Some terms and conditions apply.', // Replace with the actual terms and conditions
          id: 'terms_and_conditions',
        },
      ],
    };

    // TODO: Create the signed JWT and link
    const claims = {
      iss: process.env.client_email,
      aud: 'google',
      origins: [],
      typ: 'savetowallet',
      payload: {
        genericObjects: [giftCardObject],
      },
    };

    const token = jwt.sign(claims, process.env.private_key);
    const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

    // Send the response
    res.send(`<a href='${saveUrl}'><img src='wallet-button.png'></a>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.post('/', async (req, res) => {
  await createPassClass(req, res);
  await createPassObject(req, res);
});
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});

