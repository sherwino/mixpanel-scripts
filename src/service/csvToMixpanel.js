const parse = require("csv-parse");
const assert = require("assert");
const fs = require("fs");

const path = null;
const filepath = path ? path : "../../data/ebookUserHistory.csv";

fs.createReadStream(filepath)
  .on("error", err => {
    // handle error
    console.log("Error", err);
  })

  .pipe(
    parse({
      trim: true,
      skip_empty_lines: true
    })
  )
  .on("data", row => {
    // If no header we will have to map using idx
    // TODO: Confirm that the data is mapped corrected because we don't have headers
    const currentObj = {
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

    console.log(obj);
  })

  .on("end", () => {
    // handle end of CSV
  });

// const output = []
// parse(`
//   "1","2","3"
//   "a","b","c"
// `, {
//   trim: true,
//   skip_empty_lines: true
// })
// // Use the readable stream api
// .on('readable', function(){
//   let record
//   while (record = this.read()) {
//     output.push(record)
//   }
// })
// // When we are done, test that the parsed output matched what expected
// .on('end', function(){
//   assert.deepEqual(
//     output,
//     [
//       [ '1','2','3' ],
//       [ 'a','b','c' ]
//     ]
//   )
// })

// const parser = parse({
//   delimiter: ':'
// }, function(err, records){
//   assert.deepEqual(
//     records,
//     [
//       [ 'root','x','0','0','root','/root','/bin/bash' ],
//       [ 'someone','x','1022','1022','','/home/someone','/bin/bash' ]
//     ]
//   )
// })
// // Write data to the stream
// parser.write("root:x:0:0:root:/root:/bin/bash\n")
// parser.write("someone:x:1022:1022::/home/someone:/bin/bash\n")
// // Close the readable stream
// parser.end()
