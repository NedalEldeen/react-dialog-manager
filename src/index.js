import DialogManager from './dialogManager/DialogManager';
import DialogManagerComponent from './dialogManager/DialogManagerComponent';

/**
 * This module is responsible for handling the instantiation of DialogManager and also, exporting the DialogManagerComponent
 * @module react-dialog-manager
 * @alias module:react-dialog-manager
 */


/**
* @private
* @param {Array} instances of DialogManager
*/
const dmInstances = [];

/**
* It will instantiate a new instance of DialogManager and store it as last instance.
* @param {Object} setting 
* @param {Sting} instanceName - The name used to identify the DialogManager instance. It's helpful wheu you call getLastDMInstance with the same instanceName
* @return {DialogManager} dialogManager 
*/
export function createDialogManager(setting, instanceName){
	let lastInstance = new DialogManager(setting, instanceName);
	dmInstances.push(lastInstance);
	return lastInstance;
}
/**
* Returns the last instance of DialogManger with the same provided instanceName param.
* In case of, there is no previous instance, it instantiates new one and returns it.
* @param {Object} setting 
* @param {Sting} instanceName=''
* @return {DialogManager} dialogManager
*/
export function getLastDMInstance(setting, instanceName = ''){
	let lastInstance;
	if(dmInstances.length > 0){
		for(let i = 0; i < dmInstances.length; i++){
			if(dmInstances[i].getInstanceName() == instanceName){
				lastInstance = dmInstances[i];
				break;
			}
		}
	}
	if(!lastInstance){
		lastInstance = new DialogManager(setting, instanceName);
		dmInstances.push(lastInstance);
	}
	return lastInstance;
}
/**
* @returns {Array} intances  
*/
export function getDMInstances(){
	return dmInstances;
}

export{
	/**
	* @param {ReactComponent} DialogManagerComponent
	* @example
	* const dm = createDialogManager();
	* <DialogManagerComponent dialogManager="dm" />
	*/
	DialogManagerComponent
};
