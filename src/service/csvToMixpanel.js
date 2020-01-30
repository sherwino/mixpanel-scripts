const parse = require("csv-parse");
const fs = require("fs");
const Mixpanel = require("mixpanel");
const Bottleneck = require("bottleneck");
require("dotenv").config({ path: "../../.env" });

const { MIXPANEL_TOKEN, MIXPANEL_KEY } = process.env;

// initialize mixpanel client configured to communicate over https
const mixpanel = Mixpanel.init(MIXPANEL_TOKEN, {
  protocol: "https",
  key: MIXPANEL_KEY
});

const limiter = new Bottleneck({
  maxConcurrent: 2,
  minTime: 333
});

const mixPanelInitialized = mixpanel && mixpanel.config.key;

const path = null;
let megaObj = [];
let stagingObj = [];

const filepath = path ? path : "../../data/ebookUserHistory.csv";

const read = fs.createReadStream(filepath);
read
  .on("error", err => {
    // handle error
    read.unpipe();
    console.log("Error importing to MixPanel", err);
    read.destroy(err);
    process.exit(1);
  })
  .pipe(
    parse({
      trim: true,
      skip_empty_lines: true,
      skip_lines_with_error: true
    })
  )
  .on("data", row => {
    // If no header we will have to map using idx
    // TODO: Confirm that the data is mapped corrected because we don't have headers
    const currentObj = {
      distinct_id: row[2],
      ID: row[0],
      EbookUUID: row[1],
      UserUUID: row[2],
      ChapterUUID: row[3],
      PageId: row[4],
      ParagraphLastRead: row[5],
      Action: row[6],
      Link: row[7],
      DateCreated: row[8],
      Longitute: row[9],
      ipAddress: row[10],
      platform: row[11],
      language: row[12],
      userReceivedUUID: row[13],
      userSentUUID: row[14]
    };

    process.stdout.write(`...reading row:${currentObj.ID} \r`);

    megaObj.push({
      event: "ebook events",
      properties: {
        time: new Date(2020, 1, 10, 12, 34, 56),
        ...currentObj
      }
    });
  })

  .on("end", () => {
    // handle end of CSV
    console.log("finished creating obj, here is objSample", {
      sample: megaObj[5],
      length: megaObj.length
    });

    for (let i = 0; i < megaObj.length; i++) {
      stagingObj.push(megaObj[i]);

      if (stagingObj.length % 50 === 0) {
        const arrayOfEvents = stagingObj;
        if (mixPanelInitialized) {
          limiter
            .schedule(() => {
              mixpanel.import_batch(arrayOfEvents);
              process.stdout.write(`Sending: ${arrayOfEvents[0].ID} \r`);
            })
            .then(result => {
              /* handle result */
              process.stdout.write(`Submitted ${i} of ${megaObj.length} \r`);
            })
            .catch(err => {
              console.log("Error importing to MixPanel", err);
              read.unpipe();
              read.destroy(err);
              process.exit(1);
            });
        }
        stagingObj = [];
      }
    }
  })
  .on("error", err => {
    // handle error
    read.unpipe();
    console.log("Error importing to MixPanel", err);
    read.destroy(err);
    process.exit(1);
  })
  .on("close", err => {
    read.unpipe();
    console.log("Stream has been destroyed and file has been closed");
  });
