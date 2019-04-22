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
          <div className="map" id="kgmap">
          
          </div>
        </div>
        {this.props.isGerman && (<div className="german">
          <h3>Spende - Pate werden</h3>
          <div className="question">
            <h4>Pate werden - bilinguale Bildung fördern – hier wird Zukunft vorbereitet</h4>
          </div>
          <div className="answer">
          Mit unserem gemeinnützigen Verein Das China Büro e.V., 
          Träger der ersten bilingualen Deutsch-Chinesischen Kita in Deutschland, setzen wir uns nachhhaltig für interkulturelle Verständigung ein. 
          Die Wirtschaft macht uns die erfolgreiche Kooperation zwischen Deutschland und China tagtäglich vor. 
          Wir leben den deutsch-chinesischen Austausch! <br/>
          Um ganzheitlich die deutsche und chinesische Sprache und Kultur in der Kita zu fördern, 
          mit zusätzlichen Angeboten wie Musik, Tanz, Sport, Büchern, und und und, braucht es oft ein finanzielles Extra. <br/>
          Jeder kann eine Patenschaft für unsere Kita übernehmen. Wir möchten Großeltern, Onkel und Tanten, Paten, 
          Freunde und/ oder Firmen ansprechen.  
          </div>

          <div className="question">
            <h4>Wie und wem helfen Sie mit der Kita-Patenschaft? </h4>
          </div>
          <div className="answer">
          Sie können monatlich (15 €), vierteljährlich (45 €), halbjährlich (80 €) oder jährlich (150 €) spenden. Der Betrag wird per Lastschrift/SEPA-Mandat eingezogen.<br/>
          Oder spenden Sie einfach direkt an:<br/>
          GLS Gemeinschaftsbank 
          Kontobezeichnung:  Das China Büro e.V.  
          IBAN:  DE62 4306 0967 1114 9986 00 
          BIC: GENODEM1GLS  <br/>
          Verwendungszweck: Bildung fördern + Ihr vollständiger Name + Ihre Adresse
          Herzlichen Dank!
          </div>
        </div>)}
        {!this.props.isGerman && (<div className="chinese">捐赠</div>)}

      </div>
    )
  }
}
