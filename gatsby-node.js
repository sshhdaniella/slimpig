const path = require('path');

exports.createPages = ({actions, graphql }) => {
    const {createPage} = actions;
    const postTemplate = path.resolve('src/components/post.js');

    // query all blog posts and for any that gatsby find, create a page for it

    return graphql(`{
        allMarkdownRemark {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        path
                        title
                    }
                }
            }
        }
    }`)
    .then(res => {
        if(res.errors){
            return Promise.reject(res.errors);
        }

        res.data.allMarkdownRemark.edges.forEach( ({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })
    })
}