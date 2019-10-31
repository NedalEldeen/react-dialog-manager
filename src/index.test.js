import {createDialogManager, getLastDMInstance, getDMInstances} from './index';

describe('react-dialog-manager module', () => {
	describe('getLastDMInstance', () => {
		it('should instantiate a new instnace when call getLastInstance even if there is no previous one', () => {
			let dm = getLastDMInstance({});
			expect(getDMInstances()).toContain(dm); 
		});

		it('should give the last instnace, of provided instnaceName param, when call getLastInstance', () => {
			let instanceX = createDialogManager({}, 'x');
			let instanceY = createDialogManager({}, 'y');
			let instanceZ = createDialogManager({}, 'z');
			
			let lastInstanceX = getLastDMInstance({}, 'x');
			expect(lastInstanceX).toBe(instanceX); 
		});

	});
});