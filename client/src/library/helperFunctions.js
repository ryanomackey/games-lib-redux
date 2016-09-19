'use strict';

export function getQueryVariable(variable) {
  var query = location.hash.substring(3);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

export function completedFilter(library, command) {
  library.forEach((game) => {
    if (command === 'HIDE_COMPLETE') {
      if (game.completed) {
        game.is_visible = false;
      }
    } else if (command === 'SHOW_COMPLETE') {
      if (game.completed) {
        game.is_visible = true;
      }
    }
  });
  return library;
}

export function selectedToggle(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].name === item) {
      arr[i].selected = !arr[i].selected;
    }
  }
  return arr;
}

export function arrayToggle(array, platform) {
  var spliced = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === platform) {
      array.splice(array.indexOf(platform), 1);
      spliced = true;
    }
  }
  if (spliced === true) {
    return array;
  } else {
    array.push(platform);
    return array;
  }
}

export function filter(library, array) {
  if (array.length > 0) {
    library.map((game) => {
      game.is_visible = false;
    });
    library.map((game) => {
      for (var i = 0; i < array.length; i++) {
        if (game.platform_name === array[i]) {
          game.is_visible = true;
        }
      }
    });
  } else {
    library.map((game) => {
      game.is_visible = true;
    });
  }
  return library;
}

export function buildPlatformArray(arr) {
  var newArr = [];
  arr.forEach((game) => {
    newArr.push(game.platform_name);
  });
  function unique(arr) {
    return arr.filter(function(x, i) {
      return arr.indexOf(x) === i;
    });
  }
  newArr = unique(newArr);
  newArr.sort(function(a,b) {
    var nameA = a.toUpperCase();
    var nameB = b.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  var objArr = [];
  for (var i = 0; i < newArr.length; i++) {
    objArr.push({
      name: newArr[i],
      selected: false
    });
  }
  return objArr;
}
