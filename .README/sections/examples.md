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
