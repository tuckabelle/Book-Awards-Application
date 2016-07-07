function sortJsonName(a, b) {
  return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
}



$.getJSON('data.json', function(data) {
  data = $(data).sort(sortJsonName);
  var output = '<ul>';
  $.each(data, function(key, val) {
    //use the value variable and pass along the "name" value from the JSON file
    output += '<li class="list">';
    output += '<div class="heading"><h2>' + val.name + '</h2><h6>' + val.author + '</h6>';
    output += '<div class="category">' + val.nomination + '</div></div>';
    output += '<div class="listContent"><div class="right"><p>' + val.bio + '</p></div>';
    if (val.image !== "") {
      output += '<div class="left"><img src="' + val.image + '" alt="' + val.name + '" /></div>';
    } else {
      output += '<div class="left"><img src="book.svg" alt="Default book" /></div></div>';
    }
    output += '<div class="clear"></div>';
    output += '</li>';
  });
  output += '</ul>';
  $('#update').html(output);

});

$('#search').keyup(function() {
  var searchField = $('#search').val();
  var myExp = new RegExp(searchField, "i");
  $.getJSON('data.json', function(data) {
    var output = '<ul>';
    var count = 0;
    data = $(data).sort(sortJsonName);
    $.each(data, function(key, val) {
      if ((val.tags.search(myExp) != -1) ||
        (val.name.search(myExp) != -1) ||
        (val.author.search(myExp) != -1) ||
        (val.nomination.search(myExp) != -1)) {
        output += '<li class="list">';
        output += '<div class="heading"><h2>' + val.name + '</h2><h6>' + val.author + '</h6>';
        output += '<div class="category">' + val.nomination + '</div></div>';
        output += '<div class="listContent"><div class="right"><p>' + val.bio + '</p></div>';
        if (val.image != "") {
          output += '<div class="left"><img src="' + val.image + '" alt="' + val.name + '" /></div>';
        } else {
          output += '<div class="left"><img src="book.svg" alt="Default book" /></div></div>';
        }
        count++;
      }
      output += '<div class="clear"></div>';
      output += '</li>';
    });
    if (count == 0) {
      output = '<div id="noResults"><p>Sorry, there were no results!</p><p>Try searching again for a title, author, or keyword.</p> </div></ul>';
    }
    output += '</ul>';

    $('#update').html(output);
  }); //get JSON

});

$(".search").click(function() {
  if (!$(".search-box").hasClass("active") || $(".search-field").val() === '') {
    $(".search-box").addClass('active');
    $(".search-field").focus();
    $(".clear-icon").click(function() {
      ClearSearchField();
      OnInput();
    });
    return false;

  } else {
    ClearSearchField();
    $(".search-box").removeClass('active');
    $(".clear-icon").removeClass("show");
    OnInput();
  }
});

function OnInput() {
  if (!$(".search-field").val() === '') {
    $(".clear-icon").addClass("show");
    $(".search").addClass("hideSearch");
  } else {
    $(".clear-icon").removeClass("show");
    $(".search").removeClass("hideSearch");
  }
}

function ClearSearchField() {
  $(".search-field").val('');
  //$(".search-field").focus();
}

$("html").click(function(e) {
  if (!$(e.target).is('.search-field, .clear-icon, .search')) {
    $(".search-field").focus();
    ClearSearchField();
    OnInput();
    $(".search-box").removeClass('active');
  }
  $.getJSON('data.json', function(data) {
    data = $(data).sort(sortJsonName);
    var output = '<ul>';
    $.each(data, function(key, val) {
      //use the value variable and pass along the "name" value from the JSON file
      output += '<li>';
      output += '<div class="heading"><h2>' + val.name + '</h2><h6>' + val.author + '</h6>';
      output += '<div class="category">' + val.nomination + '</div></div>';
      output += '<div class="right"><p>' + val.bio + '</p></div>';
      if (val.image !== "") {
        output += '<div class="left"><img src="' + val.image + '" alt="' + val.name + '" /></div>';
      } else {
        output += '<div class="left"><img src="book.svg" alt="Default book" /></div>';
      }
      output += '<div class="clear"></div>';
      output += '</li>';
    });
    output += '</ul>';
    $('#update').html(output);
  });

});