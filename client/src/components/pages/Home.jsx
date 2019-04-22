import React, { Component } from 'react';
import { UncontrolledCarousel, Row, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCard:"btn-1",


    }
  }

  handleSelectedCard(e){
    console.log(e.target.id)
    this.setState({
      selectedCard: e.target.id,
    })
  }
  render() { 
                 
    return (
      <div className="Home">
        <UncontrolledCarousel items={items} />
        {this.props.isGerman && (<div className="german">building......</div>)}
        {!this.props.isGerman && (
        <div className="Chinese">
        <div className="announcement">
        重要通知
      </div>
      <div className="welcome">
        <div className="left">
          <h3>德中首创托儿所</h3>
          <div className="intro">
            <div>
                &nbsp; &nbsp;德-中幼儿园是中国办公室团体在德国开设的第一家中德幼儿园, 同时是一家自发幼儿园。
              孩子的父母与教育工作者之间存在良好的信任关系，使幼儿园内始终洋溢着家庭的气氛。
            </div>
          </div>
        </div>
        <div className="right">
            <Row>
              <Col className="col-4 place-holder">
                <img src='http://www.daschinabuero.org/images/fotos/unsere-Kinder2.gif' alt="pictures"/>
              </Col>
              <Col className="col-4 col-cont1">
                <div className="col-title1">教育重点：</div>
                <div className="col-content1">双语教学与文化交流</div>
              </Col>
              <Col className="col-4 place-holder">
                <img src="http://www.daschinabuero.org/images/SGruppenraum-Krippe.gif" alt="pictures"/>
              </Col>

            </Row>
            <Row>
              <Col className="col-4 col-cont2">
                <div className="col-title2">为孩子提供：</div>
                <div className="col-content2">开放、快乐、宽容的</div>
                <div className="col-content22">成长环境</div>
                
              </Col>
              <Col className="col-4 place-holder">
                <img src='http://www.daschinabuero.org/images/fotos/Umgebung-3.gif' alt="pictures"/>
              </Col>
              <Col className="col-4 col-cont3">
                <div className="col-content31">入园年龄: 1~6岁</div>
                <div className="col-content32">入园名额:27人</div>
              </Col>
            </Row>
        </div>
      </div>

      <div className="about-us">
      <div className="aboutus-cards">

        <div className="cards">
          <Card>
            <div className="card-image">
              <img src="http://www.daschinabuero.org/images/fotos/unsere-Kinder.gif" alt="Card image cap" />
            </div>
            <CardBody>
              <button id="btn-1" onClick={(e)=>this.handleSelectedCard(e)}>
                <i className="fas fa-sign-in-alt"></i>我们的孩子
              </button>
            </CardBody>
          </Card>
        </div>
        <div className="cards">
          <Card>
            <div className="card-image">
              <img src="http://www.daschinabuero.org/images/fotos/IMG_1228.gif" alt="Card image cap" />
            </div>
            <CardBody>
              <button id="btn-2" onClick={(e)=>this.handleSelectedCard(e)}>
                <i className="fas fa-sign-in-alt"></i>我们的环境
              </button>
            </CardBody>
          </Card>          
        </div>
        <div className="cards">
          <Card>
            <div className="card-image">
              <img src="http://www.daschinabuero.org/images/fotos/Bilingualitaet.gif" alt="Card image cap" />
            </div>
            <CardBody>
              <button id="btn-3" onClick={(e)=>this.handleSelectedCard(e)}>
                <i className="fas fa-sign-in-alt"></i>我们的家长
              </button>
            </CardBody>
          </Card>            
        </div>
        <div className="cards">
          <Card>
            <div className="card-image">
              <img src="http://www.daschinabuero.org/images/fotos/Essen2.gif" alt="Card image cap" />
            </div>
            <CardBody>
              <button id="btn-4" onClick={(e)=>this.handleSelectedCard(e)}>
                <i className="fas fa-sign-in-alt"></i>我们的食物
              </button>
            </CardBody>
          </Card>  
        </div>
      
        </div>
        <div className="selected-card" >
           {this.state.selectedCard === "btn-1" && (<p>
            我们的孩子来自德-中，德国和中国的家庭。我们的托儿所基本上接纳所有喜爱德-中文化的人。 
            在龙队里有最多11个由1到3岁的小孩；在虎队有16个由3到6岁的小孩。我们的小孩在一个和谐及有家庭气氛的环境中成长；
            他们在托儿所应该感受到安全感和愉悦。我们的来自德国，中国的教育工作者（老师）一开始就自然的用双语教导孩子语言和认识文化。
           </p>)}

           {this.state.selectedCard === "btn-2" && (<p>
            幼儿园<br/>
            我们的幼儿园在潘茨劳儿边儿中心的丹克鲁上一间翻新的老房的一楼里。 公寓般的特征让我们的幼儿园让人感到舒服！ 
            我们有多个有教育意义的房间，可让孩子们在游戏或学习的时候感到激励。 
            由于我们的设备孩子们可以躲起来或休息，比如说孩子们可以在小图书馆，卷伏的角落，爬塔间自由选择既暂时不受监视情况下玩耍。
            此外还有一个厨房，两个小孩浴室和衣帽间。在后院有一个小花园和沙池，孩子们可以在那里建立一个果园，他们也会照顾它。<br/>
            周围环境<br/>
            我们几乎每天都和孩子们外出，在新鲜的空气下活动；在户外玩耍和在空旷的地方跑步。
            这些对孩子的发展是重要的！幼儿园的周围是绿地和对孩子友善的地区-安千 汉克-则在潘茨劳儿边儿，直接临近儿童游乐场，公园和其他供给小孩使用的措施旁。
            3岁以下的小孩我们是用手推车帮助他们出行。<br/>
           </p>)}

           {this.state.selectedCard === "btn-3" && (<p>
            我们是一个家长自发的幼儿园。我们寻找热衷于参与的父母。 这意味着，在这里不仅是教师在履行他们的职责，也有我们的父母。 
            家长的主动参与、承诺、和教育工作者的密切合作是幼儿园日常运作的平稳先决条件。
            我们期望家长的合作，这是必不可少的。针对于这一点请仔细阅读所有关于家长自发的信息。
           </p>)}

           {this.state.selectedCard === "btn-4" && (<p>
            我们只用天然材料作的食物。我们提供水果早餐，一餐营养丰富的天然材料做的中餐，以及一个下午的点心。
           </p>)}

        </div>
      </div>
      </div>
        )}

      </div>
    );
  }
}
