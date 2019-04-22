import React, { Component } from 'react'

export default class Team extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="Team">
        {this.props.isGerman && (<div className="german">
          <div className="header">
          Unsere Kita lebt von einem vielseitig qualifizierten Team, der familiären Atmosphäre, von wechselseitiger Anerkennung, gegenseitigem Vertrauen und dem regen Austausch zwischen Vorstand, ErzieherInnenn und Eltern.
          </div>
          <div className="teachers">
            <div className="tiger-teaches">
              <div>Tigergruppe:</div>
              <div className="teacher">
                <p>Yan, staatlich anerkannte Erzieherin. </p>
                <p>Yan kommt aus Taipei, Taiwan und studierte dort “Early Child Education“. Danach arbeitete sie 2 Jahre in einem taiwanischen Kindergarten und anschliessend 5 Jahre als Grundschullehrerin. Sie ist seit 2011 in Berlin und trägt mit ihrem chinesisch sprachigen Hintergrund maßgeblich zu unserem bilingualen Konzept bei.</p>
              </div>

              <div className="teacher">
                <p>Tanja, staatlich anerkannte Erzieherin </p>
                <p>Tanja hat in unserem Team die meisten Berufserfahrungen. Ihre Ausbildung als staatlich anerkannte Erzieherin absolvierte sie vor 23 Jahren. Sie arbeitete bereits in unterschiedlichen Kinder- und Schülerläden Berlins und sammelte Erfahrungen in Integrations-, Vorschul- und Krippengruppen. 2012 absolvierte sie eine Zusatzausbildung zur Facherzieherin für Sprachförderung.</p>
              </div>

              <div className="teacher">
                <p>Jia, staatl. anerkannte Erzieherin. (Teilzeit) </p>
                <p>Jia kommt aus Hangzhou. Bevor sie 2006 nach Deutschland kam, hat sie 2 Jahre Psychologie in China studiert. In Berlin absolvierte sie den Studiengang Erziehung und Bildung im Kinderalter. Seit 2012 arbeitet sie in der Deutsch-Chinesischen Kita. Nach 2 Jahren Elternzeit ist sie nun dritte Fachkraft in der Tigergruppe.</p>
              </div>

            </div>
            <div className="dragon-teaches">
              <div className="teacher">
                <p>Nadine, staatlich anerkannte Sozialpädagogin </p>
                <p>Nadine ist Sozialpädagogin und kommt aus Berlin. Nach ihrem Studium arbeitete sie als Vorschulerzieherin in einem deutsch-chinesisch-englischem Kindergarten in Peking. Nach ihrer Rückkehr spezialisierte sie sich auf die Bildung und Erziehung der Kleinsten und schloss zwei Zusatzqualifikationen zu Fachkraft für Integration/Inklusion und zur Fachkraft für frühkindliche Bildung ab. Seit Mitte 2012 ist sie bei uns und trägt mit viel pädagogischer Feinfühligkeit, gemeinsam mit Xin zu einer bereichernden Bildungsarbeit bei.</p>
              </div>

              
              <div className="teacher">
                <p>Xin, staatlich anerkannte Erzieherin</p>
                <p>Xin kommt aus dem Nordosten Chinas (Liaoning Provinz), wo sie Grundschulpädagogik studiert hat. Nach ihrem Studium war sie 4 Jahre lang als Lehrerin tätig. Xin lebt seit 2005 in Berlin und hat den Masterstudiengang „Bildungsmanagement“ an der TU absolviert. Seit August 2014 begleitet sie die Drachenkinder als chinesisch sprechende Erzieherin.</p>
              </div>

              <div className="teacher">
                <p>Friederike, staatlich anerkannte Erzieherin (Teilzeit)  </p>
                <p>Friederike ist gelernte Heilerziehungspflegerin. Viele Jahre hat sie in diesem Beruf gearbeitet. Nach der Geburt ihres Sohnes hat sie sich entschieden, eine neue berufliche Richtung einzuschlagen und absolvierte darauf im Jahr 2012 den Quereinstieg zur Facherzieherin für Integration. Seit Februar 2016 arbeitet Friederike bei uns mit den Kleinsten. Besonders wichtig ist ihr, den Kindern Naturerfahrungen zu ermöglichen und auf jedes Kind individuell einzugehen.</p>
              </div>
            
            </div>
          </div>
          <div className="dean">
            <div>Die Kitaleitung</div>
            <div>Seit August 2014 übernimmt Nadine bei uns die Position der pädagogischen Leitung.</div>
          </div>

          <div className="dean">
            <div>Der Vorstand</div>
            <div>Der Vorstand der Kita wird jährlich in einer Mitgliederversammlung gewählt.<br/>
                  Dem Vorstand obliegt die Führung der laufenden Geschäfte des Vereins.<br/>
                  Er übt seine Tätigkeit ehrenamtlich aus.<br/></div>
          </div>

        </div>)}
        {!this.props.isGerman && (<div className="chinese">building......</div>)}

      </div>
    )
  }
}
