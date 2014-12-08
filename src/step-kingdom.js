console.log(OAuth.getVersion());
OAuth.initialize('R_b1DUSdIvkFS5Go8Zp3caHxOmE');
OAuth.popup('fitbit')
  .done(function(result) {
    console.log(result)
  })
  .fail(function(err) {
    console.log("Failed")
  });