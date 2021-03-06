(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n > array.length ? array : array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection instanceof Array) {
      for (var i=0, l=collection.length; i<l; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  }

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passed = [];

    for (var i = 0, l=collection.length; i<l; i++) {
      if (test(collection[i])) {
        passed.push(collection[i]);
      }
    }
    return passed;
  };

  // Return all elements of an array that don't pass a truth test.
 _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var rejected = [];
    
    for (var i=0, l=collection.length; i<l; i++) {
        if (_.filter(collection[i]) == test(collection[i])) {
            rejected.push(collection[i]);
        }
    }
    return rejected;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var sorted = [];
    array.sort();
    
    for (var i=0,l=array.length; i<l; i++) {
        if (array[i] != array[i+1]) {
            sorted.push(array[i]);
        }
    }
    return sorted;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];
  
    for (var i =0, l=collection.length; i<l; i++) {
      mapped.push(iterator(collection[i]));
    }
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  
  /* FIRST IMPLEMENTATION OF _.REDUCE() on 05/14/2015

  _.reduce = function(collection, iterator, accumulator) {
    if (arguments[2] === undefined) {
        var total = collection[0];
        for (var i = 1; i < collection.length; i++) {
            total = iterator(total, collection[i]);
        }
    } else {
        total = accumulator;
        for (var h = 0; h < collection.length; h++) {
          total = iterator(total, collection[h]);
        }
    }
    return total;
  }; 

NOTE: First implementation of _.reduce() overlooked objects, which became obvious when moving on to _.contains(). Benefit of working through this implementatio: gained a better understanding of the arguments object.  */ 


/*  SECOND IMPLEMENTATIO OF _.REDUCE() on 05/27/2015

_.reduce = function(collection, iterator, accumulator) {
// initialize variables?
  var numArgs = arguments.length;

// must decide if collection is instanceof Array
  if (collection instanceof Array) {
      if (numArgs != 3) {
          accumulator = collection.shift();
          for (var i=0; i<collection.length; i++) {
              accumulator = iterator(accumulator, collection[i]);
          }
          return accumulator;
      } else {
          for (var h=0; h<collection.length; h++) {
              accumulator = iterator(accumulator, collection[h]);
          }
          return accumulator;
      }
      
  } else {
      if(numArgs != 3){
          var newArr = [];
          for(var key in collection) {
              newArr.push(collection[key]);
          }
          accumulator = newArr.shift();
          for(var j=0; j<newArr.length; j++) {
              accumulator = iterator(accumulator, newArr[j]);
          }
          return accumulator;
      } else {
          for(var key1 in collection) {
              accumulator = iterator(accumulator, collection[key1]);
          }
          return accumulator;
      }
  }
};  

NOTE: Second implementation of _.reduce() added support for objects, which passed the original tests for reduce, as well as those for _.contains(). Benefit of this implementation: understanding instanceof operator. Drawback of this implementation: it's extremely lengthy for what it accomplishes. 

*/

// THIRD IMPLEMENTATION OF _.REDUCE() on 05/28/2015

_.reduce = function(collection, iterator, accumulator) {
    if (Array.isArray(collection)) {
        accumulator === undefined ? (accumulator = collection.shift()) : accumulator;
        for(var i = 0, l = collection.length; i < l; i++) {
            accumulator = iterator(accumulator, collection[i]);
        }
        return accumulator;
    } else {
        if (accumulator === undefined) {
            accumulator = collection[Object.keys(collection)[0]];
            delete collection[Object.keys(collection)[0]];
        }
        for(var key in collection) {
            accumulator = iterator(accumulator, collection[key]);
        }
        return accumulator;
    }
};

/* NOTE: Third implementation of _.reduce() refactors much of the code of the second implementation for a much more compact iteration. Benefits of this implementation: 
1. using ternary conditional to handle accumulator 
2. understanding Array.isArray(obj); 
3. optimized variable declarations in the loops; 
4. understand Objects.keys() and using it to access the first property of an object without knowing the key name. */

// BEGINNING OF PART 2 

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    if (collection.length === 0) { 
      return Boolean(collection);
    } else {
      var arrOfBools = [];
      for(var i=0, l=collection.length; i<l; i++) {
          if (iterator(collection[i])) {
              arrOfBools.push(true);
          } else {
              return false;
          }
      }
      return arrOfBools.shift();
    }
  };

/*
  After too much circular thinking around how to reuse _.reduce(), decided to write something just to pass some tests and hopefully open up some thinking space; this iteration fails the first and the last test, but passes the others. 
*/

  // _.every = function(collection, iterator) {
  //   if (iterator === undefined) { iterator = _.identity};
  //   if (collection.length === 0 || Object.keys(collection).length === 0) { return false; }
  // };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    if (collection.length === 0) {
      return false;
    } else {
      var results = [];
      for (var i = 0; i < collection.length; i++) {
        results.push(Boolean(iterator(collection[i])));
      };
    }
    return (_.contains(results, true));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i=1; i<arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i=1; i<arguments.length; i++) {
      for (var key in arguments[i]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var cache = {},
        slice = Array.prototype.slice;
    
    return function() {
      var args = slice.call(arguments), 
          value;
      
      if (args in cache) {
          value = cache[args];
      } else {
          value = func.apply(this, arguments);
          cache[args] = value;
      }
      console.log(cache);
      return value;
    }; 
  };

  /* 
  
  Really have to credit this post on sitepoint (http://www.sitepoint.com/implementing-memoization-in-javascript/) with showing me the way. 

  When I arrived at this function, I remembered reading something in Crockford's Good Parts about memozing functions; however, when I went back to it, I quickly realized that it didn't answer the one thing that I was stuck on: combining two (or more) arguments into an index for the value they generate. 

  */

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args); 
    }, wait);
  };
  /* 
  Honestly, I initially couldn't figure out why Underscore had _.delay() when it seemed to serve the same purpose, and work exactly the same way as setTimeout(), but after doing some reading on SO, it sounds like the answer is cross browser support. 

  See SO article: http://stackoverflow.com/questions/16890106/why-does-underscore-js-have-a-delay-function

  NOTE: Read more about how Array.prototype.slice works; you're at the place where you know how to use it, but you're still unclear on exactly how it works. 

  UPDATED NOTE: Ha! Looked at the directions for _.shuffle() and realized the time to act on this note was now. 
  */

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  _.shuffle = function(array) {
    var toBeShuffled = array.slice(),
        shuffled = [],
        randNum;
    while (shuffled.length < array.length) {
        randNum = Math.floor(Math.random()*array.length);
        if (toBeShuffled[randNum]) {
            shuffled.push(toBeShuffled[randNum]);
            toBeShuffled.splice(randNum,1);
        }
    }
    if (shuffled[0] === array[0]) {
        shuffled.push(shuffled.shift());
    }
    return shuffled;
  };

  // _.shuffle = function(array) {
  //   var shuffled = array.slice();
  //   shuffled.push(shuffled.shift());
  //   return shuffled;
  // };

  /*
  Just wanted to mess around with a second idea for the implementation: 
  
  _.shuffle = function(array) {
    var shuffled = array.slice();
    for (var i = 1; i < array.length; i++) {
      shuffled.push(shuffled.shift());
    }
    return shuffled;
  }
  */


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
