export let checkVideos = function (req:any) {
  let availableResolutions = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ];
  class Messages {
    "message": string;
    "field": string;
  }
  let arr: any = [];
  let errors = {"errorsMessages" : arr};

  if (req.body.title.length > 40) {
    let err1 = new Messages;
    err1.message = "Title too long!";
    err1.field = req.body.title;
    errors.errorsMessages.push(err1);
  } else if (req.body.title.length == 0) {
    let err2 = new Messages;
    err2.message = "Title should not be empty!";
    err2.field = req.body.title;
    errors.errorsMessages.push(err2);
  }

  if (typeof req.body.title != 'string') {
    let err3 = new Messages;
    err3.message = "Title must be string!";
    err3.field = req.body.title;
    errors.errorsMessages.push(err3);
  }

  if (req.body.author.length > 40) {
    let err4 = new Messages;
    err4.message = "Author too long!";
    err4.field = req.body.author;
    errors.errorsMessages.push(err4);
  } else if (req.body.author.length == 0) {
    let err5 = new Messages;
    err5.message = "Author should not be empty!";
    err5.field = req.body.author;
    errors.errorsMessages.push(err5);
  }

  if (typeof req.body.author != 'string') {
    let err6 = new Messages;
    err6.message = "Author must be string!";
    err6.field = req.body.author;
    errors.errorsMessages.push(err6);
  }

  if (req.body.availableResolutions.length == 0) {
    let err7 = new Messages;
    err7.message = "No avaliable resolutions!";
    err7.field = req.body.availableResolutions;
    errors.errorsMessages.push(err7);
  }

  if (!(req.body.availableResolutions.every((i: string) => availableResolutions.includes(i)))) {
    let err8 = new Messages;
    err8.message = "No match resolutions!";
    err8.field = `${req.body.availableResolutions} not exist! Avaliable resolutions ${availableResolutions}`;
    errors.errorsMessages.push(err8);
  }

  if(req.body.canBeDownloaded){
    if (typeof req.body.canBeDownloaded != 'boolean'){
      let err9 = new Messages;
      err9.message = "Avaliable 'true' or 'false'!";
      err9.field = req.body.canBeDownloaded;
      errors.errorsMessages.push(err9);
    }
  }

  if(req.body.minAgeRestriction){
    if (req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18){
      let err10 = new Messages;
      err10.message = "must be between 1 and 18";
      err10.field = req.body.minAgeRestriction;
      errors.errorsMessages.push(err10);
    }
  }

  if(req.body.publicationDate){
    if (typeof req.body.publicationDate != typeof new Date().toDateString()){
      let err11 = new Messages;
      err11.message = "Date not exist";
      err11.field = req.body.publicationDate;
      errors.errorsMessages.push(err11);
    }
  }

  
  
  return {errors: errors, check: errors.errorsMessages.length == 0};
}  
