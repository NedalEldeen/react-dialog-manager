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