const Mixpanel = require("mixpanel");
require("dotenv").config({ path: "../../.env" });

const { MIXPANEL_TOKEN, MIXPANEL_KEY } = process.env;

console.log("process", { MIXPANEL_KEY, MIXPANEL_TOKEN });
// initialize mixpanel client configured to communicate over https
const mixpanel = Mixpanel.init(MIXPANEL_TOKEN, {
  protocol: "https",
  key: MIXPANEL_KEY
});

// // import an old event
// // var mixpanel_importer = Mixpanel.init('valid mixpanel token', {
// //     key: 'valid api key for project'

// needs to be in the system once for it to show up in the interface
// mixpanel.track("ebook user event", {
//   ID: "04660ef6-ba47-4477-9bf2-db21e6fdd444",
//   EbookUUID: "04660ef6-ba47-4477-9bf2-db21e6fdd444",
//   UserUUID: "6IyODdz5xmvNdmGunirr6a",
//   ChapterUUID: 2,
//   PageId: null,
//   ParagraphLastRead: 2,
//   Action: null,
//   Link: null,
//   DateCreated: (Date.now() / 1000) | 0,
//   Longitute: null,
//   ipAddress: "96.85.179.94",
//   platform: null,
//   language: null,
//   userReceivedUUID: null,
//   userSentUUID: null
// });

mixpanel.import("ebook user event", new Date(2020, 1, 11, 12, 34, 56), {
  ID: "04660ef6-ba47-4477-9bf2-db21e6fd7777",
  EbookUUID: "04660ef6-ba47-4477-9bf2-db21e6fd7777",
  UserUUID: "6IyODdz5xmvNdmGunirr6a",
  ChapterUUID: 2,
  PageId: null,
  ParagraphLastRead: 2,
  Action: null,
  Link: null,
  DateCreated: (Date.now() / 1000) | 0,
  Longitute: null,
  ipAddress: "96.85.179.94",
  platform: null,
  language: null,
  userReceivedUUID: null,
  userSentUUID: null
});

// import multiple events at once
// mixpanel.import_batch([
//   {
//     event: "old event",
//     properties: {
//       time: new Date(2012, 4, 20, 12, 34, 56),
//       distinct_id: "billybob",
//       gender: "male"
//     }
//   },
//   {
//     event: "another old event",
//     properties: {
//       time: new Date(2012, 4, 21, 11, 33, 55),
//       distinct_id: "billybob",
//       color: "red"
//     }
//   }
// ]);
