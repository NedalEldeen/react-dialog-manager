# React Dialog Manager

Manage dialogs throughout the react application. `React Dialog Manager` gives you a clear declarative API to easily handle the dialog's behaviour.

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Examples](#examples)
* [API](#api)
* [todo](#todo)
* [Contribution](#contribution)



## Installation
using npm:
```js
npm install --save react-dialog-manager
```



## Getting Started
`React Dialog Manager` gives you great functionalities and flexibility to handle the dialogs of your react projects. Let's start with the following implementaiton.
```JSX
import React from 'react';
import {createDialogManager, DialogManagerComponent} from 'react-dialog-manager';

const dialogManager = createDialogManager();
const dialog = dialogManager.createDialog({
	title: 'The Dialog Title',
	body: <TestForm  />
});

class App extends React.Component{

	constructor(props){
		super(props);
	}

	onOpenBtnClicked(){
		dialog.open();
	}

	onCloseBtnClicked(){
		dialog.close();
	}

	render(){
		return (
			<div className="App">
				<div>
					<button onClick={this.onOpenBtnClicked.bind(this)}>Open Dialog</button>
					<button onClick={this.onCloseBtnClicked.bind(this)}>Close Dialog</button>
				</div>
				<DialogManagerComponent manager={dialogManager} />
			</div>
		);
	}
}

function TestForm(props){
	/* dialog is passed within props */
	let {dialog} = props;
	return (
		<form>
			<input type="text" />
		</form>
	);
}

export default App;
```
From the previous implementation we can get some points; 
* `<DialogManagerComponent />` this ReactComponent is imported from `react-dialog-manager` and **it's recommended** to be at higher level in the application as shown in previous snippet. This component takes only one prop which is manager.
```JSX
// dialogManager comes from createDialogManager or getLastDMInstance
<DialogManagerComponent manager={dialogManager} />
```

* `createDialogManager` this function is also imported from `react-dialog-manager` to create a `DialogManager` instace with two main params.
```js
let setting = {}; // setting for manager
let instanceName = 'base_dialogs_manager'; // acts as id or key. just used for identification.
const dialogManager = createDialogManager(setting, instanceName);
```
 **Note,**  Sometimes, we use `dialogManager` in different places through our app to create dialogs so instead of making a seperate singleton object to handle this process, we can use `getLastDMInstance` function which also is exported from `react-dialog-manager`.

* `createDialog` once you have already created a `dialogManager`, you can create as much as you need of dialogs. You can, easily, interact with `dialog` throuth API.
```js
const dialogManager = createDialogManager();
let definition = {}; // definition of the dialog like its title, its header, its body ... etc.
const dialog = dialogManager.createDialog(definition);
 // open the dialog
dialog.open();
 // close the dialog
dialog.close();
```

## Expamples

Let's go throght some examples.

* Basic Example

```JSX
import React from 'react';
import {
	createDialogManager,
	DialogManagerComponent
 } from 'react-dialog-manager';


const dialogManager = createDialogManager({}, 'BASE_DM');
const dialogA = dialogManager.createDialog({
	title: 'The Dialog Title',
	body: (
		<div>
			<p>Hello World</p>
		</div>
		)
});

class App extends React.Component{

	constructor(props){
		super(props);
	}

	onBtnAClicked(){
		dialogA.open();
	}

	onBtnBClicked(){
		let definition = {
			title: 'Dialog B',
			body: 'the body content'
		};
		let dialogInstanceName = 'DIALOG_B';
		/* will get dialogInstance of 'DIALOG_B'. In case of not existing -> create new one */
		dialogManager.getLastDialogInstance(definition, dialogInstanceName).open();
	}

	render(){
		return (
			<div className="App">
				<div>
					<button onClick={this.onBtnAClicked.bind(this)}>Open Dialog A</button>
					<button onClick={this.onBtnBClicked.bind(this)}>Open Dialog B</button>
				</div>
				<DialogManagerComponent manager={dialogManager} />
			</div>
		);
	}
}

export default App;
```
* Nested Dialogs Example

```JSX
const dialogManager = createDialogManager({}, 'BASE_DM');
const dialogA = dialogManager.createDialog({
	title: 'The Dialog Title',
	body: <DialogBody />,
	close_by_overlay: false /* will not close when clicking on overlay layer */
});

class App extends React.Component{

	onBtnAClicked(){
		dialogA.open();
	}

	render(){
		return (
			<div className="App">
				<div>
					<button onClick={this.onBtnAClicked.bind(this)}>Open Dialog</button>
				</div>
				<DialogManagerComponent manager={dialogManager} />
			</div>
		);
	}
}

function DialogBody(props){
	return (
		<div>
			<button 
				onClick={() => {
					dialogManager.getLastDialogInstance({
						title: 'I am nested dialog',
						body: <div>Awesome!</div>
					}, 'NESTED_DAILOG').open();
				}}
			>
				Open Nested Dialog
			</button>
		</div>
	);
}

export default App;
```

* Open - Close Handlers Examples

```js
const dialogManager = createDialogManager({}, 'BASE_DM');

/* will not open beacuse of the before_open handler returns false */
const dialogA = dialogManager.createDialog({
	before_open: (d)=>{
		return false;
	}
});

/* will console.log 'on dialog opened' after dialog opening */
const dialogB = dialogManager.createDialog({
	on_open: (d)=>{
		console.log('on dialog opened');
	}
});

/* will not close after clicking on done button beacuse of the before_done handler returns false */
const dialogC = dialogManager.createDialog({
	before_done: (d)=>{
		console.log('e.g. form validation');
		return false;
	}
});
```


## API 
### Modules

<dl>
<dt><a href="#module_react-dialog-manager">react-dialog-manager</a></dt>
<dd><p>This module is responsible for handling the instantiation of DialogManager and also, exporting the DialogManagerComponent</p>
</dd>
</dl>

### 

* [DialogManager](#DialogManager)
    * [new DialogManager(setting, [instanceName])](#new_DialogManager_new)
    * [.createDialog(definition, [instanceName])](#DialogManager+createDialog) ⇒ [<code>Dialog</code>](#Dialog)
    * [.getDialogs()](#DialogManager+getDialogs) ⇒ <code>Array</code>
    * [.getInstanceName()](#DialogManager+getInstanceName) ⇒ <code>string</code>
    * [.getLastDialogInstance(definition, [instanceName])](#DialogManager+getLastDialogInstance) ⇒ [<code>Dialog</code>](#Dialog)
    * [.removeDialog(dialog)](#DialogManager+removeDialog)
* [Dialog](#Dialog)
    * [new Dialog(definition, dialogMananger, [instanceName])](#new_Dialog_new)
    * [.before(eventName, handler)](#Dialog+before)
    * [.close()](#Dialog+close)
    * [.done()](#Dialog+done)
    * [.getBeforeHandlersOf(eventName)](#Dialog+getBeforeHandlersOf) ⇒ <code>function</code> \| <code>Array.&lt;function()&gt;</code>
    * [.getBody()](#Dialog+getBody) ⇒ <code>ReactComponent</code> \| <code>string</code>
    * [.getHandlersOf(eventName)](#Dialog+getHandlersOf) ⇒ <code>function</code> \| <code>Array.&lt;function()&gt;</code>
    * [.getInstanceName()](#Dialog+getInstanceName) ⇒ <code>string</code>
    * [.getOverlayStyle()](#Dialog+getOverlayStyle) ⇒ <code>Object</code>
    * [.getStyle()](#Dialog+getStyle) ⇒ <code>Object</code>
    * [.getTitle()](#Dialog+getTitle) ⇒ <code>string</code>
    * [.getZIndex()](#Dialog+getZIndex) ⇒ <code>int</code>
    * [.isOpened()](#Dialog+isOpened) ⇒ <code>boolean</code>
    * [.on(eventName, handler)](#Dialog+on)
    * [.open()](#Dialog+open)
    * [.set(definition, [value])](#Dialog+set)
    * [.setBody(body)](#Dialog+setBody)
    * [.setStyle(style)](#Dialog+setStyle)
    * [.setTitle(title)](#Dialog+setTitle)
    * [.setZIndex(zIndex)](#Dialog+setZIndex)

<a name="module_react-dialog-manager"></a>

### react-dialog-manager
This module is responsible for handling the instantiation of DialogManager and also, exporting the DialogManagerComponent


* [react-dialog-manager](#module_react-dialog-manager)
    * [.DialogManagerComponent](#module_react-dialog-manager.DialogManagerComponent)
    * [.createDialogManager(setting, instanceName)](#module_react-dialog-manager.createDialogManager) ⇒ [<code>DialogManager</code>](#DialogManager)
    * [.getDMInstances()](#module_react-dialog-manager.getDMInstances) ⇒ <code>Array</code>
    * [.getLastDMInstance(setting, instanceName)](#module_react-dialog-manager.getLastDMInstance) ⇒ [<code>DialogManager</code>](#DialogManager)


***
<a name="module_react-dialog-manager.DialogManagerComponent"></a>

#### react-dialog-manager.DialogManagerComponent
**Params**

- DialogManagerComponent <code>ReactComponent</code>

**Example**  
```js
const dm = createDialogManager();<DialogManagerComponent dialogManager="dm" />
```

***
<a name="module_react-dialog-manager.createDialogManager"></a>

#### react-dialog-manager.createDialogManager(setting, instanceName) ⇒ [<code>DialogManager</code>](#DialogManager)
It will instantiate a new instance of DialogManager and store it as last instance.

**Returns**: [<code>DialogManager</code>](#DialogManager) - dialogManager  
**Params**

- setting <code>Object</code>
- instanceName <code>Sting</code> - The name used to identify the DialogManager instance. It's helpful wheu you call getLastDMInstance with the same instanceName


***
<a name="module_react-dialog-manager.getDMInstances"></a>

#### react-dialog-manager.getDMInstances() ⇒ <code>Array</code>
**Returns**: <code>Array</code> - intances  

***
<a name="module_react-dialog-manager.getLastDMInstance"></a>

#### react-dialog-manager.getLastDMInstance(setting, instanceName) ⇒ [<code>DialogManager</code>](#DialogManager)
Returns the last instance of DialogManger with the same provided instanceName param.In case of, there is no previous instance, it instantiates new one and returns it.

**Returns**: [<code>DialogManager</code>](#DialogManager) - dialogManager  
**Params**

- setting <code>Object</code>
- instanceName <code>Sting</code> <code> = &#x27;&#x27;</code>


***
<a name="DialogManager"></a>

### DialogManager

* [DialogManager](#DialogManager)
    * [new DialogManager(setting, [instanceName])](#new_DialogManager_new)
    * [dialogManager.createDialog(definition, [instanceName])](#DialogManager+createDialog) ⇒ [<code>Dialog</code>](#Dialog)
    * [dialogManager.getDialogs()](#DialogManager+getDialogs) ⇒ <code>Array</code>
    * [dialogManager.getInstanceName()](#DialogManager+getInstanceName) ⇒ <code>string</code>
    * [dialogManager.getLastDialogInstance(definition, [instanceName])](#DialogManager+getLastDialogInstance) ⇒ [<code>Dialog</code>](#Dialog)
    * [dialogManager.removeDialog(dialog)](#DialogManager+removeDialog)


***
<a name="new_DialogManager_new"></a>

#### new DialogManager(setting, [instanceName])
The instantiation of this class is done by [createDialogManager](#module_react-dialog-manager.createDialogManager)

**Params**

- setting <code>Object</code> - Setting for the dialogs manager.
    - [.initial_z_index] <code>int</code> <code> = 1000</code> - The start point where the z-indices of dialogs with begin. Each new dialog the `initial_z_index` will be incremented. For example; first dialog will have `initial_z_index`, second one will have `initial_z_index + 1` and so on.
- [instanceName] <code>string</code> - The name of DialogManager instance

**Example**  
```js
import {createDialogManager} from 'react-dialog-manager';const dm = createDialogManager({}, 'baseDM');
```

***
<a name="DialogManager+createDialog"></a>

#### dialogManager.createDialog(definition, [instanceName]) ⇒ [<code>Dialog</code>](#Dialog)
Creates new dialog instance, and stores (pushs) it into the dialogs.

**Returns**: [<code>Dialog</code>](#Dialog) - dialog  
**Params**

- definition <code>Object</code> - The definition of the new [Dialog](#Dialog)
- [instanceName] <code>string</code> - The (id) name of the new dialog instance


***
<a name="DialogManager+getDialogs"></a>

#### dialogManager.getDialogs() ⇒ <code>Array</code>
Retireve the dialogs that have been created.

**Returns**: <code>Array</code> - dialogs  

***
<a name="DialogManager+getInstanceName"></a>

#### dialogManager.getInstanceName() ⇒ <code>string</code>
**Returns**: <code>string</code> - instanceName - The name of dialogManager instance  

***
<a name="DialogManager+getLastDialogInstance"></a>

#### dialogManager.getLastDialogInstance(definition, [instanceName]) ⇒ [<code>Dialog</code>](#Dialog)
Returns the last dialog instance of the provided instanceName. In case of there is no previous one with the provided instnaceName, we will create new dialog instance with the provide instancName.

**Returns**: [<code>Dialog</code>](#Dialog) - dialog  
**Params**

- definition <code>Object</code> - The definition of the new [Dialog](#Dialog)
- [instanceName] <code>string</code> - The (id) name of the new dialog instance


***
<a name="DialogManager+removeDialog"></a>

#### dialogManager.removeDialog(dialog)
Removes (splices) the dialog instance from dialogs,

**Params**

- dialog [<code>Dialog</code>](#Dialog)


***
<a name="Dialog"></a>

### Dialog

* [Dialog](#Dialog)
    * [new Dialog(definition, dialogMananger, [instanceName])](#new_Dialog_new)
    * [dialog.before(eventName, handler)](#Dialog+before)
    * [dialog.close()](#Dialog+close)
    * [dialog.done()](#Dialog+done)
    * [dialog.getBeforeHandlersOf(eventName)](#Dialog+getBeforeHandlersOf) ⇒ <code>function</code> \| <code>Array.&lt;function()&gt;</code>
    * [dialog.getBody()](#Dialog+getBody) ⇒ <code>ReactComponent</code> \| <code>string</code>
    * [dialog.getHandlersOf(eventName)](#Dialog+getHandlersOf) ⇒ <code>function</code> \| <code>Array.&lt;function()&gt;</code>
    * [dialog.getInstanceName()](#Dialog+getInstanceName) ⇒ <code>string</code>
    * [dialog.getOverlayStyle()](#Dialog+getOverlayStyle) ⇒ <code>Object</code>
    * [dialog.getStyle()](#Dialog+getStyle) ⇒ <code>Object</code>
    * [dialog.getTitle()](#Dialog+getTitle) ⇒ <code>string</code>
    * [dialog.getZIndex()](#Dialog+getZIndex) ⇒ <code>int</code>
    * [dialog.isOpened()](#Dialog+isOpened) ⇒ <code>boolean</code>
    * [dialog.on(eventName, handler)](#Dialog+on)
    * [dialog.open()](#Dialog+open)
    * [dialog.set(definition, [value])](#Dialog+set)
    * [dialog.setBody(body)](#Dialog+setBody)
    * [dialog.setStyle(style)](#Dialog+setStyle)
    * [dialog.setTitle(title)](#Dialog+setTitle)
    * [dialog.setZIndex(zIndex)](#Dialog+setZIndex)


***
<a name="new_Dialog_new"></a>

#### new Dialog(definition, dialogMananger, [instanceName])
The instantiation of this class is done by [createDialog](#DialogManager+createDialog) of [DialogManager](#DialogManager)

**Params**

- definition <code>Object</code> - The definition of the dialog. By definition, we mean the properties like title, header, body ... etc.
    - .title <code>string</code> - The dialog's title.
    - [.allow_header] <code>boolean</code> <code> = false</code> - Whether allowing the header part of the dialog or not.
    - [.header] <code>ReactElement</code> - Sometimes, you might want to set custom header component. In this case the title will be ignore. You are responsible to set the title within the custom header.
    - [.body] <code>ReactElement</code> | <code>string</code> - The body component of the dialog. This ReactElement body will recieve the [dialog](#Dialog) within its props.
    - [.before_open] <code>function</code> | <code>Array.&lt;function()&gt;</code> - The handler(s) that will be invoked before dialog opening. It must return true to open the dialog, otherwise it will not.
    - [.on_open] <code>function</code> | <code>Array.&lt;function()&gt;</code> - The handler(s) that will be invoked once the dialog has been opened.
    - [.before_done] <code>function</code> | <code>Array.&lt;function()&gt;</code> - The handler(s) that will be invoked before dialog done (clicking on done button). It must return true to done the dialog, otherwise it will not.
    - [.on_done] <code>function</code> | <code>Array.&lt;function()&gt;</code> - The handler(s) that will be invoked once the dialog has been done.
    - [.before_close] <code>function</code> | <code>Array.&lt;function()&gt;</code> - The handler(s) that will be invoked before dialog closing. It must return true to close the dialog, otherwise it will not.
    - [.on_close] <code>function</code> | <code>Array.&lt;function()&gt;</code> - The handler(s) that will be invoked once the dialog has been closed.
    - [.close_by_overlay] <code>boolean</code> <code> = true</code> - Close the dialog when clicking on overlay layer or not.
    - [.style] <code>Object</code> - The style object for the dialog.
- dialogMananger [<code>DialogManager</code>](#DialogManager) - This param is being passed by outter dialogManager during `dm.createDialog({})`.
- [instanceName] <code>string</code> - The (id) name of the dialog instance.

**Example**  
```js
import {createDialogManager} from 'react-dialog-manager';const dm = createDialogManager({}, 'baseDM');const dialog = dm.createDialog({});
```

***
<a name="Dialog+before"></a>

#### dialog.before(eventName, handler)
Add event handler(s) before (open - done - close) actions.

**Params**

- eventName <code>string</code> - One of (open - done - close) event names.
- handler <code>function</code> | <code>Array.&lt;function()&gt;</code> - Event handler(s) that will be invoked with the dialog parameter before performing the corresponding action. **Note,** each handler must return `true` to go farther and execute the next steps.

**Example**  
```js
dialog.before('open', (dialog) => true );dialog.before('done', [(dialog) => true, (dialog) => true] );
```

***
<a name="Dialog+close"></a>

#### dialog.close()
First, we invoke all attached-event-handlers of before_close.All handlers should return true to go furhter and close (hide) the dialog.


***
<a name="Dialog+done"></a>

#### dialog.done()
Done with the dialog as if you press the done button of the dialog.


***
<a name="Dialog+getBeforeHandlersOf"></a>

#### dialog.getBeforeHandlersOf(eventName) ⇒ <code>function</code> \| <code>Array.&lt;function()&gt;</code>
**Returns**: <code>function</code> \| <code>Array.&lt;function()&gt;</code> - handler - Event handler(s) that will be invoked with the dialog parameter before performing the corresponding action.  
**Params**

- eventName <code>string</code> - One of (open - done - close) event names.


***
<a name="Dialog+getBody"></a>

#### dialog.getBody() ⇒ <code>ReactComponent</code> \| <code>string</code>
**Returns**: <code>ReactComponent</code> \| <code>string</code> - body  

***
<a name="Dialog+getHandlersOf"></a>

#### dialog.getHandlersOf(eventName) ⇒ <code>function</code> \| <code>Array.&lt;function()&gt;</code>
**Returns**: <code>function</code> \| <code>Array.&lt;function()&gt;</code> - handler - Event handler(s) that will be invoked with the dialog parameter once the corresponding action is performed.  
**Params**

- eventName <code>string</code> - One of (open - done - close) event names.


***
<a name="Dialog+getInstanceName"></a>

#### dialog.getInstanceName() ⇒ <code>string</code>
**Returns**: <code>string</code> - instanceName - The name of dialog instance  

***
<a name="Dialog+getOverlayStyle"></a>

#### dialog.getOverlayStyle() ⇒ <code>Object</code>
**Returns**: <code>Object</code> - overlayStyle  

***
<a name="Dialog+getStyle"></a>

#### dialog.getStyle() ⇒ <code>Object</code>
**Returns**: <code>Object</code> - style - The (z-index) of the dialog.  

***
<a name="Dialog+getTitle"></a>

#### dialog.getTitle() ⇒ <code>string</code>
**Returns**: <code>string</code> - title - The dialog's title.  

***
<a name="Dialog+getZIndex"></a>

#### dialog.getZIndex() ⇒ <code>int</code>
**Returns**: <code>int</code> - zIndex - The (z-index) of the dialog.  

***
<a name="Dialog+isOpened"></a>

#### dialog.isOpened() ⇒ <code>boolean</code>
retrieve the (open/shown) state of dialog

**Returns**: <code>boolean</code> - IS_OPENED  

***
<a name="Dialog+on"></a>

#### dialog.on(eventName, handler)
Add event handler(s) once (open - done - close) actions are performed.

**Params**

- eventName <code>string</code> - One of (open - done - close) event names.
- handler <code>function</code> | <code>Array.&lt;function()&gt;</code> - Event handler(s) that will be invoked with the dialog parameter once the corresponding action is performed.

**Example**  
```js
dialog.on('done', (dialog) => console.log('dialog has been done') );dialog.on('close', [(dialog) => console.log('dialog has been closed'), (dialog) => true] );
```

***
<a name="Dialog+open"></a>

#### dialog.open()
First, we invoke all attached-event-handlers of before_open.All handlers should return true to go furhter and open (show) the dialog.


***
<a name="Dialog+set"></a>

#### dialog.set(definition, [value])
set definition for the dialog

**Params**

- definition <code>Object</code> | <code>string</code> - Set the definition of the [Dialog](#Dialog). You can set one property with the corresponding value.
- [value] <code>\*</code> - In case of setting one property of definition, you could add the corresponding value.

**Example**  
```js
let dialogManager = createDialogsManager();let dialog = dialogManager.createDialog();dialog.set({	title: 'Hello World!',	body: 'good morning'});dialog.set('title', 'New Title Here');
```

***
<a name="Dialog+setBody"></a>

#### dialog.setBody(body)
**Params**

- body <code>ReactComponent</code> | <code>string</code> - Set dialog's body.


***
<a name="Dialog+setStyle"></a>

#### dialog.setStyle(style)
**Params**

- style <code>Object</code> - The style of the dialog.


***
<a name="Dialog+setTitle"></a>

#### dialog.setTitle(title)
**Params**

- title <code>string</code> - Set the dialog's title.


***
<a name="Dialog+setZIndex"></a>

#### dialog.setZIndex(zIndex)
**Params**

- zIndex <code>int</code> - The (z-index) of the dialog. Usually, manipulated by dialogManager.


***


## todo

- [ ] manage WAI & scrolling
- [ ] manage keyboard interaction
- [ ] add more functionalities and options
- [ ] improve docs
- [ ] write some examples & demos
- [ ] make some styles & css
- [ ] add effects & animation features
- [ ] design logo & add some demo pics

## Contribution

All contribution will be appreciated. **Remember** to write test cases and documented code.
