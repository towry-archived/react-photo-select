var path = require('path');
var fs = require('fs');
var stream = require('stream');

var tasks = [
  "build assets", 
];

var Task = {};
Task[tasks[0]] = function (i) {
  console.log("Running task[" + i + "]: " + tasks[i]);

  var cwd = process.cwd();
  var images = path.join(cwd, "assets/images");

  var files = fs.readdirSync(images);
  var result = [];
  if (!files || !files.length) {
    return;
  };

  var validFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];

  files.forEach(function (file, i) {
    if (validFileTypes.indexOf(path.extname(file).toLowerCase()) === -1) {
      return;
    }

    result.push({
      url: 'assets/images/' + file,
      alt: '',
      title: ''
    });
  });

  var s = new stream.Readable();

  s.on('error', function (err) {
    console.error(err);
  });

  s._read = function () {};
  s.push(JSON.stringify(result));
  s.push(null);

  var wd = fs.createWriteStream(path.join(images, 'data.json'));
  wd.on('finish', function () {
    console.log(">> task[" + i + "] done");
  });
  
  s.pipe(wd);
}


/// Running task
tasks.forEach(function (task, i) {
  Task[task].call(null, i);
});
