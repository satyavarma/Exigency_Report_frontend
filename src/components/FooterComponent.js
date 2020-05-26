import React, { Component } from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='footer'>
              <p>Contact : <a href="mailto:N151282@rguktn.ac.in">ExigencyReport@rguktn.ac.in</a></p>
              <p>&copy;2020 CopyRight : Exigency Report</p>
            </div>
        );
    }
}

export default Footer;