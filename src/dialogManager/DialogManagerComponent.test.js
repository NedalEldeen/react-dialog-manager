import React from 'react';
import { shallow } from 'enzyme';
import DialogManagerComponent from './DialogManagerComponent';
import DialogManager from './DialogManager';
import DialogComponent from './dialog/DialogComponent';

describe('DialogManagerComponent', () => {

	describe('Component has not the DialogManager prop', () => {
		it('should render a hiden paragraph text telling "set dialogManager prop" in case of it has not setted', () => {
			let wrapper = shallow(<DialogManagerComponent />);
			expect(wrapper.find('p').length).toBe(1);
			expect(wrapper.find('p').text()).toBe('set dialogManager prop');
			expect(wrapper.find('p').prop('style')).toEqual({display: 'none'});
		});
	});
	
	describe('Component has the DialogManager prop', () => {
		let dm;
		let wrapper;
		beforeEach(() => {
			dm = new DialogManager();
			wrapper = shallow(<DialogManagerComponent manager={dm} />);
		});

		it('should render div with dialog-man class', () => {
			expect(wrapper.find('div.dialog-man').length).toBe(1);
		});

		it('should render a dialog component when creating new dialog', () => {
			let dialog = dm.createDialog();
			expect(wrapper.find(DialogComponent).length).toBe(1);
		});

		it('should render two dialog component when creating two dialog', () => {
			let dialog = dm.createDialog();
			let dialog2 = dm.createDialog();
			expect(wrapper.find(DialogComponent).length).toBe(2);
		});

		it('should remove the rendered dialogComponeted after remove the dailog from dialog dialogManager ', () => {
			let dialog = dm.createDialog();
			dm.removeDialog(dialog);
			expect(wrapper.find(DialogComponent).length).toBe(0);
		});

	});

	


});