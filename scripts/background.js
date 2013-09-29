String.prototype.ReplaceAll = function(stringToFind,stringToReplace){
    var temp = this;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
    };


chrome.storage.local.get("locations",  function(result){
  console.log("Loaded page: " + document.URL);

  for (var i = 0; i < result.locations.length; i++) {
    var re_str =  result.locations[i].url.ReplaceAll("*", '[\\s\\S]+?')
    var re = new RegExp(re_str, "g");

    match_result = re.test(document.URL);

    console.log("Checked against: " + re);
    console.log(match_result);

    if (match_result){
          var sidebar;
          sidebar = $("<div id='sidebar'><table><tr>" +
                      "<td class=\"notification\">" + result.locations[i].alert + "</td>" +
                      "<td class=\"close-btn\">&#10006;</td>" +
                      "<tr></table></div>");
          sidebar.css({
            'position': 'fixed',
            'right': '0px',
            'top': '0px',
            'z-index': 9999,
            'width': '100%',
            'height': '50px',
            'background-color': 'rgba(255,0,0,0.7)',
            'text-align': 'center',
            'display': 'table',
            'pointer-events': 'none'
          });

          sidebar.find('table').css({
            'height': '100%',
            'width': '100%',
            'vertical-align': 'middle'
          });

          sidebar.find('td').css({
            'height': '100%',
            'color': 'white',
            'font-weight': 'bold'
          });

          sidebar.find('.notification').css({
            'width': '90%'
          });

          sidebar.find('.close-btn').css({
            'font-size': 'x-large',
            'cursor': 'pointer',
            'pointer-events': 'all'
          });


          sidebar.find('.close-btn').click(function() {
            sidebar.remove();
          });

          $('body').append(sidebar);

          break;
      }
  }
});