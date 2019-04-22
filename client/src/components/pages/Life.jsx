import React, { Component } from 'react'

export default class Life extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="life">
      {this.props.isGerman && (<div className="german">
        <div className="main1">
          <div className="header">Kitastruktur</div>
          <div className="content">In unserer Elterninitiativ-Kita gibt es zwei Gruppen. Die „Drachengruppe“ und die „Tigergruppe“. Jede Gruppe wird von einer chinesisch- und deutschsprachigen Erzieherin betreut. Die Erzieherinnen erhalten zusätzliche Unterstützung durch Auszubildende und BerufspraktikantInnen.</div>        
        </div>
        <div className="main1">
          <div className="header">Die Jahres- Wochen- und Tagesstruktur in der Drachengruppe (von 1-3 Jahren)</div>
          <div className="content"> place holder</div>        
        </div>
        <div className="main1">
          <div className="header">Die Jahres- Wochen- und Tagesstruktur in der Tigergruppe (von 3-6 Jahren)</div>
          <div className="content">place holder</div>        
        </div>
        <div className="main1">
          <div className="header">Unsere Feste</div>
          <div className="content">
            <div>Mit Kostümen, Musik, Tanz, Theater und Essen feiern wir sowohl chinesische als auch deutsche Feste.</div>
            <div>
            Es gibt viel zu feiern in unserer Kita:

              - Geburtstage
              - Chinesisch Neujahr (Chun Jie)
              - Fasching
              - Ostern
              - Sommerfest
              - Mondfest (Zhong Qiu Jie)
              - Laternenumzug mit selbst gebastelten Laternen
              - Nikolaus 
              - Weihnachtsfest
              - Abschiedsfeiern
              <div> image placeholder</div>
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

      </div>)}
      {!this.props.isGerman && (<div className="chinese">building......</div>)}

        
      </div>
    )
  }
}
