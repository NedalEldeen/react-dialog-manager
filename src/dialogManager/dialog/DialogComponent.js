import React from 'react';
export default class DialogComponent extends React.Component{

	constructor(props){
		super(props);
		this.dialog = undefined;
		this.state = {
			dialog: undefined
		};
		this.parseDialog();
	}
	/*
	*
	*/
	parseDialog(){
		this.dialog = this.props.dialog;
		this.dialog.setReactComponent(this);
		/*this.setState({
			dialog: this.dialog
		});*/
	}
	/*
	*
	*/
	getDialog(){
		return this.state.dialog || this.dialog;
	}
	/*
	*
	*/
	getBody(){
		let b = this.getDialog().getBody();
		if(!!b && React.isValidElement(b))
			b = React.cloneElement(b, {dialog: this.dialog});
		return b;
	}
	/*
	*
	*/
	onOverlayCliked = (event) => {
		if(!!this.getDialog().get('close_by_overlay')){
			if(!!event.target.className.match('dm-overlay')){
				this.getDialog().close();
			}
		}
		event.preventDefault();
	}
	/*
	* it's an event handler for clicking of dialog's close icon
	*/
	onCloseIconCliked = (event) => {
		this.getDialog().close();
		event.preventDefault();
	}
	/*
	* it's an event handler for clicking of dialog's done btn
	*/
	onDoneBtnCliked = (event) => {
		this.getDialog().done()
		event.preventDefault();
	}
	/*
	* it's an event handler for clicking of dialog's cancel btn
	*/
	onCancelBtnCliked = (event) => {
		this.getDialog().close()
		event.preventDefault();
	}
	/*
	*
	*/
	renderHeader(){
		if(!this.getDialog().get('allow_header')){
			return;
		}else{
			let headerContent;
			if(!!this.getDialog().get('header')){
				let passedHeader = this.getDialog().get('header');
				if(typeof passedHeader.type == 'function'){ 
					headerContent = React.cloneElement(
						this.getDialog().get('header'),
						{
							dialog: this.dialog,
							dialogComponent: this
						}
					);
				}else{
					headerContent = passedHeader;
				}
				
			}else{
				headerContent = <h3 className="title">{this.getDialog().get('title')}</h3>;
			}
			return (
				<div className="dm-header-con">
					{headerContent}
				</div>
			);
		}
	}
	/*
	*
	*/
	render(){
		return(
			<div className="dm-overlay" data-display={this.getDialog().isOpened()} onClick={this.onOverlayCliked} style={this.getDialog().getOverlayStyle()}>
				<div className="dm-dialog" style={this.getDialog().getStyle()}>
					<div className="dm-close-icon-con" onClick={this.onCloseIconCliked}>
						<span>&times;</span>
					</div>
					{this.renderHeader()}
					<div className="dm-body-con">{this.getBody()}</div>
					<div className="dm-footer-con">
						<div className="dm-primary-con">
							<button className="dm-done-btn" onClick={this.onDoneBtnCliked}>Done</button>
							<button className="dm-cancel-btn" onClick={this.onCancelBtnCliked}>Cancel</button>
						</div>
						<div className="dm-secondary-con"></div>
					</div>
				</div>
			</div>
		);
	}
}