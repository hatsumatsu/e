`````
_____________________________
___________/\/\/\/\/\/\______
__________/\_________________
_________/\/\/\/\/\__________
________/\/\_________________
_______/\/\/\/\/\/\__________
_____________________________

`````

Tiny DOM manipulation helper with a familiar fluent API.

### Installation

`npm install @superstructure.net/e`


### Usage

`````
import E from @superstructure.net/e;

// create collection
new E( '.my-selector' );
new E( '[data-module-role="button"]' );
new E( elementOrNodeList );
new E( '<div>' );

// create collection and do stuff
new E( '<div>' )
  .setAttr( 'data-module-role', 'title' )
  .setText( 'Groovy 🎷' )
  .addClass( 'active' )
  .appendTo( 'body' )
`````


### API

##### `filter(selector|index)`

Filter the current collection by a selector or an index.

##### `find(selector)`
Get children of the current collection matching `selector`.

##### `closest(selector)`
Gets the closest parent matching `selector`.

##### `append(selector|Element|NodeList|E)`
Append nodes to the current collection.

##### `appendTo(selector|Element|NodeList|E)`
Append the current collection to the passed nodes.

#####  `prepend(selector|Element|NodeList|E)`
Prepend nodes to the current collection.

##### `prependTo(selector|Element|NodeList|E)`
Prepend the current collection to the passed nodes.

##### `clone()`
Clone the collection.

##### `remove()`
Remove the collection from DOM.

##### `addClass(class)`
Add `class` to the collection.

##### `removeClass(class)`
Remove `class` from the collection.

##### `setAttr(key, value [,namespace])`
Set attribute `key` to `value`. If `namespace` is passed the key used is `data-{namespace}-{key}`.

##### `getAttr(key [,namespace])`
Get attribute value of `key`. If `namespace` is passed the key used is `data-{namespace}-{key}`.

##### `setText(text)`
Set text content of the first collection entry;

##### `getText()`
Get text content of the first collection entry;

##### `setHTML(text)`
Set inner HTML of the first collection entry;

##### `getHTML()`
Get inner HTML of the first collection entry;

##### `css(syles)`
Apply styles passed as a key-value-based object. Like `{fontSize:'2rem',color:'yellow'}`.

##### `nodes(index)`
Get collection entry at `index`. Returns all collection entries if no index is passed.

##### `isEmpty()`
Returns `true` if the collection is empty.


### Q&A

#####  This looks a lot like JQ**** ...
Don’t be silly, no one is using JQuery these days, right? 😇

##### Why not using Vanilly JS instead?
You absolutely could but isn’t it nice to have a chainable API?

