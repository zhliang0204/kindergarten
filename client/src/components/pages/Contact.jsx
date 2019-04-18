import React, { Component } from 'react';
import { Button, } from 'reactstrap';

export default class Contact extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="contact">
        <div className="address-map">
          <div className="address">
            <p>Das China Büro e.V.</p>
            <p>Dunckerstr. 90 A</p>
            <p>10437 Berlin</p>
            <p>Tel: +49 - 30 - 51643460 </p>
            <p>Fax: +49 - 30- 51643463</p>
            <p>e-mail: <a href="mailto:info@daschinabuero.org">info@daschinabuero.org</a></p>
            <p>www.daschinabuero.org</p>

          
          </div>
          <div className="map"></div>
        </div>
        {this.props.isGerman && (<div className="german">german</div>)}
        {!this.props.isGerman && (<div className="chinese">捐赠</div>)}

      </div>
    )
  }
}
