const express =require('express');
const path =require('path');
const app= express();
const fs = require('node:fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
 app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
      res.render('index',{files:files});
    });
 });
 app.post('/create', (req, res) => {
   const { title, text } = req.body; 
   let fn= './files/'+title.replaceAll(' ','')+'.txt';
   fs.writeFile(fn, text, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
   res.redirect('/');
   });
app.get('/files/:filename',(req,res)=>{
   fs.readFile(`./files/${req.params.filename}`,'utf8',(err,data)=>{
      if (err) {
         return res.status(500).send('Error reading file.');
      }
      console.log(data);
      res.render('show', { filename: req.params.filename, data: data });
   });
});
app.listen(5000);