import React from 'react';
import {shallow} from 'enzyme';
import Dialog from './Dialog';
import DialogComponent from './DialogComponent';


describe('DialogComponent', () => {

	let wrapper;
	let dialog = new Dialog();

	beforeEach(() => {
		wrapper = shallow(<DialogComponent dialog={dialog} />);
	});

	describe('Dialog Structure', () => {
	
		it('should render overlay element with dm-overlay class and the correspnding z-index style', () => {
			expect(wrapper.find('.dm-overlay').length).toBe(1);
			expect(wrapper.find('.dm-overlay').prop('style')).toEqual({zIndex: 1000});
		});

		it('should render dialog element with dm-dialog class', () => {
			expect(wrapper.find('.dm-dialog').length).toBe(1);
		});

		it('should render dialog element with custom style', () => {
			let style = {width: '600px'};
			dialog = new Dialog({style});
			wrapper = shallow(<DialogComponent dialog={dialog} />);
			expect(wrapper.find('.dm-dialog').prop('style')).toBe(style);
			//console.log(wrapper.debug())
			//dialog.set('title', 'hhhhh')
			//console.log(wrapper.debug())
		});

		it('should render main containers like header, body, footer, close icon, primary/secondry btns ... containers', () => {
			expect(wrapper.find('.dm-close-icon-con').length).toBe(1);
			expect(wrapper.find('.dm-header-con').length).toBe(1);
			expect(wrapper.find('.dm-body-con').length).toBe(1);
			expect(wrapper.find('.dm-footer-con').length).toBe(1);
			expect(wrapper.find('.dm-footer-con').find('.dm-primary-con').length).toBe(1);
		});

		
		describe('Header Of The Dialog', () => {

			it('should have title element in case of no custom header', () => {
				expect(wrapper.find('.dm-header-con').find('.title').length).toBe(1);
			});

			it('should not be there header container in case of allow_header equals false', () => {
				dialog = new Dialog({
					allow_header: false
				});
				wrapper = shallow(<DialogComponent dialog={dialog} />);
				expect(wrapper.find('.dm-header-con').length).toBe(0);
			});

			it('should render myTitleIsHello when define it within the dialog definition', () => {
				dialog = new Dialog({
					title: 'myTitleIsHello'
				});
				wrapper = shallow(<DialogComponent dialog={dialog} />);
				expect(wrapper.find('.dm-header-con').find('.title').text()).toBe('myTitleIsHello');
			});

			it('should render (DOM node) custom header element', () => {
				dialog = new Dialog({
					header: <div className="custom-header"><h1>testTitle</h1></div>
				});
				wrapper = shallow(<DialogComponent dialog={dialog} />);
				//console.log(wrapper.debug())
				expect(wrapper.find('.custom-header').length).toBe(1);
				expect(wrapper.find('.custom-header').find('h1').length).toBe(1);
				expect(wrapper.find('.custom-header').find('h1').text()).toBe('testTitle');
			});

			it('should render (React Component) custom header element with dialog & dialogComponent props', () => {
				
				function DumpComponent(props) {
					return (<div className="custom-header"><h1>testTitle</h1></div>);
				}

				dialog = new Dialog({
					header: <DumpComponent />
				});
				wrapper = shallow(<DialogComponent dialog={dialog} />);
				expect(wrapper.find(DumpComponent).length).toBe(1);
				expect(wrapper.find(DumpComponent).prop('dialog')).toBe(dialog);
				expect(wrapper.find(DumpComponent).prop('dialogComponent')).toBe(wrapper.instance());
			});

		});


		describe('Footer Structure', () => {
			

			it('should have containers for primary-btns and secondary-btns within footer', () => {
				expect(wrapper.find('.dm-primary-con').length).toBe(1);
				expect(wrapper.find('.dm-secondary-con').length).toBe(1);
			});

			describe('Primary Buttons', () => {
				
				it('should have, by default, done & cancel primary bottons', () => {
					expect(wrapper.find('.dm-primary-con').find('.dm-done-btn').length).toBe(1);
					expect(wrapper.find('.dm-primary-con').find('.dm-cancel-btn').length).toBe(1);
				});
				
			});

		});

		describe('Body Structure', () => {
			

			it('should render "hello world" text as body when setting body: "hello world"', () => {
				dialog = new Dialog({
					body: "hello world"
				});
				wrapper = shallow(<DialogComponent dialog={dialog} />);
				expect(wrapper.find('.dm-body-con').text()).toBe('hello world');
			});

			it('should render the <TestBody /> reactElement and pass the dialog to it within props', () => {
				function TestBody(){}
				dialog = new Dialog({
					body: <TestBody />
				});
				wrapper = shallow(<DialogComponent dialog={dialog} />);
				expect(wrapper.find('.dm-body-con').contains(<TestBody dialog={dialog} />)).toBe(true);
			});

		});

	});

	describe('Dialog Behaviour', () => {

		it('should make data-display attr of overlay element equal false before opening', () => {
			expect(wrapper.find('.dm-overlay').prop('data-display')).toBe(false);
		});

		it('should make data-display attr of overlay element equal true after opening', () => {
			dialog.open();
			expect(wrapper.find('.dm-overlay').prop('data-display')).toBe(true);
		});

		it('should update title after setting new title in case of no custom header', () => {
			dialog = new Dialog({
				title: 'testTitle'
			});
			wrapper = shallow(<DialogComponent dialog={dialog} />);
			dialog.set('title', 'newTitle');
			expect(wrapper.find('.dm-header-con').find('.title').text()).toBe('newTitle');
		});

		it('should update body after setting new body', () => {
			dialog = new Dialog({
				body: 'testBody'
			});
			wrapper = shallow(<DialogComponent dialog={dialog} />);
			dialog.setBody('newbody');
			expect(wrapper.find('.dm-body-con').text()).toBe('newbody');
		});

		it('should update style after setting new style', () => {
			dialog = new Dialog({
				style: {width: '200px'}
			});
			wrapper = shallow(<DialogComponent dialog={dialog} />);
			let newStyle = {width: '500px'};
			dialog.setStyle(newStyle)
			expect(wrapper.find('.dm-dialog').prop('style')).toBe(newStyle);
		});

		it('should close the opened dialog after clicking on the overlay', () => {
			dialog.open();
			wrapper.find('.dm-overlay').simulate('click', {
				preventDefault: () => true,
				target: {
					className: 'dm-overlay'
				}
			});
			expect(wrapper.find('.dm-overlay').prop('data-display')).toBe(false);
		});

		it('should not close the opened dialog after clicking on the overlay in case of the close_by_overlay is false', () => {
			dialog = new Dialog({
				close_by_overlay: false
			});
			wrapper = shallow(<DialogComponent dialog={dialog} />);
			dialog.open();
			wrapper.find('.dm-overlay').simulate('click', {
				preventDefault: () => true,
				target: {
					className: 'dm-overlay'
				}
			}); 
			expect(wrapper.find('.dm-overlay').prop('data-display')).toBe(true);
		});

		it('should close the opened dialog after clicking on the close (x)icon', () => {
			dialog.open();
			wrapper.find('.dm-close-icon-con').simulate('click', {
				preventDefault: () => true
			});
			expect(wrapper.find('.dm-overlay').prop('data-display')).toBe(false);
		});


		it('should invoke dialog.done() when clicking on done btn of the opened dialog', () => {
			dialog.done = jest.fn();
			dialog.open();
			wrapper.find('.dm-done-btn').simulate('click', {
				preventDefault: () => true
			}); 
			expect(dialog.done).toHaveBeenCalled();
		});

		it('should invoke dialog.close() when clicking on cancel btn of the opened dialog', () => {
			dialog.close = jest.fn();
			dialog.open();
			wrapper.find('.dm-cancel-btn').simulate('click', {
				preventDefault: () => true
			}); 
			expect(dialog.close).toHaveBeenCalled();
		});


	});

});

it('demo', ()=>{expect(1).toBe(1)});
