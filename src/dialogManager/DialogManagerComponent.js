import React from 'react';
import PropTypes from 'prop-types';
import DialogComponent from './dialog/DialogComponent';

// import the DialogManager Class to check type
import DialogManager from './DialogManager';

export default class DialogManagerComponent extends React.Component{

	constructor(props){
		super(props);
		/*
		* @param {DialogManager|undefined} dialogManager
		*/
		this.dialogManager = this.props.manager || undefined;
		this.parseDialogManager();
	}
	/*
	*
	*/
	parseDialogManager(){
		if(!!this.dialogManager)
			this.dialogManager._setReactComponent(this);
	}
	/*
	* @param {DialogManager} dialogManager
	*/
	getDialogManager(){
		return this.dialogManager;
	}
	/*
	* it maps the dialogs into DialogComponents to be rendered
	*/
	getDialogComponents(){
		return this.getDialogManager()
				.getDialogs()
				.map((dialog, index) => <DialogComponent dialog={dialog} key={index} />);
	}
	/*
	* get the content that will be rendered within the div.dialog-man
	* check if the dialogManager props has been setted or not,
	* returm dialogComponentss, otherwise, return a hiden paragraph with "set dialogManager prop"
	*/
	getContent(){
		if(!!this.getDialogManager()){
			return this.getDialogComponents();
		}
		return (<p style={{display: 'none'}}>set dialogManager prop</p>);
	}
	/*
	*
	*/
	render(){
		return(
			<div className="dialog-man">{this.getContent()}</div>
		);
	}
}

// check type for DialogManagerComponent props
DialogManagerComponent.propTypes = {
	dialogManager: PropTypes.instanceOf(DialogManager).isRequired
};