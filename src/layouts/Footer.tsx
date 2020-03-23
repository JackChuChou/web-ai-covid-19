import React, { Component } from 'react';
import './Footer.scss';

interface IProps {
	// location: any
}

interface IStates { }

export default class Footer extends Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props);
	}

	render() {
        // const centerStyle = { justifyContent : 'center' };
        // const isCenter = this.props.location.pathname === '/model';
        return (
            <div className="footer">
                <p>Copyright &copy; Huazhong University of Science and Technology. All rights reserved. </p>
                <p>Contact isutian@gmail.com for the international collaboration of AI engine.</p> 
            </div>
        )
	}
}