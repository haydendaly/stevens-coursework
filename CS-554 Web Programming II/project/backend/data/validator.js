module.exports ={
  isNonEmptyString(inputString){
    // non empty and should not only contains spaces
    return inputString && typeof inputString === 'string' && inputString.trim().length > 0;
  },
  
  isValidName(name){
    // non empty string
    // start with letter
    // allow space and .
    // no other special char
    return this.isNonEmptyString(name) && /^[A-Za-z .']+$/i.test(name) && /^[A-Za-z]/i.test(name);
  },

  isValidEmail(email){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return typeof email === 'string' && email.match(mailformat);
  },

  isValidURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  },
};