import React from 'react';
import '../asset/css/style.css';
import CpmInputMessages from './cpmInputMessages'

class NewComponentChat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }
    showMessage = messHistory => {
        if (messHistory) {
            let listmess = messHistory
            return listmess.map(message => (
                <div key={`div_${message._id}`} className="showPop">
                    {this.CpmMessageItem(message.u.username, message.msg, message.u._id === sessionStorage.getItem("userId"))}
                </div>
            ));
        }
    };
    /**
     * Hiển thị tin nhắn
     * 1. xác định tin nhắn là do thằng nào gửi
     * 2. xác định tin nhắn là văn bản hay url
     *
     * @param user
     * @param message
     * @param isSender
     * @returns {*}
     * @constructor
     */
    CpmMessageItem(user, message, isSender) {

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        // const avatar = (
        //     <li className="clearfix">
        //         <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
        //     </li>
        // );
        return isSender ? (
            <div>
                <li className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time">Today</span> &nbsp; &nbsp;
                        <span className="message-data-name">{user}</span><i className="fa fa-circle me" />
                    </div>
                    <div className="message other-message float-right"> {message.match(regex) ? this.attachFile(message) : message} </div>
                </li>
            </div>
        ) : (
            <div>
                <li>
                    <div className="message-data">
                        <span className="message-data-name"><i className="fa fa-circle online" />{user}</span>
                        <span className="message-data-time">Today</span> &nbsp; &nbsp;
                    </div>
                    <div className="message my-message"> {message.match(regex) ? this.attachFile(message) : message} </div>
                </li>
            </div>
        );
    }
    /**
     * Hiển thị tin nhắn dựa tên URL
     * 1. Hình Ảnh
     * @param _message
     * @returns {*}
     */
    attachFile(_message) {
        return (
            <div>
                <img src={_message} className="imgCover"/>
            </div>
        )
    }
  render(){
    return (
        <div className="chat">
            <div className="chat-header clearfix">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
              <div className="chat-about">
                <div className="chat-with">Chat with  " {this.props.titleHeader} "</div>
                <div className="chat-num-messages">already 1 902 messages</div>
              </div>
              <i className="fa fa-star" />
            </div> {/* end chat-header */}
            <div className="chat-history">
              <ul>
                  {this.showMessage(this.props.messHistory)}
                <li>
                  <i className="fa fa-circle online" />
                  <i className="fa fa-circle online" style={{color: '#AED2A6'}} />
                  <i className="fa fa-circle online" style={{color: '#DAE9DA'}} />
                </li>
              </ul>
            </div> {/* end chat-history */}
            <CpmInputMessages uploadFile={this.props.uploadFile} rid={this.props.rid}/>
        </div>
    );
  }
}

export default  NewComponentChat;
// export { NewComponentChat };    //import { NewComponentChat } from ...
// export const abc = 1;