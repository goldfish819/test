var socket = io();
var data = [
            {id: 1, author: "Pete Hunt", text: "This is one comment"},
            {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
        ];
        
var CommentList = React.createClass({
        render: function() {
            return (
            <div className="commentList"> 안녕! 난 댓글이야. </div>
            );
        }
});

function aa(bb){
    return false;
}
        
var CommentBox = React.createClass({
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
                //io.sockets.socket(socket.id).emit
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
            });
        },
        render: function() {
            return (
                
            <a href="{this.props.url}"></a> 
            <div className="commentBox">
                <h1 className="aa(this.state.data)? '' : 'hide'">댓글</h1>
                <h3 data= {this.state.data} />
            </div>
            
            
            
            );
        }
});
        
React.render(
        <CommentBox data={data} />, document.getElementById('example');
);
        
io.on('connection', function(socket){
    socket.on('send data', function(){
        io.sockets.socket(socket.id).emit('message','data');
    });
});
// if (io.sockets.connected[socketid]) {
//     io.sockets.connected[socketid].emit('message', 'for your eyes only');
// }
// io.to(socketid).emit('message', 'for your eyes only');