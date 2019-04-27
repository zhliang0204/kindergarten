import React, { Component } from 'react';

export default class Registration extends Component {
  render() {
    return (
      <div className="Registration outer-div">
        {this.props.isGerman && (<div className="german">
          <div className="notice">
            <div className="header">Anmeldung Kitaplatz</div>
            <div className="content">
              <div>Die Berwerbungsphase für das Kitajahr 2018/2019 ist bereits abgeschlossen. Wegen einer großen Anzahl an Geschwisterkindern können derzeit auch keine Anmeldungen/Bewerbungen für das Kitajahr 2019/2020 entgegen genommen werden.</div>
              <div>Für die Aufnahme in der Deutsch-Chinesische Kita wird ein Ganztageskitagutschein (Betreuungsumfang 7-9 Stunden) vom Jugendamt benötigt. Bitte beantragen Sie den Gutschein mindestens 2 Monate vor gewünschtem Betreuungsbeginn, damit Sie ihn rechtzeitig erhalten.</div>
              <div>Bei Fragen zur Anmeldung: anmeldung@daschinabuero.org</div>

            </div>
          </div>
          <div className="cost">
            <div className="header">Kosten</div>
            <div className="content">
            <div>Zusätzlich zum einkommensabhängigen monatlichen Kitabeitrag und dem allgemeinen Essensbeitrag von 23 Euro erheben wir</div>
            <div>50 Euro zur Unterstützung der bilingualen Betreuung.</div>
            <div>Für manche externe Projekte (Reisen, Sportunterricht, Musikunterricht etc.) kann ein zusätzlicher Beitrag erhoben werden.</div>
            <div>Der Vereins-Mitgliedsbeitrag beträgt 30 Euro im Jahr.</div>

            </div>
          </div>
          <div className="download">
            <div className="header">Download</div>
            <div className="content">
              <div>Formular Anmeldung zur Förderung von Kindern. Einzureichen beim Jugendamt Ihres Wohnbezirks. Laden (Bilinguale Familien Punkt 2.1 bitte mit "Nein" ankreuzen)</div>
              <div>Erläuterungen zum Anmeldeformular (Stand März 2010).<a href={'./../../styles/download/reg_1.pdf'} download> Laden </a> </div>
              <div>Muster eines Kita-Gutscheins. <a href={'./../../styles/download/reg_2.pdf'} > Laden</a> </div>
              <div>Formular Erklärung für die Festsetzung der Beteiligung an den Kosten der Tagesbetreuung von Kindern Einzureichen beim Jugendamt Ihres Wohnbezirks.<a href={'./../../styles/download/reg_3.pdf'} > Laden</a> </div>

            </div>
          </div>

        </div>)}
        {!this.props.isGerman && (<div className="chinese">building......</div>)}

      </div>
    )
  }
}
