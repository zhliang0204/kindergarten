import React, { Component } from 'react';
import { Container, Row, Col,Table } from 'reactstrap';


export default class Purpose extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedPart:'kid-photo',
      
    }
  }
  handleSelectItem(e){
    let curSelectPart = e.target.id;
    if(this.state.selectedPart !== curSelectPart){
      this.setState({
        selectedPart:curSelectPart,
      })
    }
  }
  render() {
    return (
      <div className="purpose outer-div">
        {this.props.isGerman && (<div className="german">
          <div className="header">
            <h2>Pädagogisches Konzept </h2>
            <div className="header-content">
            Diese Konzeption ist eine Arbeitsgrundlage und Reflexionshilfe für unsere tägliche Arbeit. 
            Sie beschreibt das Miteinander in der Kita und zeigt, wo das Team professionelle Schwerpunkte setzt. 
            Unser oberstes Ziel ist es, den Kindern in der Kita eine Atmosphäre von Geborgenheit zu geben, so dass sie sich rundum wohlfühlen. 
            Wir möchten unseren Kindern gemeinsame Werte wie Selbstvertrauen, Toleranz, Neugier und Freundschaft vermitteln. Wir leben unseren Kindern vor, dass die Welt bunt und vielfältig ist und dass es auch bei anderen Kulturen viel zu entdecken gibt.
            </div>
          </div>
          
          <div className="main-content">
            <Container>
              <Row>
              <Col md="3">
                <Table hover>
                  <tbody>
                    <tr  >
                      <td id="kid-photo" className={this.state.selectedPart===`kid-photo`? `con-active`:``} onClick={(e) => this.handleSelectItem(e)} >Unser Bild vom Kind</td>
                    </tr>

                    <tr>
                      <td id="bi-language" className={this.state.selectedPart===`bi-language`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Zweisprachig von Anfang an</td>
                    </tr>

                    <tr>
                      <td id="edu-game" className={this.state.selectedPart===`edu-game`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Situationsansatz</td>
                    </tr>

                    <tr>
                      <td id="free-game" className={this.state.selectedPart===`free-game`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Freispiel / Angebot</td>
                    </tr>

                    <tr>
                      <td id="kita-garten" className={this.state.selectedPart===`kita-garten`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Vorschule</td>
                    </tr>

                    <tr>
                      <td id="edu-programm" className={this.state.selectedPart===`edu-programm`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Berliner Bildungsprogramm</td>
                    </tr>

                    <tr>
                      <td id="parent-partener" className={this.state.selectedPart===`parent-partener`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Eltern als Partner</td>
                    </tr>

                    <tr>
                      <td id="dev-process" className={this.state.selectedPart===`dev-process`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Beobachtung und Dokumentation von Entwicklungsschritten</td>
                    </tr>

                    <tr>
                      <td id="train-recorder" className={this.state.selectedPart===`train-recorder`? `con-active`:``} onClick={(e) =>this.handleSelectItem(e)}>Eingewöhnung</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md="9" className="content-detail">
                  {this.state.selectedPart === 'kid-photo' && (<div className="kid-photo">
                    <p className="content-align">
                    Kinder sind wie Edelsteine – Einzigartig und wertvoll.
                    </p>
                    <p className="content-align">
                      Das Kind steht mit seinem individuellen Selbstbildungsprozess im Mittelpunkt der pädagogischen Arbeit. Unabhängig von Herkunft und seinen individuellen Voraussetzungen erhält jedes Kind die Chance, seine Fähigkeiten und Möglichkeiten in die Entwicklung der Bildungsgemeinschaft einzubringen. Aus diesem Verständnis gilt es, die Neugier des Kindes und seinen Forschungsdrang individuell zu fördern und es in seiner Motivation, neue Dinge zu lernen, bestmöglich zu unterstützen.
                      Wir sehen Kinder als eigenständige Persönlichkeiten mit individuellen Bedürfnissen. Sie haben das Recht, geachtet und ernst genommen zu werden. Dazu gehört, die Meinung von Kindern mit einzubeziehen und ihnen Freiräume zu geben, damit sie sich - unter Berücksichtigung ihrer individuellen Fähigkeiten und Bedürfnisse - entsprechend entfalten können. 
                      Hierbei schaffen unsere persönliche und fachliche Zuwendung und die Wahrnehmung und Beobachtung der Kinder eine verlässliche Basis.
                    </p>
                    <p className="content-align">
                    Wir verstehen die Kita als eine Einrichtung der frühkindlichen Bildung, die durch ein anregungsreiches Umfeld und verlässliche Bezugspersonen allen Kindern bestmögliche und gleichberechtigte Lern- und Entwicklungschancen bietet. Bildung als aktiver, ganzheitlicher und subjektiv geprägter Aneignungsprozess des Kindes versetzt es in die Lage, sich zu entwickeln, zu lernen, zu handeln und Beziehungen zu gestalten. Durch das selbständige Sammeln von Erfahrungen in der Auseinandersetzung mit seiner Umwelt, lernt das Kind zunehmend besser sich zu orientieren und aktiv an der Gestaltung seiner Umwelt mitzuwirken. Ebenso wichtig für ihre Entwicklung sind jüngere, gleichaltrige und ältere Kinder als Freunde und Spielgefährten. Zusammen lernen die Kinder im Umgang miteinander, Verantwortung zu übernehmen, Verständnis füreinander zu entwickeln und sich zu respektieren.
                    </p>
                  </div>)}
                  {this.state.selectedPart === 'bi-language' && (<div className="bi-language">
                    <p className="content-align">
                    Kinder lernen am erfolgreichsten Sprachen, wenn sie diese im Alltag erleben. Dieses Vorgehen wird auch Immersion („Eintauchen“) genannt. Unser Erzieherteam besteht aus deutschen, taiwanesischen und chinesischen Muttersprachlern. In jeder Gruppe gibt es eine deutsche und eine chinesische Erzieherin. Das heißt, jeder Erzieher spricht ausschließlich in seiner Muttersprache mit den Kindern. So gehen unsere Kinder von Anfang an ganz natürlich mit der deutschen und der chinesischen Sprache und Kultur um. Der Immersionsansatz gilt als erfolgreichste Methode der Sprachvermittlung.
                    </p>
                    <p className="content-align">
                    Oberstes Ziel ist, dass alle Kinder die deutsche Sprache fließend lernen und bestens für den Schuleintritt in Deutschland vorbereitet sind. Anders als in China, wo die Kinder bereits in den ersten Lebensjahren mit dem Erlernen von Schriftzeichen beginnen, führen wir die Kinder auf spielerischen und kreativen Weg an die chinesische Schriftkultur heran.
                    </p>
                    <p className="content-align">
                    Getreu dem Motto „Eine Person – Eine Sprache“ finden unsere Angebote auf Deutsch oder Chinesisch statt. Wir singen deutsche und chinesische Lieder, basteln, spielen, forschen und erleben Abenteuer auf Deutsch und Chinesisch. Die Sprache wird vor allem über Lieder, Tänze, Musik und Projekte, aber auch über die ganz normalen Alltagssituationen vermittelt. Dabei nutzen die Erzieherinnen auch Lieder, die es sowohl auf Deutsch als auch auf Chinesisch gibt, da dann für die Kinder die Melodie eines Liedes bereits bekannt ist und das Erlernen erleichtert wird.
                    </p>
                  </div>)}
                  {this.state.selectedPart === 'edu-game' && (<div className="edu-method">
                      <p className="content-align">
                      Wir arbeiten nach dem Situationsansatz. Kinder entdecken die Welt mit all ihren Sinnen. Es ist von entscheidender Bedeutung, die kindliche Neugierde aufzugreifen und vielfältige Spiel- und Lernmöglichkeiten zu eröffnen, damit sich die kreativen Potenziale entfalten können. Wir stellen uns dieser Aufgabe und fördern die Kinder auf ihrer Entdeckungsreise. Engagierte Erzieherinnen und Erzieher unterstützen die Talente der Kinder und regen sie zum Erforschen und Verstehen ihrer Umwelt an.
                      </p>
                  </div>)}
                  {this.state.selectedPart === 'free-game' && (<div className="free-game">
                    <p className="content-align">
                    In unserem Kindergartenalltag bieten wir den Kindern eine gute Balance zwischen Freispiel und Angeboten an. Die Erzieher schaffen die Voraussetzungen, die überhaupt das Freispiel ermöglichen. Sie gestalten den Raum (Puppenecke, Bauecke, Lese- und Kuschelecke, Mal- und Bastelecke usw.) und stellen Material zur Verfügung, beides entsprechend  der Situation in der Kindergruppe.
                    </p>
                    <p className="content-align">
                    Sinn und Bedeutung des Freispiels für das Kind:
                    </p>
                    <ul>
                      <li>Im Freispiel kann das Kind sich selbst verwirklichen, seine individuellen Bedürfnisse befriedigen.</li>
                      <li>Entscheidungen frei und selbständig treffen, sich Lernaufgaben und –ziele selbst setzen etc.</li>
                      <li>Im Freispiel erlebt das Kind Freiheit in gewissen Grenzen (z.B. Zeitrahmen), die ihm Sicherheit, Schutz und Geborgenheit garantieren.</li>
                      <li>Im Freispiel handelt das Kind in freier Selbstbestimmung. Es wird nicht von Erwachsenen bevormundet.</li>
                    </ul>
                    <p className="content-align">
                    Angeleitete Angebote sind auch ein wichtiges Element um Kindern neue Erfahrungen, Impulse und Anregungen mitzugeben. Ein wechselndes Angebot an Musik, Sport, Tanzen Basteln, Malen, Experimentieren etc. wird sowohl mit chinesischen, als auch deutschen Themen angeboten. Unsere Kinder profitieren so von den Vorzügen beider Systeme, des deutschen und des chinesischen: viel Freiraum und gleichzeitig gezielte Förderung.
                    </p>
                  </div>)}
                  {this.state.selectedPart === 'kita-garten' && (<div className="kita-garten">
                    <p className="content-align">
                    Mehrmals wöchentlich bieten wir für die Vorschulkinder sowohl deutsche, als auch chinesische Vorschule an. Dabei geht es nicht darum, dass das Kind bestimmte Inhalte lernt, um in der Schule einen Wissensvorsprung zu haben. In der Vorschule im Kindergarten geht es vielmehr um eine sanfte Überleitung in den Schulalltag. Denn die Einschulung ist für viele Kinder nicht nur mit der Vorfreude verbunden, dann endlich „zu den Großen“ zu gehören, sie bringt auch viele Unsicherheiten vor dem unbekannten Lebensabschnitt Schule mit sich. Die Vorschule im Kindergarten vermittelt deshalb, was die Kinder in der Schule erwarten können und welche Regeln die neue Selbstständigkeit mit sich bringt. Die Vorschule im Kindergarten hat also nichts mit Zwang oder Druck zu tun.
                    </p>
                    <p className="content-align">
                    Vielmehr sind die Kinder stolz ein Vorschulkind zu sein und den eigenen Vorschulordner mit Aufgabenblättern, etc. zu füllen. Da die meisten Kinder in diesem Alter bereits ein gesteigertes Interesse an Zahlen und Buchstaben, bzw. dem Schreiben haben, wird an diesem Punkt angesetzt. Hier lernen die Kleinen spielerisch Buchstaben und Zahlen auseinander zu halten, ein Gefühl für Mengen zu entwickeln und trainieren ganz nebenbei Sprachgefühl, Konzentration und Feinmotorik.
                    </p>
                  </div>)}
                  {this.state.selectedPart === 'edu-programm' && (<div className="edu-programm">
                    <p className="content-align">
                    Unser pädagogisches Konzept basiert auf dem Berliner Bildungsprogramms. Dieses Programm begreift das Kind als aktiven und kompetenten Lernenden. Es versteht Bildung als sozialen, sinnlichen, spielerischen und kulturellen Prozess durch den alle Kompetenzen der Kinder gestärkt werden sollen.
                    </p>
                    <p className="content-align">
                    Im BBP sind sieben Bildungsbereiche definiert, welche unten dargestellt sind. Wir haben in allen Bildungsbereichen Inhalte, Projekte, Spielangebote oder Ausstattungsideen aufgebaut (z.B. Sportkurse, Musikkurse, Theater-Projekte, Projekte für Feste wie zum Chinesischen Neujahr, Forscherkisten-Angebote, Ausflüge, Zahnfee, etc.)
                    </p>
                  </div>)}
                  {this.state.selectedPart === 'parent-partener' && (<div className="parent-partener">
                    <p className="content-align">
                    Die Eltern sind die wichtigsten Bezugspersonen und die Experten für ihr Kind. Wir sehen Eltern als kompetente Partner in der Erziehung. Diese Haltung ist geprägt von gegenseitigem Vertrauen, Anerkennung, Respekt und Wertschätzung. Die gute und vertrauensvolle Zusammenarbeit mit jedem einzelnem Elternteil liegt uns am Herzen. Wir pflegen einen intensiven und persönlichen Austausch mit individuellen Eingangsgesprächen, Elternabende, Elterncafés und Elterngespräche. Ein regelmäßiger Austausch über die Erlebnisse zu Hause und in der Kita ist für uns selbstverständlich.
                    </p>
                    <p className="content-align">
                    In unserer Elterninitiative übernehmen Eltern unterschiedliche Aufgaben (Vorstand, Aufsichtsrat, Elternrat, Reparaturarbeiten, Einkäufe etc.). Bitte lest euch hierzu alle Information zum Thema Elterninitiative durch.
                    </p>
                  </div>)}
                  {this.state.selectedPart === 'dev-process' && (<div className="dev-process">
                    <p className="content-align">Die Entwicklung der Kinder wird in Schrift und Bild dokumentiert. Für jedes Kind wird ein Portfolio angefertigt. Das Kind hat jederzeit Zugang zu seinem eigenen Portfolio. Hier kann es alleine oder in Begleitung mit den Erzieherinnen und Eltern seine Bilder anschauen oder sich Geschichten vorlesen lassen. Zusätzlich nutzen wir die Lerndokumentation aus dem Sprachlerntagebuch zur Sprachlernentwicklung vor Schuleintritt.</p>
                    <p className="content-align">Zur Beobachtung der Kinder nutzen wir die Methode der Videographie, nicht zuletzt um Eltern einen umfangreichen Einblick in die Lebenswelt ihres Kindes zu ermöglichen. Einmal im Jahr bieten wir Elterngespräche an, um uns über die Interessen und Fähigkeiten des Kindes und über gemeinsame Ziele auszutauschen.</p>
                    <p className="content-align">Tägliche Kurzberichte über den jeweiligen Tag werden an der Infotafel für alle Eltern notiert. In regelmäßigen Abständen erhalten alle Eltern eine Zusammenfassung über die Geschehnisse in den Gruppen (Rundbrief).</p>

                  </div>)}
                  {this.state.selectedPart === 'train-recorder' && (<div className="train-recorder">
                    <p className="content-align">Die Eingewöhnung eines Kindes kann unterschiedlich lange dauern. Eltern sollten ein bis drei Wochen für eine optimale Eingewöhnung einplanen. Wir gewöhnen die Kinder ihrem Alter, ihrer Erfahrung mit Kindergruppen und ihrer individuellen Bedürfnissene entsprechend ein. Optimal wäre es, wenn sich die Eltern, besonders von Kleinkindern bis 3 Jahren, die ersten zwei Wochen frei nehmen könnten, damit Sie Ihr Kind ohne Zeitdruck begleiten können.</p>
                    <p className="content-align">Vor Beginn der Eingewöhnung findet ein persönliches Gespräch mit den Eltern und der Erzieherin statt, um den Ablauf und Besonderheiten ganz individuell zu besprechen.</p>
                    <p className="content-align">Wie verlaufen die ersten Kindergartentage?</p>
                    <p className="content-align">Sie bekommen von uns einen Tagesplan für Ihr Kind, damit Sie die allgemeine Tagesstruktur unseres Kindergartens kennen. Die ersten drei Tage sollten Sie Ihr Kind bei dem Tagesgeschehen begleiten und sich ggf. zurückziehen, wenn Ihr Kind beschäftigt ist. In den folgenden Tagen werden Sie dann für kurze Zeiteinheiten gebeten, den Raum oder den Kindergarten zu verlassen. Diese Zeiten ohne Eltern werden wir dann ausdehnen, so dass sich Ihr Kind daran gewöhnt, uns als Bindungspersonen anzunehmen, sich von uns trösten, wickeln und begleiten zu lassen. Uns ist wichtig, dass sich alle Kinder bei uns wohl fühlen, so dass die Grundvoraussetzung für Selbstbildung und Lernen geschaffen ist.</p>
                    <p className="content-align">Was muss mein Kind in den Kindergarten mitnehmen?</p>
                    <p className="content-align">Für die jede Woche stattfindenden Bewegungsangebote sollten die Kinder Sportsachen jahreszeitengerecht mitbringen, die dann im Kindergarten bleiben und zum Auswechseln und Waschen regelmäßig wieder mit gegeben werden. Außerdem benötigt Ihr Kind eine Zahnbürste, Bettutensilien (Bettwäsche, Laken für 60x120cm), Wechselsachen, sowie Windeln, Feuchttücher und Creme bei Bedarf.</p>

                  </div>)}




              </Col>
              </Row>

            </Container>
          </div>
        </div>)}
        {!this.props.isGerman && (<div className="chinese">building......</div>)}

      </div>
    )
  }
}
