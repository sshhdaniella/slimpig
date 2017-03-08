var j = jQuery;

// API URL
var post_resource = {
	url : "http://slimpig.local/wp-json/wp/v2/posts"
};

// Posts
var Posts = React.createClass({
	getInitialState(){
		return({
			posts: []
		})
	},
	componentWillMount(){ 
		var state = this;
		j.ajax(post_resource.url)
		.done(function(data){
			state.setState({posts:data})
		})
		.fail(function(j){
			console.log('fail');
		})
	},
	render(){
		var posts = (this.state.posts);
		return(
			<div className="post-wrapper">
				{posts.map(function(post){
					return <Post post={post} key={post.id} />
				})}
			</div>
		)
	}
});

var Post = React.createClass({
	render(){
		var post = this.props.post;
		return(
			<div className="post-item">
				<center><h2>{post.title.rendered}</h2></center>
				<PostContent post={post} key={post.id} />
			</div>
		)
	}
});

var PostContent = React.createClass({
	render(){
		var postContent = this.props.post;
		return(
			<div className="post-content">
				<center><p>{postContent.content.plaintext}</p></center>
			</div>
		)
	}
});

ReactDOM.render(
	<Posts />, 
	document.getElementById("content")
);