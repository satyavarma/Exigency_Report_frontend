import React, {Component} from 'react';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1 className="header">
                    <span className="symbol">+</span>Exigency Report
                </h1>
            </div>
        );
    }
}

export default Header;