export let checkBlogs = function (body:any) {
  
  class Messages {
    message: string | undefined;
    field: string | undefined;
  }
  let arr: any = [];
  let errors = {"errorsMessages" : arr};

  if (body.name ? body.name.trim() : null){
    if (body.name.trim().length > 15) {
      let err1 = new Messages;
      err1.message = "Name too long!";
      err1.field = "name";
      errors.errorsMessages.push(err1);
    } else if (body.name.trim().length == 0) {
      let err2 = new Messages;
      err2.message = "Name should not be empty!";
      err2.field = "name";
      errors.errorsMessages.push(err2);
    }

    if (typeof body.name != 'string') {
      let err3 = new Messages;
      err3.message = "name must be string!";
      err3.field = "name";
      errors.errorsMessages.push(err3);
    }  
  } else {
    let err2 = new Messages;
    err2.message = "Name should not be empty!";
    err2.field = "name";
    errors.errorsMessages.push(err2);
  }

  if (body.description ? body.description.trim() : null){
    if (body.description.trim().length > 500) {
      let err4 = new Messages;
      err4.message = "Description too long!";
      err4.field = "description";
      errors.errorsMessages.push(err4);
    } else if (body.description.trim().length == 0) {
      let err5 = new Messages;
      err5.message = "Description should not be empty!";
      err5.field = "description";
      errors.errorsMessages.push(err5);
    }

    if (typeof body.description != 'string') {
      let err6 = new Messages;
      err6.message = "Description must be string!";
      err6.field = "description";
      errors.errorsMessages.push(err6);
    }  
  } else {
    let err5 = new Messages;
    err5.message = "Description should not be empty!";
    err5.field = "description";
    errors.errorsMessages.push(err5);
  }
  
  if (body.websiteUrl ? body.websiteUrl.trim() : null){
    if (body.websiteUrl.trim().length > 100) {
      let err6 = new Messages;
      err6.message = "WebsiteUrl too long!";
      err6.field = "websiteUrl";
      errors.errorsMessages.push(err6);
    } else if (body.websiteUrl.trim().length == 0) {
      let err7 = new Messages;
      err7.message = "WebsiteUrl should not be empty!";
      err7.field = "websiteUrl";
      errors.errorsMessages.push(err7);
    }

    if (typeof body.websiteUrl != 'string') {
      let err8 = new Messages;
      err8.message = "WebsiteUrl must be string!";
      err8.field = "websiteUrl";
      errors.errorsMessages.push(err8);
    }  

    if (!/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(body.websiteUrl)) {
      let err9 = new Messages;
      err9.message = "WebsiteUrl not correct!";
      err9.field = "websiteUrl";
      errors.errorsMessages.push(err9);
    }

  } else {
    let err7 = new Messages;
    err7.message = "WebsiteUrl should not be empty!";
    err7.field = "websiteUrl";
    errors.errorsMessages.push(err7);
  }

  
  
  return {errors: errors, check: errors.errorsMessages.length == 0};
}  
