import Dialog from './Dialog';

describe('Dialog', () => {

	let dialog;

	beforeEach(() => {
		dialog = new Dialog();
	});

	it('make sure that the isOpened equals false once istantiate new dialog', () => {
		expect(dialog.isOpened()).toBe(false);
	});

	describe('The Opening Behaviour', () => {
		
		it('should make isOpened equal true when invoke opne method', () => {
			dialog.open();
			expect(dialog.isOpened()).toBe(true);
		});

		describe('Handlers Of Before-Opening', () => {

			it('should have the before_open handler when it is defined within dialog definition', () => {
				let handler = jest.fn();
				dialog = new Dialog({
					before_open: handler
				});
				expect(dialog.getBeforeHandlersOf('open')).toContain(handler);
			});

			it('should have many before_open handlers when they are defined within dialog definition', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				
				dialog = new Dialog({
					before_open: [handler1, handler2]
				});
				
				expect(dialog.getBeforeHandlersOf('open').length).toBe(2);
				expect(dialog.getBeforeHandlersOf('open')).toContain(handler1);
				expect(dialog.getBeforeHandlersOf('open')).toContain(handler2);
			});

			it('should have the before_open handler/s when adding it/them throught before method', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				
				dialog.before('open', handler1);
				dialog.before('open', [handler2, handler3]);
				
				expect(dialog.getBeforeHandlersOf('open').length).toBe(3);
				expect(dialog.getBeforeHandlersOf('open')).toContain(handler1);
				expect(dialog.getBeforeHandlersOf('open')).toContain(handler2);
				expect(dialog.getBeforeHandlersOf('open')).toContain(handler3);
			});

			it('should invoke the before_open handlers with dialog paramter before opening the dialog', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				dialog = new Dialog({
					before_open: handler1
				});
				dialog.before('open', handler2);
				dialog.open();
				expect(handler1).toHaveBeenCalledTimes(1);
				expect(handler1).toHaveBeenCalledWith(dialog);
				expect(handler2).toHaveBeenCalledTimes(1);
				expect(handler2).toHaveBeenCalledWith(dialog);
			});

			it('should not open the dialog if one of before-handlers return false', () => {
				let handler1 = jest.fn().mockImplementation(()=>false);
				dialog = new Dialog({
					before_open: handler1
				});
				dialog.open();
				expect(dialog.isOpened()).toBe(false);
			});

		});

		
		describe('Handlers Of On-Opening', () => {

			it('should have the on_open handler when define it within dialog definition', () => {
				let handler = jest.fn();
				dialog = new Dialog({
					on_open: handler
				});
				expect(dialog.getHandlersOf('open')).toContain(handler);
			});

			it('should have many on_open handlers when define them within dialog definition', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				
				dialog = new Dialog({
					on_open: [handler1, handler2]
				});
				
				expect(dialog.getHandlersOf('open').length).toBe(2);
				expect(dialog.getHandlersOf('open')).toContain(handler1);
				expect(dialog.getHandlersOf('open')).toContain(handler2);
			});

			it('should have the on_open handler/s when add it/them throught before method', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				
				dialog.on('open', handler1);
				dialog.on('open', [handler2, handler3]);
				
				expect(dialog.getHandlersOf('open').length).toBe(3);
				expect(dialog.getHandlersOf('open')).toContain(handler1);
				expect(dialog.getHandlersOf('open')).toContain(handler2);
				expect(dialog.getHandlersOf('open')).toContain(handler3);
			});

			it('should invoke the on_open handlers with dialog paramter after opening the dialog', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				dialog = new Dialog({
					on_open: handler1
				});
				dialog.on('open', handler2);
				dialog.open();
				expect(handler1).toHaveBeenCalledTimes(1);
				expect(handler1).toHaveBeenCalledWith(dialog);
				expect(handler2).toHaveBeenCalledTimes(1);
				expect(handler2).toHaveBeenCalledWith(dialog);
			});
			
		});

		

	});

	describe('The (Done & Closing) Behaviour', () => {

		it('should make isOpened equal false when invoke close method of opend dialog', () => {
			dialog.open();
			dialog.close();
			expect(dialog.isOpened()).toBe(false);
		});

		describe('Handlers Of (Before & On) Done', () => {

			it('should have the before_done handlers when define them within definition or using before method', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				dialog = new Dialog({
					before_done: handler1
				});
				dialog.before('done', [handler2, handler3]);
				expect(dialog.getBeforeHandlersOf('done').length).toBe(3);
			});

			it('should invoke the before_done handlers with dialog paramter when invoke done', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				dialog = new Dialog({
					before_done: [handler1, handler2]
				});
				dialog.before('done', handler3);

				dialog.open();
				dialog.done();
				
				expect(handler1).toHaveBeenCalledTimes(1);
				expect(handler1).toHaveBeenCalledWith(dialog);
				expect(handler2).toHaveBeenCalledTimes(1);
				expect(handler2).toHaveBeenCalledWith(dialog);
				expect(handler3).toHaveBeenCalledTimes(1);
				expect(handler3).toHaveBeenCalledWith(dialog);
			});

			it('should make isOpened equal false after invoking done', () => {
				
				dialog.open();
				dialog.done();
				
				expect(dialog.isOpened()).toBe(false);
			});

			it('should not done (hide) the dialog if one of before-done return false', () => {
				let handler1 = jest.fn().mockImplementation(()=>false);
				dialog = new Dialog({
					before_open: handler1
				});
				dialog.open();
				expect(dialog.isOpened()).toBe(false);
			});


			it('should invoke the on_done handlers with dialog paramter when invoke done', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				dialog = new Dialog({
					on_done: [handler1, handler2]
				});
				dialog.on('done', handler3);

				dialog.open();
				dialog.done();
				
				expect(handler1).toHaveBeenCalledTimes(1);
				expect(handler1).toHaveBeenCalledWith(dialog);
				expect(handler2).toHaveBeenCalledTimes(1);
				expect(handler2).toHaveBeenCalledWith(dialog);
				expect(handler3).toHaveBeenCalledTimes(1);
				expect(handler3).toHaveBeenCalledWith(dialog);
			});

		});


		describe('Handlers Of (Before & On) Close', () => {

			it('should invoke the before_close handlers with dialog paramter when invoke close', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				dialog = new Dialog({
					before_close: [handler1, handler2]
				});
				dialog.before('close', handler3);

				dialog.open();
				dialog.close();
				
				expect(handler1).toHaveBeenCalledTimes(1);
				expect(handler1).toHaveBeenCalledWith(dialog);
				expect(handler2).toHaveBeenCalledTimes(1);
				expect(handler2).toHaveBeenCalledWith(dialog);
				expect(handler3).toHaveBeenCalledTimes(1);
				expect(handler3).toHaveBeenCalledWith(dialog);
			});

			it('should make isOpened equal false after invoking close', () => {
				
				dialog.open();
				dialog.close();
				
				expect(dialog.isOpened()).toBe(false);
			});

			it('should not done (hide) the dialog if one of before-close return false', () => {
				let handler1 = jest.fn().mockImplementation(()=>false);
				dialog = new Dialog({
					before_close: handler1
				});
				dialog.close();
				expect(dialog.isOpened()).toBe(false);
			});


			it('should invoke the on_close handlers with dialog paramter when invoke close', () => {
				let handler1 = jest.fn();
				let handler2 = jest.fn();
				let handler3 = jest.fn();
				dialog = new Dialog({
					on_close: handler1
				});
				dialog.on('close', [handler2, handler3]);

				dialog.open();
				dialog.close();
				
				expect(handler1).toHaveBeenCalledTimes(1);
				expect(handler1).toHaveBeenCalledWith(dialog);
				expect(handler2).toHaveBeenCalledTimes(1);
				expect(handler2).toHaveBeenCalledWith(dialog);
				expect(handler3).toHaveBeenCalledTimes(1);
				expect(handler3).toHaveBeenCalledWith(dialog);
			});

		});


	});

	describe('_dialogHasBeenUpdated', () => {
		it('should be called after invoking open, done, close and set methods', () => {
			dialog._dialogHasBeenUpdated = jest.fn();
			dialog.open();
			expect(dialog._dialogHasBeenUpdated).toHaveBeenCalledTimes(1);
			dialog.close();
			expect(dialog._dialogHasBeenUpdated).toHaveBeenCalledTimes(2);
			dialog.open();
			expect(dialog._dialogHasBeenUpdated).toHaveBeenCalledTimes(3);
			dialog.done();
			expect(dialog._dialogHasBeenUpdated).toHaveBeenCalledTimes(4);
			dialog.set('title', 'testTitle');
			expect(dialog._dialogHasBeenUpdated).toHaveBeenCalledTimes(5);
		});
	});
	
	describe('set', () => {
		it('should return the setted values either setting in object or string types', () => {
			dialog.set({
				title: 'xTitle',
				body: 'xBody'
			});
			let style = {};
			dialog.set('style', style);
			expect(dialog.getTitle()).toBe('xTitle');
			expect(dialog.getBody()).toBe('xBody');
			expect(dialog.getStyle()).toBe(style);
		});
	});
	

});