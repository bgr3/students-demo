export let checkVideos = function (body:any) {
  let availableResolutions = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ];
  class Messages {
    message: string | undefined;
    field: string | undefined;
  }
  let arr: any = [];
  let errors = {"errorsMessages" : arr};

  if (body.title ? body.title.trim() : null){
    if (body.title.trim().length > 40) {
      let err1 = new Messages;
      err1.message = "Title too long!";
      err1.field = "title";
      errors.errorsMessages.push(err1);
    } else if (body.title.trim().length == 0) {
      let err2 = new Messages;
      err2.message = "Title should not be empty!";
      err2.field = "title";
      errors.errorsMessages.push(err2);
    }

    if (typeof body.title != 'string') {
      let err3 = new Messages;
      err3.message = "Title must be string!";
      err3.field = "title";
      errors.errorsMessages.push(err3);
    }  
  } else {
    let err1 = new Messages;
    err1.message = "Title should not be empty!";
    err1.field = "title";
    errors.errorsMessages.push(err1);
  }

  if (body.author ? body.author.trim() : null){
    if (body.author.trim().length > 20) {
      let err4 = new Messages;
      err4.message = "Author too long!";
      err4.field = "author";
      errors.errorsMessages.push(err4);
    } else if (body.author.trim().length == 0) {
      let err5 = new Messages;
      err5.message = "Author should not be empty!";
      err5.field = "author";
      errors.errorsMessages.push(err5);
    }

    if (typeof body.author != 'string') {
      let err6 = new Messages;
      err6.message = "Author must be string!";
      err6.field = "author";
      errors.errorsMessages.push(err6);
    }  
  } else {
    let err4 = new Messages;
    err4.message = "Author should not be empty!";
    err4.field = "author";
    errors.errorsMessages.push(err4);
  }
  
  if (body.availableResolutions.length == 0) {
    let err7 = new Messages;
    err7.message = "No avaliable resolutions!";
    err7.field = "availableResolutions";
    errors.errorsMessages.push(err7);
  }

  if (!(body.availableResolutions.every((i: string) => availableResolutions.includes(i)))) {
    let err8 = new Messages;
    err8.message = "No match resolutions!";
    err8.field = "availableResolutions";
    errors.errorsMessages.push(err8);
  }

  if(body.canBeDownloaded){
    if (typeof body.canBeDownloaded != 'boolean'){
      let err9 = new Messages;
      err9.message = "Avaliable 'true' or 'false'!";
      err9.field = "canBeDownloaded";
      errors.errorsMessages.push(err9);
    }
  }

  if(body.minAgeRestriction){
    if (body.minAgeRestriction < 1 || body.minAgeRestriction > 18){
      let err10 = new Messages;
      err10.message = "must be between 1 and 18";
      err10.field = "minAgeRestriction";
      errors.errorsMessages.push(err10);
    }
  }

  if(body.publicationDate){
    if (typeof body.publicationDate != typeof new Date().toDateString()){
      let err11 = new Messages;
      err11.message = "Date not exist";
      err11.field = "publicationDate";
      errors.errorsMessages.push(err11);
    }
  }

  
  
  return {errors: errors, check: errors.errorsMessages.length == 0};
}  
