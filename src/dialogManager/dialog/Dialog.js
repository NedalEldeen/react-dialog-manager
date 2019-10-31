class Dialog{
	/**
	* The instantiation of this class is done by 
	* [createDialog]{@link DialogManager#createDialog} of {@link DialogManager}
	* @example
	* import {createDialogManager} from 'react-dialog-manager';
	*
	* const dm = createDialogManager({}, 'baseDM');
	* const dialog = dm.createDialog({});
	*
	* @param {Object} definition - The definition of the dialog. By definition, we mean the properties like title, header, body ... etc. 
	* @param {string} definition.title - The dialog's title.
	* @param {boolean} [definition.allow_header=false] - Whether allowing the header part of the dialog or not.
	* @param {ReactElement} [definition.header=undefined] - Sometimes, you might want to set custom header component. In this case the title will be ignore. You are responsible to set the title within the custom header.
	* @param {ReactElement|string} [definition.body=undefined] - The body component of the dialog. This ReactElement body will recieve the [dialog]{@link Dialog} within its props.
	* @param {Function|Function[]} [definition.before_open] - The handler(s) that will be invoked before dialog opening. It must return true to open the dialog, otherwise it will not.
	* @param {Function|Function[]} [definition.on_open] - The handler(s) that will be invoked once the dialog has been opened.
	* @param {Function|Function[]} [definition.before_done] - The handler(s) that will be invoked before dialog done (clicking on done button). It must return true to done the dialog, otherwise it will not.
	* @param {Function|Function[]} [definition.on_done] - The handler(s) that will be invoked once the dialog has been done.
	* @param {Function|Function[]} [definition.before_close] - The handler(s) that will be invoked before dialog closing. It must return true to close the dialog, otherwise it will not.
	* @param {Function|Function[]} [definition.on_close] - The handler(s) that will be invoked once the dialog has been closed.
	* @param {boolean} [definition.close_by_overlay=true] - Close the dialog when clicking on overlay layer or not.
	* @param {Object} [definition.style] - The style object for the dialog.
	* @param {DialogManager} dialogMananger - This param is being passed by outter dialogManager during `dm.createDialog({})`.
	* @param {string} [instanceName] - The (id) name of the dialog instance.
	*/
	constructor(definition = {}, dialogMananger, instanceName = ''){ 
		/**
		* @private
		* @param {string} instanceName - The name of dialog instance
		*/
		this.instanceName = instanceName;
		/**
		* @private
		* this property determines if the dialog is opened (shown) or not
		* @param {boolean} IS_OPEN
		*/
		this.IS_OPENED = false;
		/**
		* @private
		* each dialog instance has a corresponding react component (DialogComponent)
		* this property will be assigned when the react component has been instantiated
		* @param {DialogComponent} _reactComponent
		*/
		this._reactComponent = undefined;
		/*
		* @private
		* this object stores each attached-handlers of events
		* @param {Object} eventHandlers
		*/
		this.eventHandlers = {
			before: {
				open: [],
				done: [],
				close: [],
			},
			on: {
				open: [],
				done: [],
				close: [],
			}
		};
		/*
		* @private
		* @param {boolean} close_by_overlay
		*/
		this.close_by_overlay = true;
		/**
		* @private
		* @param {boolean} allow_header
		*/
		this.allow_header = true;
		/**
		* @private
		* @param {string} title - of the dialog
		*/
		this.title = '';
		/*
		* @private
		* @param {ReactComponent} header
		*/
		this.header = undefined;
		/**
		* @private
		* @param {ReactComponent|sting} body
		*/
		this.body = undefined;
		/**
		* @private
		* @param {int} zIndex - the (z-index) of the dialog.
		*/
		this.zIndex = 1000;
		/**
		* @private
		* @param {Object} style - the style of the dialog.
		*/
		this.style = {};

		// parse the dialog's definition once instantiation
		this._parseDefinition(definition);
	}

	/*
	* @private
	* serialize and make any required validation
	*/
	_parseDefinition(definition){
		for(let key in definition){
			if(key === 'before_open')
				this.before('open', definition[key]);
			
			if(key === 'on_open')
				this.on('open', definition[key]);
			
			if(key === 'before_done')
				this.before('done', definition[key]);
			
			if(key === 'on_done')
				this.on('done', definition[key]);
			
			if(key === 'before_close')
				this.before('close', definition[key]);
			
			if(key === 'on_close')
				this.on('close', definition[key]);

			if(key === 'allow_header')
				this['allow_header'] = definition[key];

			if(key === 'title')
				this['title'] = definition[key];
			
			if(key === 'header')
				this['header'] = definition[key];

			if(key === 'body')
				this['body'] = definition[key];
			
			if(key === 'close_by_overlay')
				this['close_by_overlay'] = definition[key];

			if(key === 'style')
				this['style'] = definition[key];

		}
	}
	/**
	* @returns {string} instanceName - The name of dialog instance
	*/
	getInstanceName(){
		return this.instanceName;
	}
	/*
	* set the dialogCompeont 
	* this method is usually invoked in dialogComponent constructor
	* @param {DialogManagerComponent} comp
	*/
	setReactComponent(comp){
		this._reactComponent = comp;
	}
	/*
	* @return {DialogComponent} comp
	*/
	getReactComponent(){
		return this._reactComponent;
	}
	/**
	* @param {int} zIndex - The (z-index) of the dialog. Usually, manipulated by dialogManager.
	*/
	setZIndex(zIndex){
		this.zIndex = parseInt(zIndex);
		this._dialogHasBeenUpdated(); // say dialog updated -> re-render
	}
	/**
	* @return {int} zIndex - The (z-index) of the dialog.
	*/
	getZIndex(){
		return this.zIndex;
	}
	/**
	* @param {string} title - Set the dialog's title.
	*/
	setTitle(zIndex){
		this.title = title;
		this._dialogHasBeenUpdated(); // say dialog updated -> re-render
	}
	/**
	* @return {string} title - The dialog's title.
	*/
	getTitle(){
		return this.title;
	}
	/**
	* @param {Object} style - The style of the dialog.
	*/
	setStyle(style){
		this.style = style;
		this._dialogHasBeenUpdated(); // say dialog updated -> re-render
	}
	/**
	* @return {Object} style - The (z-index) of the dialog.
	*/
	getStyle(){
		return this.style;
	}
	/**
	* @param {ReactComponent|string} body - Set dialog's body.
	*/
	setBody(body){
		this.body = body;
		this._dialogHasBeenUpdated(); // say dialog updated -> re-render
	}
	/**
	* @returns {ReactComponent|string} body
	*/
	getBody(){
		return this.body;
	}
	/**
	* @returns {Object} overlayStyle
	*/
	getOverlayStyle(){
		return {
			zIndex: this.getZIndex()
		};
	}
	/**
	* retrieve the (open/shown) state of dialog
	* @return {boolean} IS_OPENED
	*/
	isOpened(){
		return this.IS_OPENED;
	}
	/**
	* @private
	* this method will be invoked before we open the dialog.
	* it makes any stuff we want to do before dialog opening like 
	* invoking the event-handlers of before_open
	* @return {boolean} allowOpen (is everything okay?)
	*/
	_onBeforeOpen(){
		let allowOpen = true;
		let ds = this.getBeforeHandlersOf('open');
		if(ds.length > 0){
			for(let i = 0; i < ds.length; i++){
				let isTrue = ds[i](this); 
				if(allowOpen && !isTrue) // make allowOpen is flase if any of handlers return false
					allowOpen = false;
			}
		}
		return allowOpen;
	}
	/**
	* @private
	* this method will be invoked after we open the dialog.
	* it makes any stuff we want to do after dialog opening like 
	* invoking the event-handlers of on_open
	*/
	_onOpen(){
		let handlers = this.getHandlersOf('open');
		if(handlers.length > 0){
			for(let i = 0; i < handlers.length; i++){
				handlers[i](this);
			}
		}
	}
	/**
	* First, we invoke all attached-event-handlers of before_open.
	* All handlers should return true to go furhter and open (show) the dialog.
	*/
	open(){
		if(this._onBeforeOpen()){
			this._setIsOpenedState(true); // update the state
			this._onOpen(); // invoke each handler of on_open
		}
	}
	/**
	* @private
	* this method will be invoked before we close the dialog.
	* it makes any stuff we want to do before dialog closing like 
	* invoking the event-handlers of before_close
	* @return {boolean} allowNext (is everything okay?)
	*/
	_onBeforeClose(){
		let allowNext = true;
		let ds = this.getBeforeHandlersOf('close');
		if(ds.length > 0){
			for(let i = 0; i < ds.length; i++){
				let isTrue = ds[i](this); 
				if(allowNext && !isTrue) // make allowNext is flase if any of handlers return false
					allowNext = false;
			}
		}
		return allowNext;
	}
	/**
	* @private
	* this method will be invoked after we close the dialog.
	* it makes any stuff we want to do after dialog closing like 
	* invoking the event-handlers of on_close
	*/
	_onClose(){
		let handlers = this.getHandlersOf('close');
		if(handlers.length > 0){
			for(let i = 0; i < handlers.length; i++){
				handlers[i](this);
			}
		}
	}
	/**
	* First, we invoke all attached-event-handlers of before_close.
	* All handlers should return true to go furhter and close (hide) the dialog.
	*/
	close(){
		if(this._onBeforeClose()){
			this._setIsOpenedState(false); // update the state.
			this._onClose(); // invoke on_close handler
		}
	}
	/**
	* @private
	* @param {boolean} newState
	*/
	_setIsOpenedState(newState){
		if(this.IS_OPENED != newState){
			this.IS_OPENED = newState;
			this._dialogHasBeenUpdated();
		}
	}
	/**
	* @private
	* each time the dialog has been updated -> update the corresponding ReactDialogComponent.
	*/
	_dialogHasBeenUpdated(){
		if(!!this.getReactComponent()){
			this.getReactComponent().setState({
				dialog: this
			});
		}
	}
	/**
	* @private
	* parse the events.
	*/
	_parseEvent(time, eventName, handler){
		if(!!handler && !!this.eventHandlers[time][eventName]){
			if(Array.isArray(handler))
				this.eventHandlers[time][eventName] = [...this.eventHandlers[time][eventName], ...handler];
			if(typeof handler === 'function')
				this.eventHandlers[time][eventName].push(handler);
		}
	}
	/**
	* Add event handler(s) before (open - done - close) actions.
	* @param {string} eventName - One of (open - done - close) event names.
	* @param {function|function[]} handler - Event handler(s) that will be invoked with the dialog parameter before performing the corresponding action. **Note,** each handler must return `true` to go farther and execute the next steps.
	* @example
	* dialog.before('open', (dialog) => true );
	* dialog.before('done', [(dialog) => true, (dialog) => true] );
	*/
	before(eventName, handler){
		this._parseEvent('before', eventName, handler);
	}
	/**
	* Add event handler(s) once (open - done - close) actions are performed.
	* @param {string} eventName - One of (open - done - close) event names.
	* @param {function|function[]} handler - Event handler(s) that will be invoked with the dialog parameter once the corresponding action is performed.
	* @example
	* dialog.on('done', (dialog) => console.log('dialog has been done') );
	* dialog.on('close', [(dialog) => console.log('dialog has been closed'), (dialog) => true] );
	*/
	on(eventName, handler){
		this._parseEvent('on', eventName, handler);
	}
	/**
	* @param {string} eventName - One of (open - done - close) event names.
	* @return {function|function[]} handler - Event handler(s) that will be invoked with the dialog parameter once the corresponding action is performed.
	*/
	getHandlersOf(eventName){
		return this.eventHandlers['on'][eventName];
	}
	/**
	* @param {string} eventName - One of (open - done - close) event names.
	* @return {function|function[]} handler - Event handler(s) that will be invoked with the dialog parameter before performing the corresponding action.
	*/
	getBeforeHandlersOf(eventName){
		return this.eventHandlers['before'][eventName];
	}
	/**
	* @private
	* this method will be invoked before we done the dialog.
	* it makes any stuff we want to do before dialog done like 
	* invoking the event-handlers of before_done
	* @return {boolean} allowDone (is everything okay?)
	*/
	_onBeforeDone(){
		let allowNext = true;
		let ds = this.getBeforeHandlersOf('done');
		if(ds.length > 0){
			for(let i = 0; i < ds.length; i++){
				let isTrue = ds[i](this); 
				if(allowNext && !isTrue) // make allowNext is flase if any of handlers return false
					allowNext = false;
			}
		}
		return allowNext;
	}
	/**
	* @private
	* this method will be invoked after we done the dialog.
	* it makes any stuff we want to do after dialog done like 
	* invoking the event-handlers of on_done
	*/
	_onDone(){
		let handlers = this.getHandlersOf('done');
		if(handlers.length > 0){
			for(let i = 0; i < handlers.length; i++){
				handlers[i](this);
			}
		}
	}
	/**
	* Done with the dialog as if you press the done button of the dialog.
	*/
	done(){
		if(this._onBeforeDone()){
			this._setIsOpenedState(false);
			this._onDone();
		}
		
	}
	/**
	* set definition for the dialog
	* @param {Object|string} definition - Set the definition of the {@link Dialog}. You can set one property with the corresponding value.
	* @param {*} [value] - In case of setting one property of definition, you could add the corresponding value.
	* @example
	* let dialogManager = createDialogsManager();
	* let dialog = dialogManager.createDialog();
	* dialog.set({
	* 	title: 'Hello World!',
	* 	body: 'good morning'
	* });
	* dialog.set('title', 'New Title Here');
	*/
	set(def = {}, value){
		let definition = {};
		if(typeof def === 'string'){
			definition[def] = value;
		}else{
			definition = def;
		}
		this._parseDefinition(definition);
		this._dialogHasBeenUpdated();
	}
	/*
	*
	*/
	get(key){
		return this[key];
	}
}

export default Dialog;