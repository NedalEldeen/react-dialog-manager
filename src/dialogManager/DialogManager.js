import Dialog from './dialog/Dialog';
import './DialogManager.scss';


class DialogManager{
	/**
	* The instantiation of this class is done by 
	* [createDialogManager]{@link #module_react-dialog-manager.createDialogManager}
	* @example
	* import {createDialogManager} from 'react-dialog-manager';
	*
	* const dm = createDialogManager({}, 'baseDM');
	*
	* @param {Object} setting - Setting for the dialogs manager.
	* @param {int} [setting.initial_z_index=1000] - The start point where the z-indices of dialogs with begin. Each new dialog the `initial_z_index` will be incremented. For example; first dialog will have `initial_z_index`, second one will have `initial_z_index + 1` and so on.
	* @param {string} [instanceName] - The name of DialogManager instance
	*/
	constructor(setting, instanceName = ''){
		/**
		* @private
		* @param {string} instanceName 
		*/
		this.instanceName = instanceName;
		/*
		* @param {DialogManagerComponent} comp
		*/
		this._reactComponent = undefined;
		/**
		* @private
		* @param {Array} dialogs - the dialogs have been created by dialogManager
		*/
		this.dialogs = [];
		/**
		* @private 
		* @param {int} initialZIndex
		*/
		this.initialZIndex = 1000;
	}

	/*
	* 
	*/
	_parseSetting(setting){
		for(let key in setting){
			if(key === 'initial_z_index')
				this.initialZIndex = parseInt(setting['key']);
		}
	}
	
	/**
	* @returns {string} instanceName - The name of dialogManager instance
	*/
	getInstanceName(){
		return this.instanceName;
	}
	/*
	* set the dialogManagetCompeont 
	* this method is usually invoked in dialogManagerComponent constructor
	* @param {DialogManagerComponent} comp
	*/
	_setReactComponent(comp){
		this._reactComponent = comp;
	}
	/*
	* @return {DialogManagerComponent} comp
	*/
	_getReactComponent(){
		return this._reactComponent; 
	}
	/*
	* @return {int} inital_z_index
	*/
	getInitailZIdex(){
		return this.initialZIndex; 
	}
	/**
	* Creates new dialog instance, and stores (pushs) it into the dialogs.
	* @param {Object} definition - The definition of the new {@link Dialog}
	* @param {string} [instanceName] - The (id) name of the new dialog instance
	* @return {Dialog} dialog
	*/
	createDialog(definition, instanceName = ''){
		var dialog = new Dialog(definition, this, instanceName);
		dialog.setZIndex(this.getInitailZIdex() + this.getDialogs().length); // increment the z-index of the new dialog
		this.dialogs.push(dialog);
		this._dialogsHaveBeenUpdated(); // say that the dialogs have been updated
		return dialog;
	}
	/**
	* Returns the last dialog instance of the provided instanceName. In case of there is no previous one with the provided instnaceName, we will create new dialog instance with the provide instancName.
	* @param {Object} definition - The definition of the new {@link Dialog}
	* @param {string} [instanceName] - The (id) name of the new dialog instance
	* @return {Dialog} dialog
	*/
	getLastDialogInstance(definition, instanceName = ''){
		let dialog;
		if(this.getDialogs().length > 0){
			for(let i = 0; i < this.getDialogs().length; i++){
				if(this.getDialogs()[i].getInstanceName() == instanceName){
					dialog = this.getDialogs()[i];
					break;
				}
			}
		}
		if(!dialog){
			dialog = this.createDialog(definition, instanceName);
		}
		return dialog;
	}
	/**
	* Removes (splices) the dialog instance from dialogs,
	* @param {Dialog} dialog
	*/
	removeDialog(dialog){
		this.getDialogs().splice(this.getDialogs().indexOf(dialog), 1);
		this._dialogsHaveBeenUpdated(); //say that the dialogs have been updated
	}
	/**
	* Retireve the dialogs that have been created.
	* @return {Array} dialogs
	*/
	getDialogs(){
		return this.dialogs;
	}
	/*
	* each time when there is a change in dialogs like create/remove dialog,
	* we invoke this method which update (set new) state of the react component (DialogManagerComponent)
	*/
	_dialogsHaveBeenUpdated(){
		if(!!this._reactComponent){
			this._getReactComponent().setState({
				dialogManager: this
			});
		}
	}
}

export default DialogManager;
