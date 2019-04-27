import React, { Component } from 'react';
import dragon from './../../styles/images/dragon.png';
import tiger from './../../styles/images/tiger.png';
import autumn from './../../styles/images/autumn.png';
import bunny from './../../styles/images/bunny.png';
import cake from './../../styles/images/cake.png';
import christmas from './../../styles/images/christmas-tree.png';
import party from './../../styles/images/confetti.png';
import lantern from './../../styles/images/lantern.png';
import summer from './../../styles/images/music.png';
import spring from './../../styles/images/springfestival.png';
import carousel from './../../styles/images/carousel.png';
import santaClaus from './../../styles/images/santaClaus.png';



export default class Life extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="life outer-div">
      {this.props.isGerman && (<div className="german">
        <div className="main1">
          <div className="header">Kitastruktur</div>
          <div className="content">In unserer Elterninitiativ-Kita gibt es zwei Gruppen. Die „Drachengruppe“ und die „Tigergruppe“. Jede Gruppe wird von einer chinesisch- und deutschsprachigen Erzieherin betreut. Die Erzieherinnen erhalten zusätzliche Unterstützung durch Auszubildende und BerufspraktikantInnen.</div>        
        </div>
        <div className="main1">
          <div className="header">Die Jahres- Wochen- und Tagesstruktur in der Drachengruppe (von 1-3 Jahren)</div>
          <div className="content-img"> 
            <img src={dragon}/>
          </div>        
        </div>
        <div className="main1">
          <div className="header">Die Jahres- Wochen- und Tagesstruktur in der Tigergruppe (von 3-6 Jahren)</div>
          <div className="content-img">
            <img src={tiger}/>
          </div>        
        </div>
        <div className="main1">
          <div className="header">Unsere Feste</div>
          <div className="content">
            <div>Mit Kostümen, Musik, Tanz, Theater und Essen feiern wir sowohl chinesische als auch deutsche Feste.</div>
            <div>
              <div className="festival-list">
                <div className='festival-image'>
                  <img src={cake}/>
                  <p>Geburtstage</p>
                
                </div>

                <div className='festival-image'>
                  <img src={spring}/>
                  <p>Chinesisch Neujahr</p>
                </div>

                <div className='festival-image'>
                  <img src={carousel}/>
                  <p>Fasching</p>
                </div>

                <div className='festival-image'>
                  <img src={bunny}/>
                  <p>Ostern</p>
                </div>

                <div className='festival-image'>
                  <img src={autumn}/>
                  <p>Mondfest</p>
                </div>

                <div className='festival-image'>
                  <img src={summer}/>
                  <p>Sommerfest</p>
                </div>

                <div className='festival-image'>
                  <img src={lantern}/>
                  <p>Laternenumzug</p>
                </div>

                <div className='festival-image'>
                  <img src={santaClaus}/>
                  <p>Nikolaus</p>
                </div>

                <div className='festival-image'>
                  <img src={christmas}/>
                  <p>christmas</p>
                </div>

                <div className='festival-image'>
                  <img src={party}/>
                  <p>Abschiedsfeiern</p>
                </div>
              </div>


            </div>
            
          </div>        
        </div>

        <div className="main1">
          <div className="header">Wir forschen</div>
          <div className="content">
            <div>2010  wurde unsere Kita als „Haus der kleinen Forscher“ ausgezeichnet. Die Stiftung hat das Ziel, naturwissenschaftliche Bildung in der frühkindlichen Erziehung zu fördern und Kinder mit einfachen Experimenten an Naturwissenschaften und Technik heranführen. Ziel ist es, bereits ab dem Kindergartenalter spielerisch die Neugier auf Naturphänomene zu fördern und Kindern die Möglichkeit zu geben, beim Forschen  selbst Antworten auf alltägliche naturwissenschaftliche Phänomene zu finden. Unsere ErzieherInnen bilden sich jährlich weiter fort, um den Kindern die alltägliche Begegnung mit naturwissenschaftlichen, mathematischen und technischen Themen zu ermöglichen und das natürliche Interesse der Kinder entwicklungsangemessen zu begleiten.</div>
            <div>image placeholder</div>
          </div>        
        </div>

      
        {/* <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
      </div>)}
      {!this.props.isGerman && (<div className="chinese">building......</div>)}

        
      </div>
    )
  }
}
