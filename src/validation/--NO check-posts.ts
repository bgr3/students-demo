import { blogsRepository } from "../repositories/blogs-in-memory-repository";

export let checkPosts = function (body:any) {

  class Messages {
    message: string | undefined;
    field: string | undefined;
  }
  let arr: any = [];
  let errors = {"errorsMessages" : arr};

  if (body.title ? body.title.trim() : null){
    if (body.title.trim().length > 30) {
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
    let err2 = new Messages;
    err2.message = "Title should not be empty!";
    err2.field = "title";
    errors.errorsMessages.push(err2);
  }

  if (body.shortDescription ? body.shortDescription.trim() : null){
    if (body.shortDescription.trim().length > 100) {
      let err4 = new Messages;
      err4.message = "ShortDescription too long!";
      err4.field = "shortDescription";
      errors.errorsMessages.push(err4);
    } else if (body.shortDescription.trim().length == 0) {
      let err5 = new Messages;
      err5.message = "ShortDescription should not be empty!";
      err5.field = "shortDescription";
      errors.errorsMessages.push(err5);
    }

    if (typeof body.shortDescription != 'string') {
      let err6 = new Messages;
      err6.message = "ShortDescription must be string!";
      err6.field = "shortDescription";
      errors.errorsMessages.push(err6);
    }  
  } else {
    let err5 = new Messages;
    err5.message = "ShortDescription should not be empty!";
    err5.field = "shortDescription";
    errors.errorsMessages.push(err5);
  }
  
  if (body.content ? body.content.trim() : null){
    if (body.content.trim().length > 20) {
      let err7 = new Messages;
      err7.message = "Content too long!";
      err7.field = "content";
      errors.errorsMessages.push(err7);
    } else if (body.content.trim().length == 0) {
      let err8 = new Messages;
      err8.message = "Content should not be empty!";
      err8.field = "content";
      errors.errorsMessages.push(err8);
    }

    if (typeof body.content != 'string') {
      let err9 = new Messages;
      err9.message = "Content must be string!";
      err9.field = "content";
      errors.errorsMessages.push(err9);
    }  
  } else {
    let err8 = new Messages;
    err8.message = "Content should not be empty!";
    err8.field = "content";
    errors.errorsMessages.push(err8);
  }

  if (body.blogId ? body.blogId.trim() : null){
    if (body.blogId.trim().length > 20) {
      let err10 = new Messages;
      err10.message = "BlogId too long!";
      err10.field = "blogId";
      errors.errorsMessages.push(err10);
    } else if (body.blogId.trim().length == 0) {
      let err11 = new Messages;
      err11.message = "BlogId should not be empty!";
      err11.field = "blogId";
      errors.errorsMessages.push(err11);
    }

    if (typeof body.blogId != 'string') {
      let err12 = new Messages;
      err12.message = "BlogId must be string!";
      err12.field = "blogId";
      errors.errorsMessages.push(err12);
    }  

    if (!blogsRepository.findBlogByID(body.blogId)) {
      let err13 = new Messages;
      err13.message = "BlogId does not exist!";
      err13.field = "blogId";
      errors.errorsMessages.push(err13);
    }

  } else {
    let err11 = new Messages;
    err11.message = "BlogId should not be empty!";
    err11.field = "blogId";
    errors.errorsMessages.push(err11);
  }
  
  return {errors: errors, check: errors.errorsMessages.length == 0};
}  
