var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/upload/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('Traitement du fichier !');
        modifDsio(newpath, function(err, data){
          res.writeHead(200,{
            'Content-Type': 'text/plain',
            'Content-Disposition': "attachment; filename="+data            
          });
          uploadFile(data,function(){
            console.log('upload terminé')
          })
        });
        
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(3210); 

function modifDsio(dsioFile, cb){
  let newFile = 'c:/upload/modified/dsio.txt';

  fs.readFile(dsioFile,'utf8', function (err, data){
    if(err) throw err;
    
    let content = data.replace(/\n/g,'\r');
    console.log('modifying file ....');
    fs.writeFileSync(newFile,content);
    console.log('file saved !');

    console.log('callback');
    cb(undefined,newFile)
    
  })
}

function uploadFile (sFile, cb){
  var f   = fs.createReadStream(sFile);
  var request = http.get('http://localhost:3210/', function(err,res){
    res.pipe(f)
    f.on('finish', function(){
      f.close(cb)
    })
  })  
}