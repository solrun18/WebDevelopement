(function (globalObj) {
  function MakeBelieveElement(nodes) {
    this.nodes = nodes;
  }

  MakeBelieveElement.prototype.getLength = function() {
    return this.nodes.length;
  }

  MakeBelieveElement.prototype.getTagNames = function() {
    var tagNames = [];
    for (var i = 0; i < this.nodes.length; i++) {
      var currentElement = this.nodes[i];
      tagNames.push(currentElement.tagName.toLowerCase());
    }
    return tagNames
  }

  // helper function

  MakeBelieveElement.prototype.ancestryHelper = function(node, selector = null) {
      var parent = [];
      var currentElement = node;
      if(selector !== null){
          for (var i = 0; i < currentElement.length; i++) {
              if(currentElement[i].parentElement.matches(selector))
                  parent.push(currentElement[i].parentElement);
          }
      }
      else{
          for (var i = 0; i < currentElement.length; i++) {
              parent.push(currentElement[i].parentElement);
          }
      }
      return parent;
  }

  // section 4

  MakeBelieveElement.prototype.parent = function(selector = null) {
      var parent = this.ancestryHelper(this.nodes, selector);
      if(parent[0] == null){
          return [];
      }
      else{
          return new MakeBelieveElement(parent);
      }
  }

  // section 5

  MakeBelieveElement.prototype.grandParent = function(selector = null) {
      var parent = this.ancestryHelper(this.nodes);
      var grandParent = this.ancestryHelper(parent, selector);

      if(grandParent[0] == null){
          return [];
      }
      else{
          return new MakeBelieveElement(grandParent);
      }
  }

  // section 6

  MakeBelieveElement.prototype.ancestor = function(selector) {
      var parents = this.ancestryHelper(this.nodes);
      var grandParents = this.ancestryHelper(parents);
      var ancestors = null;
      var currentElement = [];

      for (var i = 0; i < grandParents.length; i++){
          currentElement = grandParents[i];
          while(currentElement.parentElement !== null){
              if(currentElement.parentElement.matches(selector)){
                  if(ancestors == null){
                      return new MakeBelieveElement(currentElement.parentElement);
                  }
              }
              currentElement = currentElement.parentElement;
          }
      }
      return [];
  }

  // section 7

  MakeBelieveElement.prototype.onClick = function(theFunction) {
      for(var i = 0; i < this.nodes.length; i++){
          this.nodes[i].addEventListener('click', theFunction, false);
      }
  }
  // section 8

  MakeBelieveElement.prototype.insertText = function(string) {
      for(var i = 0; i < this.nodes.length; i++){
          this.nodes[i].innerHTML = string;
      }
  }

  // section 9

  MakeBelieveElement.prototype.append = function(arg) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (typeof arg == 'object') {
        arg = arg.parentNode.outerHTML
      }
      this.nodes[i].insertAdjacentHTML('afterend', arg)
    }
  }

  // section 10

  MakeBelieveElement.prototype.prepend = function(arg) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (typeof arg == 'object') {
        arg = arg.parentNode.outerHTML
      }
      this.nodes[i].insertAdjacentHTML('beforebegin', arg)
    }
  }

  // Problem 11

  MakeBelieveElement.prototype.delete = function() {
      for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].remove()
      }
  }

  // section 13

  MakeBelieveElement.prototype.css = function(styleToChange, value) {
      for(var i = 0; i < this.nodes.length; i++){
          this.nodes[i].style[styleToChange] = value;
      }
  }

  // section 14

  MakeBelieveElement.prototype.toggleClass = function(arg) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].className == arg) {
        this.nodes[i].className = ""
      }
      else {
        this.nodes[i].className = arg
      }
    }
  }

  // Problem 15

  MakeBelieveElement.prototype.onSubmit = function(evt) {
      for (var i = 0; i < this.nodes.length; i++) {
          this.nodes[i].addEventListener("submit", evt)

      }
  }

  // Problem 16

  MakeBelieveElement.prototype.onInput = function(evt) {
      for (var i = 0; i < this.nodes.length; i++) {
          this.nodes[i].addEventListener("input", evt)

      }
  }

  // section 12

  function ajax(config) {
    // setting default value
    if (config.method == '') {
      config.method = 'GET';
    }
    // create xhttp request and open
    var xhttp = new XMLHttpRequest();
    xhttp.open(config.method, config.url);
    // setting req headers
    for (var i = 0; i < config.headers.length; i++) {
      xhttp.setRequestHeader(
        Object.keys(config.headers[i]), config.headers[i][Object.keys(config.headers[i])]
      );
    }
    // setting timeout
    xhttp.timeout = config.timeout * 1000;
    // how did it go?
    xhttp.onload = function () {
      config.beforeSend()
      if (xhttp.readyState == xhttp.DONE) {
        if ( Math.floor(xhttp.status/100) == 2 ) {
          config.success()
        }
        else (
          config.fail()
        )
      }
    }
      // send request
      xhttp.send(config.data)
  }

  function query(cssSelector) {
    // get items
    var items = document.querySelectorAll(cssSelector);
    return new MakeBelieveElement(items);
  }

  globalObj.__ = query;
  globalObj.__.ajax = ajax;
})(window);
