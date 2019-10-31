import DialogManager from './DialogManager';


describe('Dialog Manager', () => {
	let dm;

	beforeEach(() => {
		dm = new DialogManager();
	});

	it('should contain the created dilalog', () => {
		let d = dm.createDialog();
		expect(dm.getDialogs()).toContain(d);
	});

	it('should contain the same number of created dilalogs', () => {
		let d1 = dm.createDialog();
		let d2 = dm.createDialog();
		expect(dm.getDialogs().length).toBe(2);
	});

	it('should splice the removed dialog', () => {
		let d = dm.createDialog();
		dm.removeDialog(d);
		expect(dm.getDialogs().length).toBe(0);
		expect(dm.getDialogs()).not.toContain(0);
	});

	it('should have the dialogs with the corresponding z-indices of them', () => {
		let d = dm.createDialog();
		let d2 = dm.createDialog();
		expect(d.getZIndex()).toBe(1000);
		expect(d2.getZIndex()).toBe(1001);
	});

	describe('getLastDialogInstance', () => {
		it('should create dialog if the there is no previous instance of provided instanceName', () => {
			let d = dm.getLastDialogInstance({}, 'basic_dialog');
			expect(dm.getDialogs().length).toBe(1);
			expect(dm.getDialogs()).toContain(d);
		});

		it('should return the created dialog with the same instanceName', () => {
			let d = dm.createDialog({}, 'basic_dialog');
			let l = dm.getLastDialogInstance({}, 'basic_dialog');
			
			expect(d).toBe(l);
			expect(dm.getDialogs().length).toBe(1);
		});
	});

});