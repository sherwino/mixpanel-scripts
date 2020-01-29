const parse = require("csv-parse");
const assert = require("assert");
const fs = require("fs");

const path = null;
const filepath = path ? path : "../../data/ebookUserHistory.csv";

fs.createReadStream(filepath)
  .on("error", () => {
    // handle error
  })

  .pipe(parse())
  .on("data", row => {
    // use row data
    console.log({ row });
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
